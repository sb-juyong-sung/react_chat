import './chat_page.css';
import React, { useState } from 'react';
import { GroupChannelModule, GroupChannelCreateParams } from '@sendbird/chat/groupChannel';
import { UserMessageCreateParams } from '@sendbird/chat/message';


export default function Chat({ sb }) {
    // const [GroupChannel, setGroupChannel] = useState(null);

    const createChannel = async (channelName) => {
        const GroupChannelCreateParams = {
            name: channelName
        };
        const GroupChannel = await sb.groupChannel.createChannel(GroupChannelCreateParams);
        
        const UserMessageCreateParams = {};
        UserMessageCreateParams.message = 'hi';
        GroupChannel.sendUserMessage(UserMessageCreateParams)
            .onPending((message) => {

            })
            .onFailed((error) => {
                console.log("error")
            })
            .onSucceeded((message) => {

            });
    }

    function sendMessage(e) {
        if (e.key === 'Enter') {
            // const UserMessageCreateParams = {};
            // UserMessageCreateParams.message = 'hi';
            // GroupChannel.sendUserMessage(UserMessageCreateParams)
            //     .onPending((message) => {

            //     })
            //     .onFailed((error) => {
            //         console.log("error")
            //     })
            //     .onSucceeded((message) => {

            //     });
        }
    }

    return (
        <div>
            <div className="align-left">
                <h1>"Channel List"</h1>
                <hr></hr>
            </div>
            <div className="align-left">
                <h1>"Channel Name"</h1>
                <hr></hr>
                message : <input id='message' type="text" onKeyPress={sendMessage}></input>
            </div>
            <div className="align-left">
                channelName : <input id='channelName' type="text"></input>
                <button onClick={() => createChannel(document.getElementById('channelName').value)}>create</button>
            </div>
        </div>
    );
}


