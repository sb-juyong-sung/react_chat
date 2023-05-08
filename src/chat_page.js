import './chat_page.css';
import React, { useState } from 'react';
import { GroupChannelModule, GroupChannelCreateParams } from '@sendbird/chat/groupChannel';
import { UserMessageCreateParams } from '@sendbird/chat/message';


export default function Chat({sb}) {
    // const [GroupChannel, setGroupChannel] = useState(0);

    const createChannel = async () => {
        const GroupChannelCreateParams = {};
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
            // const UserMessageCreateParams = {
            // };
            
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
                message : <input id = 'message' type="text" onKeyPress={sendMessage}></input>
            </div>
            <div className="align-left">
                <button onClick={() => createChannel()}>create</button>
            </div>
        </div>
    );
}


