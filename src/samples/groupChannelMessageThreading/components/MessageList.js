import '../pages/ChatPage/ChatPage.css';

function MessageList({sb, messageList, threadList, parentMessage, newGroupChannel, setThreadState, setParentMessage, setThreadList}) {

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
                    <button onClick={() => makeThread(msg)}>thread</button>
                </div>
            </div>
        )
    }
    );

    function makeThread(msg) {
        setThreadState(true);
        setParentMessage(msg);
        setThreadList(threadList => ({
            ...threadList,
            [msg.messageId]: threadList[msg.messageId] || []
        }));

        getThreadMessage(parentMessage);
    }


    async function getThreadMessage(parentMessage) {
        const params = {
            messageId: parentMessage.messageId,
            channelType: "group", // Acceptable values are open and group.
            channelUrl: newGroupChannel.url,
        };


        const paramsThreadedMessageListParams = {
            prevResultSize: 10,
            nextResultSize: 10,
            isInclusive: true,
            reverse: false,
            includeParentMessageInfo: false,
        }

        const { threadedMessages } = await parentMessage.getThreadedMessagesByTimestamp(30, paramsThreadedMessageListParams);
        setThreadList(threadList => ({
            ...threadList,
            [parentMessage.messageId]: threadedMessages || []
        }));

    }

    return (
        <div className='message-list'>
            <div>{rendorMessageList}</div>
        </div>
    );
}

export default MessageList;