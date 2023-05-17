import '../pages/ChatPage/ChatPage.css';
import { useState } from 'react';

function MessageList({ sb, newGroupChannel, messageList }) {

    const rendorMessageList = messageList.map((msg) => {
        const messageSentbyMe = msg.sender.userId === sb.currentUser.userId;

        // const checkRead = newGroupChannel.getReadMembers(msg).length > 0;
        // console.log(msg.message, checkRead);
        return (
            <div className={`message-item ${messageSentbyMe ? 'message-from-you' : ''}`}>
                <div className={`message  ${messageSentbyMe ? 'message-from-you' : ''}`}>
                    <div className='message-info'>
                        <div className="message-sender-name">{msg.sender.nickname}</div>
                        <div>{msg.createAt}</div>
                    </div>
                    <div>{msg.message}</div>
                    <div>
                        {messageSentbyMe &&
                            <div className="number-of-undelivered-members"> Number of members unread : {msg.unreadCounts}
                            </div>}
                    </div>
                </div>
            </div>
        )
    }
    );

    // function getNumberOfUnreadMembers(msg) {
    //     const unreadCount = newGroupChannel.getUnreadMemberCount(msg);
    //     msg.unreadCounts = unreadCount;
    // }

    // function hideNumberOfUnreadMembers(msg) {
    //     msg.unreadCounts = null;
    // }

    return (
        <div className='message-list'>
            <div>{rendorMessageList}</div>
        </div>
    );
}

export default MessageList;