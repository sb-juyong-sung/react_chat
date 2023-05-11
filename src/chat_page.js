import './chat_page.css';
import React, { useState, useEffect } from 'react';
import { GroupChannelModule, GroupChannelCreateParams, GroupChannelHandler, GroupChannelCollection, GroupChannelListOrder } from '@sendbird/chat/groupChannel';
import { UserMessageCreateParams } from '@sendbird/chat/message';
import { BaseChannel, createMyGroupChannelListQuery } from '@sendbird/chat';




export default function Chat({ sb, userId }) {
    const [newGroupChannel, setGroupChannel] = useState(null);
    const [channelHeaderName, setChannelHeaderName] = useState('Channel Name');
    const [messageList, setMessageList] = useState([]);
    const [channelList, setChannelList] = useState(['hi']);
    const [mutedMembers, setMutedMembers] = useState([]);
    const rendorMessageList = messageList.map((msg) =>{
        // <li>{msg}</li>
        return (
            <div className='message-itme'>
                <div className='message'>
                    <div>{msg}</div>
                </div>
            </div>
        )
    }        
    );


    const createChannel = async (channelName) => {
        const GroupChannelCreateParams = {
            name: channelName,
            invitedUserIds: ['secondjd'],
            operatorUserIds: [userId]
        };
        const newChannel = await sb.groupChannel.createChannel(GroupChannelCreateParams);
        setGroupChannel(newChannel);
        setChannelHeaderName(channelName);

        const channelHandler = new GroupChannelHandler({
            onMessageReceived: (newChannel, message) => {
                setMessageList((currentMessageList) => [...currentMessageList, message.message]);
            }
        });

        sb.groupChannel.addGroupChannelHandler('abcd', channelHandler);
        retrieveChannelList();
        setMessageList([]);
    }

    function clickEnter(e) {
        if (e.key === 'Enter') {
            sendMessage(document.getElementById('textMessage').value)
        }
    }

    function sendMessage(textMessage) {
        const UserMessageCreateParams = {};
        UserMessageCreateParams.message = textMessage;

        newGroupChannel.sendUserMessage(UserMessageCreateParams)
            .onPending((message) => {

            })
            .onFailed((error) => {
                console.log("error")
            })
            .onSucceeded((message) => {

            });

        setMessageList([...messageList, textMessage]);
    }

    async function retrieveChannelList() {
        const groupChannelCollection = sb.groupChannel.createGroupChannelCollection();

        if (groupChannelCollection.hasMore) {
            const channelsLoad = await groupChannelCollection.loadMore();
            setChannelList((currentChannelList) => [...currentChannelList, ...channelsLoad]);
        }

        const channelRetreiveHandler = {
            onchannelsAdded: (context, channels) => {
                console.log(channels)
            }
        };

        groupChannelCollection.setGroupChannelCollectionHandler(channelRetreiveHandler);
    }

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

    return (
        <div className='container'>
            <div className="channel-list">
                <div className="channel-type">
                    <h1>Channel List</h1>
                </div>
                <ul>
                    {channelList.map((channel) => (
                        <div className='channel-list-item'>
                            <div className='channel-list-item-name' key={channel.url}>{channel.name}</div>
                        </div>
                    ))}
                </ul>
                <div className="message-input">
                    <input id='channelName' type="text"></input>
                    <button onClick={() => createChannel(document.getElementById('channelName').value)}>create</button>
                </div>
            </div>
            <div className="channel">
                <div className="channel-header">{channelHeaderName}</div>
                <div>
                    <div className='message-list'>
                        <ul>{rendorMessageList}</ul>
                    </div>
                    <div className="message-input">
                        <input id='textMessage' type="text" onKeyPress={clickEnter}></input>
                        <div>
                            <button className="send-message-button" onClick={() => sendMessage(document.getElementById('textMessage').value)}>send</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1>Members</h1>
                {membersList()}
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
    );
}


