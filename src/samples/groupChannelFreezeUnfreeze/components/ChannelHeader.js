import '../pages/ChatPage/ChatPage.css';

function ChannelHeader({ newGroupChannel, channelHeaderName, freezeChannelBool, setGroupChannel, setMessageList, setChannelHeaderName, setFreezeChannelBool, retrieveChannelList }) {

    async function leaveChannel(channel) {
        await channel.leave();
        setGroupChannel(null);
        setMessageList([]);
        setChannelHeaderName('Channel Name');
        retrieveChannelList();
    }

    async function freezeChannel() {
        if (!freezeChannelBool) {
            await newGroupChannel.freeze();
            setFreezeChannelBool(true);
        } else{
            await newGroupChannel.unfreeze();
            setFreezeChannelBool(false);
        }
    }

    return (
        <div>
            <div className="channel-header">{channelHeaderName}</div>
            <div>
                <div><button onClick={() => leaveChannel(newGroupChannel)}>Leave Channel</button></div>
                <div className="freeze-channel">
                    Freeze Channel
                    <input type="checkbox" onChange={freezeChannel} checked={freezeChannelBool} />
                </div>
            </div>
            <hr width='98%'></hr>
        </div>
    );
}

export default ChannelHeader;