import './chat_page.css';
import React, { useState, useEffect } from 'react';
import { GroupChannelModule, GroupChannelCreateParams, GroupChannelHandler, GroupChannelCollection, GroupChannelListOrder } from '@sendbird/chat/groupChannel';
import { UserMessageCreateParams } from '@sendbird/chat/message';
import { BaseChannel, createMyGroupChannelListQuery } from '@sendbird/chat';




export default function Chat({ sb }) {
    const [newGroupChannel, setGroupChannel] = useState(null);
    const [channelHeaderName, setChannelHeaderName] = useState('Channel Name');
    const [messageList, setMessageList] = useState([]);
    const [channelList, setChannelList] = useState(['hi']);
    const rendorMessageList = messageList.map((msg) =>
        <li>{msg}</li>
    );


    const createChannel = async (channelName) => {
        const GroupChannelCreateParams = {
            name: channelName,
            invitedUserIds: ['secondjd']
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


    return (
        <div>
            <div className="channel-list">
                <div className="channel-type">
                    <h1>Channel List</h1>
                    <input id='channelName' type="text"></input>
                    <button onClick={() => createChannel(document.getElementById('channelName').value)}>create</button>
                </div>
                <ul>
                    {channelList.map((channel) => (
                        <li key={channel.url}>{channel.name}</li>
                    ))}
                </ul>
            </div>
            <div className="channel">
                <div className="channel-header">{channelHeaderName}</div>
                <hr className='hr-solid'></hr>
                <div>
                    <ul>{rendorMessageList}</ul>
                    <div className="message-input">
                        <input id='textMessage' type="text" onKeyPress={clickEnter}></input>
                        <button className="send-message-button" onClick={() => sendMessage(document.getElementById('textMessage').value)}>send</button>
                    </div>
                </div>
            </div>
            <div className="members-list">
                {newGroupChannel.members.map((member) =>
                    <div className="member-item" key={member.userId}>{member.nickname}</div>
                )
                }
            </div>
        </div>
    );
}


