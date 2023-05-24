import '../pages/ChatPage/ChatPage.css';
import { useState } from 'react';

function MessageList({ sb, messageList }) {

    const [showReaction, setShowReaction] = useState(false);

    function handleShowReaction() {
        setShowReaction(!showReaction);
    }

    function addMessageReaction() {

    }

    const rendorMessageList = messageList.map((msg) => {
        const messageSentbyMe = msg.sender.userId === sb.currentUser.userId;
        return (
            <div key={msg.messageId} className={`message-item ${messageSentbyMe ? 'message-from-you' : ''}`}>
                <div className={`message  ${messageSentbyMe ? 'message-from-you' : ''}`}>
                    <div className='message-info'>
                        <div className="message-sender-name">{msg.sender.nickname}</div>
                        <div>{msg.createAt}</div>
                    </div>
                    <div>{msg.message}</div>

                    <div className='react-button-wrapper'>
                        {showReaction &&
                            <ul className="reactions-list">
                                <li>
                                    <button className="control-button" onClick={(e) => addMessageReaction(msg, e)}>&#128512;</button>
                                </li>
                                <li>
                                    <button className="control-button" onClick={(e) => addMessageReaction(msg, e)}>&#128516;</button>
                                </li>
                                <li>
                                    <button className="control-button" onClick={(e) => addMessageReaction(msg, e)}>&#128517;</button>
                                </li>
                                <li>
                                    <button className="control-button" onClick={(e) => addMessageReaction(msg, e)}>&#128579;</button>
                                </li>
                                <li>
                                    <button className="control-button" onClick={(e) => addMessageReaction(msg, e)}>&#128529;</button>
                                </li>
                            </ul>
                        }
                        <button className="control-button react-button" onClick={() => handleShowReaction()}>
                            <span className="message-icon react-button-img">&#128512;</span>
                        </button>

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