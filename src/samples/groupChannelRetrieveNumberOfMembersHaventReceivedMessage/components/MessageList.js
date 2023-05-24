import '../pages/ChatPage/ChatPage.css';
import { useState } from 'react';

function MessageList({ sb, newGroupChannel, messageList,
    showUnreceived, countUnreceived, currentMessage,
    setShowUnreceived, setCountUnreceived, setCurrentMessage
}) {

    
    

    function unReceived(msg) {
        setShowUnreceived(true);
        setCountUnreceived(newGroupChannel.getUndeliveredMemberCount(msg));
        setCurrentMessage(msg);


    }

    const rendorMessageList = messageList.map((msg) => {
        const messageSentbyMe = msg.sender.userId === sb.currentUser.userId;
        return (
            <div key={msg.messageId} className={`message-item ${messageSentbyMe ? 'message-from-you' : ''}`}>
                <div className={`message  ${messageSentbyMe ? 'message-from-you' : ''}`}>
                    <div className='message-info'>
                        <div className="message-sender-name">{msg.sender.nickname}</div>
                        <div>{msg.createAt}</div>
                        {messageSentbyMe &&
                            <div>
                                <button className='control-button number-of-undelivered-message-btn' onClick={() => unReceived(msg)}>click</button>
                            </div>
                        }
                    </div>
                    <div>{msg.message}</div>
                    <div>
                        {messageSentbyMe && showUnreceived && (currentMessage.messageId === msg.messageId) &&
                            <div className="number-of-undelivered-members"> Number of members unreceived : {countUnreceived}
                            </div>}
                    </div>
                </div>
            </div>
        )
    }
    );

    return (
        <div className='message-list'>
            <div>{rendorMessageList}</div>
        </div>
    );
}

export default MessageList;