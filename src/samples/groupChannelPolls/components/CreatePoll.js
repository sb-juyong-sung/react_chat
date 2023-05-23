import '../pages/ChatPage/ChatPage.css';
import { useState } from 'react';

function CreatePoll({ sb, newGroupChannel, messageList, showPoll,
    setMessageList, setShowPoll }) {

    // const [pollTitle, setPollTitle] = useState(null);
    const [optionList, setOptionList] = useState([]);
    const [boolAnonymous, setBoolAnonymous] = useState(false);
    const [boolSuggession, setBoolSuggestion] = useState(false);
    const [boolMultiple, setBoolMultiple] = useState(false)

    async function createPoll(pollTitle) {

        const PollCreateParams = {
            title: pollTitle,
            optionTexts: optionList,
            isAnonymous: boolAnonymous,
            allowUserSuggesion: boolSuggession,
            allowMultipleVotes: boolMultiple,
            closeAt: -1
        };

        const poll = await sb.poll.create(PollCreateParams);

        const UserMessageCreateParams = {
            message: pollTitle,
            pollId: poll.id
        };

        if (newGroupChannel) {
            newGroupChannel.sendUserMessage(UserMessageCreateParams)
                .onPending((message) => {

                })
                .onFailed((error) => {
                    console.log("error")
                })
                .onSucceeded((message) => {
                    setMessageList([...messageList, message]);
                });

        } else {
            return null;
        }

        setOptionList([]);
        setBoolAnonymous(false);
        setBoolSuggestion(false);
        setBoolMultiple(false);
        setShowPoll(!showPoll);
    }

    function handleClosePoll() {
        setShowPoll(!showPoll);
        setOptionList([]);
        setBoolAnonymous(false);
        setBoolSuggestion(false);
        setBoolMultiple(false);
    }

    function addOption(option) {
        setOptionList([...optionList, option]);
    }

    function checkAnonymous(e) {
        setBoolAnonymous(e.target.checked);
    }

    function checkSuggestion(e) {
        setBoolSuggestion(e.target.checked);
    }

    function checkMultiple(e) {
        setBoolMultiple(e.target.checked);
    }


    return (
        <div className="overlay">
            <div className="overlay-content create-poll-modal">
                <h3>Create Poll:</h3>
                <div className="create-poll-modal_inputs">
                    <label htmlFor="pollTitle">Title</label>
                    <div className="input_wrapper">
                        <input
                            type="text"
                            placeholder='write a title'
                            id="pollTitle"
                        />
                    </div>
                    <label htmlFor="pollOption">Add Option</label>
                    <div className="input_wrapper">
                        <input
                            type="text"
                            placeholder="write an option"
                            id="pollOption"
                        />
                        <button className='option-add_btn' onClick={() => addOption(document.getElementById('pollOption').value)}>Add</button>
                    </div>
                    <div className="poll-options input_wrapper">
                        {optionList.map((item, i) => {
                            return (
                                <span className="options_item" key={`${item}${i}`} data-tooltip="click to delete">{item}</span>
                            )
                        })}
                    </div>
                    <div className="freeze-channel input_wrapper" onChange={(e) =>checkAnonymous(e)}checked={boolAnonymous}>
                        <input type="checkbox" />
                        Is anonymous?
                    </div>
                    <div className="freeze-channel input_wrapper" onChange={(e) => checkSuggestion(e)} checked={boolSuggession}>
                        <input type="checkbox" />
                        Allow user suggestion?
                    </div>
                    <div className="freeze-channel input_wrapper" onChange={(e) => checkMultiple(e)} checked={boolMultiple}>
                        <input type="checkbox" />
                        Allow multiple votes?
                    </div>
                    <button className="poll-create_btn" onClick={() => createPoll(document.getElementById('pollTitle').value)}>Create and send</button>
                    <span className="poll-close_btn" onClick={() => handleClosePoll()} >&#10006;</span>
                </div>
            </div>
        </div>
    );
}

export default CreatePoll;