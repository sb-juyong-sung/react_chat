import '../pages/ChatPage/ChatPage.css';

function ThreadHeader({sb, newGroupChannel, parentMessage, setGroupChannel, setMessageList, setThreadState}) {

    async function leaveChannel(channel) {
        setThreadState(false);
    }

    const messageSentbyMe = parentMessage.sender.userId === sb.currentUser.userId;

    return (
        <div>
            <div className="channel-header">Thread</div>
            <div><button onClick={() => leaveChannel(newGroupChannel)}>Exit Thread</button></div>
            <div className={`message-item ${messageSentbyMe ? 'message-from-you' : ''}`}>
                <div className={`message  ${messageSentbyMe ? 'message-from-you' : ''}`}>
                    <div className='message-info'>
                        <div className="message-sender-name">{parentMessage.sender.nickname}</div>
                        <div>{parentMessage.createAt}</div>
                    </div>
                    <div>{parentMessage.message}</div>
                </div>
            </div>
            <hr width='98%'></hr>
        </div>
    );
}

export default ThreadHeader;