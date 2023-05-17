import './ChatPage.css';
import { ChannelList, ChannelHeader, MessageList, MessageInput } from '../../components';

import React, { useState, useEffect } from 'react';
import { GroupChannelModule, GroupChannelCreateParams, GroupChannelHandler, GroupChannelCollection } from '@sendbird/chat/groupChannel';
import { OpenChannelListOrder } from '@sendbird/chat/openChannel';
import { UserMessageCreateParams } from '@sendbird/chat/message';
import { BaseChannel, createMyGroupChannelListQuery } from '@sendbird/chat';




export default function Chat({ sb, userId }) {
    const [newOpenChannel, setOpenChannel] = useState(null);
    const [channelHeaderName, setChannelHeaderName] = useState('Channel Name');
    const [messageList, setMessageList] = useState([]);
    const [channelList, setChannelList] = useState([]);
    const [mutedMembers, setMutedMembers] = useState([]);
    const [userList, setUserList] = useState([]);
    
    // 채널 리스트
    const openQuery = sb.openChannel.createOpenChannelListQuery();

    // const channelRetreiveHandler = {
    //     onchannelsAdded: (context, channels) => {
    //         console.log(channels)
    //     }
    // };
    // openChannelCollection.setOpenChannelCollectionHandler(channelRetreiveHandler);


    async function retrieveChannelList() {
        if (openQuery.hasNext) {
            const channelsLoad = await openQuery.next();
            setChannelList((currentChannelList) => [...channelsLoad]);
        }
    }

    useEffect(() => {
        retrieveChannelList();
    }, []);

    async function retrieveAllUsers() {
        const query = sb.createApplicationUserListQuery({ limit: 20 });
        const users = await query.next();

        return users.map((user) => console.log(user.nickname));
    }


    return (
        <div className='container'>
            <ChannelList
                sb={sb}
                userId={userId}
                channelList={channelList}
                setOpenChannel={setOpenChannel}
                setChannelHeaderName={setChannelHeaderName}
                setMessageList={setMessageList}
                setChannelList={setChannelList}
                retrieveChannelList={retrieveChannelList}
            />
            <div className="channel">
                <ChannelHeader
                    newOpenChannel={newOpenChannel}
                    channelHeaderName={channelHeaderName}
                    setOpenChannel={setOpenChannel}
                    setMessageList={setMessageList}
                    setChannelHeaderName={setChannelHeaderName}
                    retrieveChannelList={retrieveChannelList}
                />
                <div>
                    <MessageList 
                        sb={sb}
                        newOpenChannel={newOpenChannel}
                        messageList={messageList}
                        setMessageList={setMessageList}
                    />
                    <MessageInput 
                        sb={sb}
                        newOpenChannel={newOpenChannel}
                        messageList={messageList}
                        setMessageList={setMessageList}
                    />
                </div>
            </div>
        </div>
    );
}


