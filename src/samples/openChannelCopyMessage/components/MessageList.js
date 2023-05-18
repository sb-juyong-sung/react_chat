import '../pages/ChatPage/ChatPage.css';

function MessageList({sb, newOpenChannel, messageList, setMessageList}) {

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
                    <button onClick={() => copyMessage(msg)}>copy</button>
                </div>
            </div>
        )
    }
    );

    async function copyMessage(msg){
        const response = await newOpenChannel.copyUserMessage(newOpenChannel, msg);
        console.log(response);
        setMessageList([...messageList, response]);

    };

    return (
        <div className='message-list'>
            <div>{rendorMessageList}</div>
        </div>
    );
}

export default MessageList;