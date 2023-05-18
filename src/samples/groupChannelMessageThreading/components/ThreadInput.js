import { UserMessage } from '@sendbird/chat/message';
import '../pages/ChatPage/ChatPage.css';

function ThreadInput({sb, newGroupChannel, parentMessage, messageList, threadList, setMessageList, setThreadList}) {
    
    function clickEnter(e) {
        if (e.key === 'Enter') {
            sendMessage(document.getElementById('threadMessage').value)
        }
    }

    function sendMessage(textMessage) {
        const UserMessageCreateParams = {};
        UserMessageCreateParams.parentMessageId = parentMessage.messageId;
        UserMessageCreateParams.message = textMessage;
        UserMessageCreateParams.sender = { nickname: sb.currentUser.nickname, userId: sb.currentUser.userId };
        if (newGroupChannel) {
            newGroupChannel.sendUserMessage(UserMessageCreateParams)
                .onPending((message) => {

                })
                .onFailed((error) => {
                    console.log("error")
                })
                .onSucceeded((message) => {
                    setThreadList(threadList => ({
                        ...threadList,
                        [parentMessage.messageId]: [...threadList[parentMessage.messageId], message]
                    }));
                });

            
        } else {
            return null;
        }

    }

    return (
        <div className="message-input">
            <input id='threadMessage' type="text" onKeyPress={clickEnter}></input>
            <div>
                <button className="send-message-button" onClick={() => sendMessage(document.getElementById('threadMessage').value)}>send</button>
            </div>
        </div>
    );
}

export default ThreadInput;