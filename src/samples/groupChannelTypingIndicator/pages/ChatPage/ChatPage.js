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
    const [typingMembers, setTypingMembers] = useState([]);
    const [userList, setUserList] = useState([]);
    
    const groupChannelFilter = new GroupChannelFilter();
    groupChannelFilter.includeEmpty = true;
    const groupChannelCollection = sb.groupChannel.createGroupChannelCollection({
        filter: groupChannelFilter,
        order: GroupChannelListOrder.CHRONOLOGICAL,
    });
    const channelRetreiveHandler = {
        onchannelsAdded: (context, channels) => {
            console.log(channels)
        }
    };
    groupChannelCollection.setGroupChannelCollectionHandler(channelRetreiveHandler);
    
    const typingIndicatorHandler = new GroupChannelHandler({
        onTypingStatusUpdated: (channel) => {
            const members = channel.getTypingUsers();
            setTypingMembers(members);
            console.log(members);
        },
    });
    sb.groupChannel.addGroupChannelHandler('typingIndicator', typingIndicatorHandler);


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
                        messageList={messageList}
                    />
                    {typingMembers.length > 0 && DisplayTypingIndicator(typingMembers)}
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
                retrieveAllUsers={retrieveAllUsers}
            />
        </div>
    );
}

const DisplayTypingIndicator = (typingMembers) => {
    let typingIndicatorText = ""

    typingMembers.length === 1 ? typingIndicatorText = typingMembers[0].nickname + " is typing..." :
        typingMembers.length === 2 ? typingIndicatorText = typingMembers[0].nickname + ", " + typingMembers[1].nickname + " are typing..." :
            typingIndicatorText = typingMembers[0].nickname + ", " + typingMembers[1].nickname + " and others are typing..."

    return (
        <div className='typing-indicator'>{typingIndicatorText}</div>
    )
}
