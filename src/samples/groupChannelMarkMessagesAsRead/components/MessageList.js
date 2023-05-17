import '../pages/ChatPage/ChatPage.css';

function MessageList({sb, newGroupChannel, messageList}) {

    const rendorMessageList = messageList.map((msg) => {
        const messageSentbyMe = msg.sender.userId === sb.currentUser.userId;

        // const checkRead = newGroupChannel.getReadMembers(msg).length > 0;
        // console.log(msg.message, checkRead);
        console.log(msg);
        return (
            <div className={`message-item ${messageSentbyMe ? 'message-from-you' : ''}`}>
                <div className={`message  ${messageSentbyMe ? 'message-from-you' : ''}`}>
                    <div className='message-info'>
                        <div className="message-sender-name">{msg.sender.nickname}</div>
                        <div>{msg.createAt}</div>
                    </div>
                    <div>{msg.message}</div>
                    <div>{messageSentbyMe && msg.readCount ? 'VV' : (messageSentbyMe ? 'V' : null)}</div>
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