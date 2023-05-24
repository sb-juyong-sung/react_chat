import './ChatPage.css';
import { ChannelList, ChannelHeader, MessageList, MessageInput, MemberList, UserProfile } from '../../components';

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
    const [profileUpdateState, setProfileUpdateState] = useState(false);

    const groupChannelFilter = new GroupChannelFilter();
    groupChannelFilter.includeEmpty = true;
    const groupChannelCollection = sb.groupChannel.createGroupChannelCollection();
    groupChannelCollection.filter = groupChannelFilter;
    groupChannelCollection.order = GroupChannelListOrder.CHRONOLOGICAL;
    const channelRetreiveHandler = {
        onchannelsAdded: (context, channels) => {
            console.log(channels)
        }
    };
    groupChannelCollection.setGroupChannelCollectionHandler(channelRetreiveHandler);


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
                newGroupChannel={newGroupChannel}
                userId={userId}
                channelList={channelList}
                profileUpdateState={profileUpdateState}
                setGroupChannel={setGroupChannel}
                setChannelHeaderName={setChannelHeaderName}
                setMessageList={setMessageList}
                setChannelList={setChannelList}
                setProfileUpdateState={setProfileUpdateState}
                retrieveChannelList={retrieveChannelList}
            />
            <UserProfile
                sb={sb}
                profileUpdateState={profileUpdateState}
                setProfileUpdateState={setProfileUpdateState}
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


