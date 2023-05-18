import '../pages/ChatPage/ChatPage.css';

import { GroupChannelHandler } from '@sendbird/chat/groupChannel';

function ChannelList({sb, userId, channelList, newGroupChannel, setThreadList, setGroupChannel, setChannelHeaderName, setMessageList, setChannelList, setThreadState, retrieveChannelList}) {

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
            onMessageReceived: (newChannel, message) => {
                setMessageList((currentMessageList) => [...currentMessageList, message]);
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
        const PreviousMessageListQueryParams = {}
        const PreviousMessageListQuery = channel.createPreviousMessageListQuery(PreviousMessageListQueryParams);
        const messages = await PreviousMessageListQuery.load();
        

        setThreadState(false);
        setMessageList(messages)
        setGroupChannel(channel);
        setChannelHeaderName(channel.name);

        for (let i = 0; i < messages.length; i++) {
            const msg = messages[i]
            getThreadMessage(msg);
        }
    }

    async function getThreadMessage(parentMessage) {

        const paramsThreadedMessageListParams = {
            prevResultSize: 10,
            nextResultSize: 10,
            isInclusive: true,
            reverse: false,
            includeParentMessageInfo: false,
        }

        const { threadedMessages } = await parentMessage.getThreadedMessagesByTimestamp(30, paramsThreadedMessageListParams);
        setThreadList(threadList => ({
            ...threadList,
            [parentMessage.messageId]: threadedMessages || []
        }));
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