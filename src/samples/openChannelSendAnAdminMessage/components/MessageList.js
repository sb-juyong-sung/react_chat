import '../pages/ChatPage/ChatPage.css';

function MessageList({sb, messageList}) {

    const rendorMessageList = messageList.map((msg) => {

        if (msg.messageType === "admin"){
            return <div>admin: {msg.message}</div>
        } else {
        const messageSentbyMe = msg.sender.userId === sb.currentUser.userId;
        return (
            <div className={`message-item ${messageSentbyMe ? 'message-from-you' : ''}`}>
                <div className={`message  ${messageSentbyMe ? 'message-from-you' : ''}`}>
                    <div className='message-info'>
                        <div className="message-sender-name">{msg.sender.nickname}</div>
                        <div>{msg.createAt}</div>
                    </div>
                    <div>{msg.message}</div>
                </div>
            </div>
        )}
    }
    );

    return (
        <div className='message-list'>
            <div>{rendorMessageList}</div>
        </div>
    );
}

export default MessageList;