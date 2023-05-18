import '../pages/ChatPage/ChatPage.css';

function ThreadList({sb, parentMessage, threadList}) {

    const messageList = threadList[parentMessage.messageId];
    console.log(messageList);
    const rendorMessageList = messageList.map((msg) => {
        const messageSentbyMe = msg.sender.userId === sb.currentUser.userId;
        return (
            <div className={`message-item ${messageSentbyMe ? 'message-from-you' : ''}`}>
                <div className={`message  ${messageSentbyMe ? 'message-from-you' : ''}`}>
                    <div className='message-info'>
                        <div className="message-sender-name">{msg.sender.nickname}</div>
                        <div>{msg.createAt}</div>
                    </div>
                    <div>{msg.message}</div>
                    <button>thread</button>
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

export default ThreadList;