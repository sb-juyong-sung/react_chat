import './ChatPage.css';
import {
    ChannelList, ChannelHeader, MessageList, MessageInput, MemberList,
    CreatePoll, AddOption
} from '../../components';

import React, { useState, useEffect } from 'react';
import { GroupChannelModule, GroupChannelCreateParams, GroupChannelHandler, GroupChannelCollection, GroupChannelListOrder, GroupChannelFilter } from '@sendbird/chat/groupChannel';
import { UserMessageCreateParams } from '@sendbird/chat/message';
import { BaseChannel, createMyGroupChannelListQuery } from '@sendbird/chat';
import { Poll, PollVoteEvent } from '@sendbird/chat/poll';


export default function Chat({ sb, userId }) {
    const [newGroupChannel, setGroupChannel] = useState(null);
    const [channelHeaderName, setChannelHeaderName] = useState('Channel Name');
    const [messageList, setMessageList] = useState([]);
    const [channelList, setChannelList] = useState([]);
    const [mutedMembers, setMutedMembers] = useState([]);
    const [showPoll, setShowPoll] = useState(false);
    const [showAddOption, setShowAddOption] = useState(false);
    const [currentPoll, setCurrentPoll] = useState(null);
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
                setGroupChannel={setGroupChannel}
                setChannelHeaderName={setChannelHeaderName}
                setMessageList={setMessageList}
                setChannelList={setChannelList}
                retrieveChannelList={retrieveChannelList}
            />
            {showPoll && (
                <CreatePoll
                    sb={sb}
                    newGroupChannel={newGroupChannel}
                    messageList={messageList}
                    showPoll={showPoll}
                    setMessageList={setMessageList}
                    setShowPoll={setShowPoll}
                />
            )}
            {showAddOption && (
                <AddOption
                    newGroupChannel={newGroupChannel}
                    currentPoll={currentPoll}
                    showAddOption={showAddOption}
                    setShowAddOption={setShowAddOption}
                />
            )}
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
                        showAddOption={showAddOption}
                        setCurrentPoll={setCurrentPoll}
                        setShowAddOption={setShowAddOption}
                    />
                    <MessageInput
                        sb={sb}
                        newGroupChannel={newGroupChannel}
                        messageList={messageList}
                        showPoll={showPoll}
                        setMessageList={setMessageList}
                        setShowPoll={setShowPoll}
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


