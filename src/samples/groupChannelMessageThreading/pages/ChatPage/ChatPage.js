import './ChatPage.css';
import { ChannelList, ChannelHeader, MessageList, MessageInput, MemberList, ThreadList, ThreadHeader, ThreadInput } from '../../components';

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
    const [threadState, setThreadState] = useState(false);
    const [userList, setUserList] = useState([]);
    const [parentMessage, setParentMessage] = useState(null);
    const [threadList, setThreadList] = useState({});

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
                userId={userId}
                channelList={channelList}
                newGroupChannel={newGroupChannel}
                setThreadList={setThreadList}
                setGroupChannel={setGroupChannel}
                setChannelHeaderName={setChannelHeaderName}
                setMessageList={setMessageList}
                setChannelList={setChannelList}
                setThreadState={setThreadState}
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
                        threadList={threadList}
                        parentMessage={parentMessage}
                        newGroupChannel={newGroupChannel}
                        setThreadState={setThreadState}
                        setParentMessage={setParentMessage}
                        setThreadList={setThreadList}
                    />
                    <MessageInput
                        sb={sb}
                        newGroupChannel={newGroupChannel}
                        messageList={messageList}
                        setMessageList={setMessageList}
                    />
                </div>
            </div>
            {threadState &&
                <div className="channel">
                    <ThreadHeader
                        sb={sb}
                        newGroupChannel={newGroupChannel}
                        parentMessage={parentMessage}
                        setGroupChannel={setGroupChannel}
                        setMessageList={setMessageList}
                        setThreadState={setThreadState}
                    />
                    <div>
                        <ThreadList
                            sb={sb}
                            newGroupChannel={newGroupChannel}
                            parentMessage={parentMessage}
                            threadList={threadList}
                        />
                        <ThreadInput
                            sb={sb}
                            newGroupChannel={newGroupChannel}
                            parentMessage={parentMessage}
                            messageList={messageList}
                            threadList={threadList}
                            setMessageList={setMessageList}
                            setThreadList={setThreadList}
                        />
                    </div>
                </div>
            }
            <MemberList
                newGroupChannel={newGroupChannel}
                mutedMembers={mutedMembers}
                setMutedMembers={setMutedMembers}
                retrieveAllUsers={retrieveAllUsers}
            />
        </div>
    );
}


