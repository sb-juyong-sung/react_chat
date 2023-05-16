import './ChatPage.css';
import { ChannelList, ChannelHeader, MessageList, MessageInput } from '../../components';

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
            console.log(channels)
        }
    };
    groupChannelCollection.setGroupChannelCollectionHandler(channelRetreiveHandler);


    // messageinput
    function clickEnter(e) {
        if (e.key === 'Enter') {
            sendMessage(document.getElementById('textMessage').value)
        }
    }

    // messageinput
    function sendMessage(textMessage) {
        const UserMessageCreateParams = {};
        UserMessageCreateParams.message = textMessage;
        UserMessageCreateParams.sender = { nickname: sb.currentUser.nickname, userId: sb.currentUser.userId };
        if (newGroupChannel) {
            newGroupChannel.sendUserMessage(UserMessageCreateParams)
                .onPending((message) => {

                })
                .onFailed((error) => {
                    console.log("error")
                })
                .onSucceeded((message) => {

                });

            setMessageList([...messageList, UserMessageCreateParams]);
        } else {
            return null;
        }

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


    function membersList() {
        if (newGroupChannel) {
            return <div className="members-list">
                {newGroupChannel.members.map((member) =>
                    <div className="member-item" key={member.userId}>
                        {member.nickname}
                        <button onClick={() => muteUser(member)}>mute</button>
                        <button onClick={() => unmuteUser(member)}>unmute</button>
                    </div>
                )}
            </div>;
        } else {
            return null;
        }
    }

    async function mutedMembersList() {
        const query = newGroupChannel.createMutedUserListQuery();
        const mutedUsers = await query.next();
        setMutedMembers(mutedUsers);
    }

    async function muteUser(member) {
        await newGroupChannel.muteUser(member, 1000, 'yes');
        mutedMembersList();
    }

    async function unmuteUser(member) {
        await newGroupChannel.unmuteUser(member);
        mutedMembersList();
    }

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
            {/* channel header + message list */}
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
            {/* member list */}
            <div>
                <div className='members'>
                    <h1>Members</h1>
                    <button onClick={() => retrieveAllUsers()}>Invite</button>
                    {membersList()}
                </div>
                <div className='members'>
                    <h1>Muted Members</h1>
                    <div className="members-list">
                        {mutedMembers.map((member) => (
                            <div className="member-item" key={member.userId}>
                                {member.nickname}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


