import '../pages/ChatPage/ChatPage.css';

import { GroupChannelHandler } from '@sendbird/chat/groupChannel';

function ChannelList({sb, newGroupChannel, userId, channelList, setGroupChannel, setChannelHeaderName, setMessageList, setChannelList, retrieveChannelList}) {

    // 채널 생성
    const createChannel = async (channelName) => {
        const GroupChannelCreateParams = {
            name: channelName,
            invitedUserIds: ['firstjd', 'secondjd', 'thirdjd'],
            operatorUserIds: [userId]
        };
        const newChannel = await sb.groupChannel.createChannel(GroupChannelCreateParams);
        setGroupChannel(newChannel);
        setChannelHeaderName(channelName);

        const channelHandler = new GroupChannelHandler({
            onMessageReceived: (channel, message) => {
                if (channel.url === newChannel.url) {
                    setMessageList((currentMessageList) => [...currentMessageList, message]);
                }
            },
            onMessageUpdated: (channel, message) => {
                console.log(message);
                if (message._poll) {
                    console.log('hi')
                }
            }
        });

        sb.groupChannel.addGroupChannelHandler('abcd', channelHandler);
        retrieveChannelList();
        setMessageList([]);

        const userIds = ['qa', 'wef'];
        await newChannel.inviteWithUserIds(userIds);
    }

    // 채널 삭제
    async function deleteChannel(channel){
        await channel.delete();
        setChannelList(channelList.filter(item => item.url !== channel.url));
    }

    // 채널을 클릭하였을 시 채널에 입장하는 효과
    async function loadChannel(channel) {
        {newGroupChannel && sb.groupChannel.removeGroupChannelHandler(newGroupChannel.url)};
        const PreviousMessageListQueryParams = {}
        const PreviousMessageListQuery = channel.createPreviousMessageListQuery(PreviousMessageListQueryParams);
        const messages = await PreviousMessageListQuery.load();
        setMessageList(messages)
        setGroupChannel(channel);
        setChannelHeaderName(channel.name);

        const channelHandler = new GroupChannelHandler({
            onMessageReceived: (newChannel, message) => {
                if (channel.url === newChannel.url) {
                    setMessageList((currentMessageList) => [...currentMessageList, message]);
                }
            },
            onMessageUpdated: (newChannel, message) => {
                console.log(message);
                if (message._poll) {
                    console.log('hi')
                }
            }
        });

        sb.groupChannel.addGroupChannelHandler(channel.url, channelHandler);
        retrieveChannelList();
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