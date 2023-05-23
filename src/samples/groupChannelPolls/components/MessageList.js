import { Poll, PollVoteEvent } from '@sendbird/chat/poll';
import '../pages/ChatPage/ChatPage.css';
import { useState } from 'react';

function MessageList({ sb, newGroupChannel, messageList }) {
    const [voteEvent, setVoteEvent] = useState(null);


    async function updatePollOption(e, poll, pollId, optionId) {

        let PVoteEvent = null;
        if(e.target.checked) {
            PVoteEvent = await newGroupChannel.votePoll(pollId, [optionId], voteEvent);
        } else {
            PVoteEvent = await newGroupChannel.votePoll(pollId, [], voteEvent);
        }
        
        // for rerendering
        setVoteEvent(PVoteEvent);  
        

        poll.applyPollVoteEvent(PVoteEvent);


    }

    const rendorMessageList = messageList.map((msg) => {
        const messageSentbyMe = msg.sender.userId === sb.currentUser.userId;

        if (msg._poll) {
            // console.log(msg._poll.options);
        }
        
        if (voteEvent && voteEvent._payload.message_id === msg.messageId) {
            // msg._poll.voterCount = voteEvent._payload.voter_count
            // console.log(voteEvent._payload.voter_count);
        }

        return (
            <div key={msg.messageId} className={`message-item ${messageSentbyMe ? 'message-from-you' : ''}`}>
                <div className={`message  ${messageSentbyMe ? 'message-from-you' : ''}`}>
                    <div className='message-info'>
                        <div className="message-sender-name">{msg.sender.nickname}</div>
                        <div>{msg.createAt}</div>
                    </div>
                    {!msg._poll && <div>{msg.message}</div>}
                    {msg._poll &&
                        <div >
                            <h3>Poll</h3>
                            <div>{msg._poll.title}:</div>
                            <div>
                                {msg._poll.options.map((option, i) => {
                                    return (
                                        <div key={option.id} >
                                            <span style={{ marginRight: "5px" }}>{option.voteCount}:</span>
                                            <input
                                                type='checkbox'
                                                // checked={false}
                                                onChange={(e) => updatePollOption(e, msg._poll, option.pollId, option.id )}
                                            />
                                            {option.text}
                                        </div>
                                    )
                                })}
                            </div>
                            {messageSentbyMe &&
                                <div>
                                    <button>Add new option</button>
                                    <button>Close Poll</button>
                                </div>
                            }
                        </div>

                    }
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