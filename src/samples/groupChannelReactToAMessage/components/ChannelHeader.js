import '../pages/ChatPage/ChatPage.css';

function ChannelHeader({newGroupChannel, channelHeaderName, setGroupChannel, setMessageList, setChannelHeaderName, retrieveChannelList}) {

    async function leaveChannel(channel) {
        await channel.leave();
        setGroupChannel(null);
        setMessageList([]);
        setChannelHeaderName('Channel Name');
        retrieveChannelList();
    }

    return (
        <div>
            <div className="channel-header">{channelHeaderName}</div>
            <div><button onClick={() => leaveChannel(newGroupChannel)}>Leave Channel</button></div>
            <hr width='98%'></hr>
        </div>
    );
}

export default ChannelHeader;