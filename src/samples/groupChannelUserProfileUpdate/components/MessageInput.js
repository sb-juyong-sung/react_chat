import '../pages/ChatPage/ChatPage.css';

function MessageInput({sb, newGroupChannel, messageList, setMessageList}) {

    function clickEnter(e) {
        if (e.key === 'Enter') {
            sendMessage(document.getElementById('textMessage').value)
        }
    }

    function sendMessage(textMessage) {
        const UserMessageCreateParams = {};
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

                });

            setMessageList([...messageList, UserMessageCreateParams]);
        } else {
            return null;
        }

    }

    return (
        <div className="message-input">
            <input id='textMessage' type="text" onKeyPress={clickEnter}></input>
            <div>
                <button className="send-message-button" onClick={() => sendMessage(document.getElementById('textMessage').value)}>send</button>
            </div>
        </div>
    );
}

export default MessageInput;