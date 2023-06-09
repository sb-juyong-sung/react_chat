import '../pages/ChatPage/ChatPage.css';

import { OpenChannelHandler } from '@sendbird/chat/openChannel';

function ChannelList({sb, userId, channelList, setOpenChannel, setChannelHeaderName, setMessageList, setChannelList, retrieveChannelList}) {

    // 채널 생성
    const createChannel = async (channelName) => {
        const OpenChannelCreateParams = {
            name: channelName,
            operatorUserIds: [userId]
        };
        const newChannel = await sb.openChannel.createChannel(OpenChannelCreateParams);
        await newChannel.enter();
        setOpenChannel(newChannel);
        setChannelHeaderName(channelName);

        const channelHandler = new OpenChannelHandler({
            onMessageReceived: (newChannel, message) => {
                setMessageList((currentMessageList) => [...currentMessageList, message]);
            }
        });
        sb.openChannel.addOpenChannelHandler('messageHandler', channelHandler);
        retrieveChannelList();
        setMessageList([]);

    }

    // 채널 삭제
    async function deleteChannel(channel){
        await channel.delete();
        setChannelList(channelList.filter(item => item.url !== channel.url));
    }

    // 채널을 클릭하였을 시 채널에 입장하는 효과
    async function loadChannel(channel) {
        await channel.enter();
        const channelHandler = new OpenChannelHandler({
            onMessageReceived: (newChannel, message) => {
                setMessageList((currentMessageList) => [...currentMessageList, message]);
            }
        });
        const PreviousMessageListQueryParams = {}
        const PreviousMessageListQuery = channel.createPreviousMessageListQuery(PreviousMessageListQueryParams);
        const messages = await PreviousMessageListQuery.load();
        setMessageList(messages)
        setOpenChannel(channel);
        setChannelHeaderName(channel.name);
    }

    return (
        <div className="channel-list">
                <div className="channel-type">
                    <h1>Channel List</h1>
                </div>
                <div>
                    {channelList.map((channel) => (
                        <div key={channel.url} className='channel-list-item'>
                            <div className='channel-list-item-name' 
                                onClick={() => {loadChannel(channel)}} key={channel.url}>{channel.name}
                            </div>
                            <div>
                                <button className='control-button' onClick={() => deleteChannel(channel)}>del</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="channel-input">
                    <input id='channelName' type="text"></input>
                    <button onClick={() => createChannel(document.getElementById('channelName').value)}>create</button>
                </div>
            </div>
    );
}

export default ChannelList;