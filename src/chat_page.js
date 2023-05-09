import './chat_page.css';
import React, { useState, useEffect } from 'react';
import { GroupChannelModule, GroupChannelCreateParams, GroupChannelHandler, GroupChannelCollection, GroupChannelListOrder } from '@sendbird/chat/groupChannel';
import { UserMessageCreateParams } from '@sendbird/chat/message';
import { BaseChannel } from '@sendbird/chat';




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
            name: channelName
        };
        const newChannel = await sb.groupChannel.createChannel(GroupChannelCreateParams);
        setGroupChannel(newChannel);
        setChannelHeaderName(channelName);

        const channelHandler = new GroupChannelHandler({
            onMessageReceived: (newChannel, message) => {
                console.log(channelHandler.message)
                setMessageList([...messageList, channelHandler.message]);

            }
        });

        sb.groupChannel.addGroupChannelHandler(channelHandler);
        retrieveChannelList();
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
        const channels = [];
        if (groupChannelCollection.hasMore) {
            const channelsLoad = await groupChannelCollection.loadMore();
            channels.push(...channelsLoad);
        }
        const channelItems = channels.map((channel) => (
            <li key={channel.url}>{channel.url}</li>
        ));
        // setChannelList(channels);
        console.log(channels);

    }

    function receiveMessage() {
        var channelHandler = new GroupChannelHandler();

        channelHandler.onMessageReceived = function(channel, message) {
            console.log(message);
            setMessageList([...messageList, message.message]);
        }
        sb.groupChannel.addGroupChannelHandler('UNIQUE_HANDLER_ID', channelHandler);
    }


    useEffect(() => {
        receiveMessage();
    }, []);


    return (
        <div>
            <div className="align-left">
                <h1>"Channel List"</h1>
                <ul>
                    {channelList}
                </ul>
                <hr></hr>
            </div>
            <div className="align-left">
                <h1>{channelHeaderName}</h1>
                <hr></hr>
                <ul>{rendorMessageList}</ul>
                <hr></hr>
                message : <input id='textMessage' type="text" onKeyPress={clickEnter}></input>
                <button onClick={() => sendMessage(document.getElementById('textMessage').value)}>send</button>
            </div>
            <div className="align-left">
                channelName : <input id='channelName' type="text"></input>
                <button onClick={() => createChannel(document.getElementById('channelName').value)}>create</button>
            </div>
        </div>
    );
}


