import './ChatPage.css';
import { ChannelList, ChannelHeader, MessageList, MessageInput, MemberList } from '../../components';

import React, { useState, useEffect } from 'react';
import { GroupChannelModule, GroupChannelCreateParams, GroupChannelHandler, GroupChannelCollection, GroupChannelListOrder, GroupChannelFilter } from '@sendbird/chat/groupChannel';
import { UserMessageCreateParams } from '@sendbird/chat/message';
import { BaseChannel, createMyGroupChannelListQuery } from '@sendbird/chat';




export default function Chat({ sb, userId }) {
    const [newGroupChannel, setGroupChannel] = useState(null);
    const [channelHeaderName, setChannelHeaderName] = useState('Channel Name');
    const [messageList, setMessageList] = useState([]);
    const [channelList, setChannelList] = useState([]);
    const [mutedMembers, setMutedMembers] = useState([]);
    const [userList, setUserList] = useState([]);
    
    const groupChannelFilter = new GroupChannelFilter();
    groupChannelFilter.includeEmpty = true;
    const groupChannelCollection = sb.groupChannel.createGroupChannelCollection();
    groupChannelCollection.filter = groupChannelFilter;
    groupChannelCollection.order = GroupChannelListOrder.CHRONOLOGICAL;
    const channelRetreiveHandler = {
        onchannelsAdded: (context, channels) => {
            console.log(channels);
        }
    };
    groupChannelCollection.setGroupChannelCollectionHandler(channelRetreiveHandler);

    const markMessageHandler = new GroupChannelHandler({
        onUnreadMemberStatusUpdated: (channel) => {
            const newMessageList = getMessage();
            console.log(newMessageList);
        },
    });
    sb.groupChannel.addGroupChannelHandler('markMessage', markMessageHandler);

    async function getMessage() {
        const PreviousMessageListQueryParams = {}
        const PreviousMessageListQuery = newGroupChannel.createPreviousMessageListQuery(PreviousMessageListQueryParams);
        const messages = await PreviousMessageListQuery.load();

        for (let i in messages) {
            const readMembers = newGroupChannel.getReadMembers(messages[i]);
            messageList[i].readCount = readMembers.length > 0;
        }
        return messages;
    }

    async function retrieveChannelList() {
        if (groupChannelCollection.hasMore) {
            const channelsLoad = await groupChannelCollection.loadMore();
            setChannelList((currentChannelList) => [...channelsLoad]);
        }
    }

    useEffect(() => {
        retrieveChannelList();
    }, []);

    async function retrieveAllUsers() {
        const query = sb.createApplicationUserListQuery({ limit: 20 });
        const users = await query.next();

        return users.map((user) => console.log(user.nickname));
    }


    return (
        <div className='container'>
            <ChannelList
                sb={sb}
                userId={userId}
                channelList={channelList}
                newGroupChannel={newGroupChannel}
                setGroupChannel={setGroupChannel}
                setChannelHeaderName={setChannelHeaderName}
                setMessageList={setMessageList}
                setChannelList={setChannelList}
                retrieveChannelList={retrieveChannelList}
            />
            <div className="channel">
                <ChannelHeader
                    newGroupChannel={newGroupChannel}
                    channelHeaderName={channelHeaderName}
                    setGroupChannel={setGroupChannel}
                    setMessageList={setMessageList}
                    setChannelHeaderName={setChannelHeaderName}
                    retrieveChannelList={retrieveChannelList}
                />
                <div>
                    <MessageList 
                        sb={sb}
                        newGroupChannel={newGroupChannel}
                        messageList={messageList}
                    />
                    <MessageInput 
                        sb={sb}
                        newGroupChannel={newGroupChannel}
                        messageList={messageList}
                        setMessageList={setMessageList}
                    />
                </div>
            </div>
            <MemberList 
                newGroupChannel={newGroupChannel}
                mutedMembers={mutedMembers}
                setMutedMembers={setMutedMembers}
                retrieveAllUsers={retrieveAllUsers}
            />
        </div>
    );
}


