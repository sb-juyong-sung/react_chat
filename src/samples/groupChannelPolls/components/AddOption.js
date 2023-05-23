import { Poll } from '@sendbird/chat/poll';
import '../pages/ChatPage/ChatPage.css';

function AddOption({newGroupChannel, currentPoll, showAddOption, setShowAddOption}) {

    function handleShowAddOption() {
        setShowAddOption(!showAddOption);
    }

    async function updatePoll(newOption) {
        const PollUpdateParams = {
            optionTexts: [...currentPoll.options, newOption]
        }
        console.log(currentPoll);
        console.log(PollUpdateParams)
        // await newGroupChannel.updatePoll(currentPoll.id, PollUpdateParams);
        await newGroupChannel.addPollOption(currentPoll.id, newOption);
    }

    return (
        <div className="overlay">
            <div className="overlay-content create-poll-modal">
                <div className="option input_wrapper">
                    <input
                        type='text'
                        placeholder="write an option's update"
                        id='addPollOption'
                    />
                    <button className='option-add_btn' onClick={()=>updatePoll(document.getElementById('addPollOption').value)}>Add</button>
                </div>
                <span className="poll-close_btn" onClick={()=>handleShowAddOption()}>&#10006;</span>
            </div>
        </div>
    );
}

export default AddOption;