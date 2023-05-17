import '../pages/ChatPage/ChatPage.css';
import {useState} from 'react';

function ChannelHeader({newOpenChannel, channelHeaderName, setOpenChannel, setMessageList, setChannelHeaderName, retrieveChannelList}) {
    const [freezeState, setFreezeState] = useState(false);

    async function freezeChannel(channel) {
        if (channel.isFrozen) {
            await channel.unfreeze();
            setFreezeState(channel.isFrozen);
        } else{
            await channel.freeze();
            setFreezeState(channel.isFrozen);
        }
    }

    return (
        <div>
            <div className="channel-header">{channelHeaderName}</div>
            <div>
                <button onClick={() => freezeChannel(newOpenChannel)}>Freeze/Unfreeze</button>
            </div>
            <hr width='98%'></hr>
            {freezeState&& <div>Channel is Frozen</div>}
        </div>
    );
}

export default ChannelHeader;