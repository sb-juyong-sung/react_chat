import '../pages/ChatPage/ChatPage.css';
import {useState, useEffect} from 'react';

function MemberList({ sb, newGroupChannel, mutedMembers, newMembersList, setMutedMembers, setNewMembersList, retrieveAllUsers }) {

    const [showMembersList, setShowMembersList] = useState(true);
    // const [currentChannel, handleChannel] = useState(null);

    function membersList() {
        if (newGroupChannel) {
            return <div className="members-list">
                {newMembersList.map((member) =>
                    <div className="member-item" key={member.userId}>
                        {member.nickname}
                        <span>{member.connectionStatus}</span>
                    </div>
                )}
            </div>;
        } else {
            return null;
        }
    }

    // const handleChannelUpdate = async (channel) => {
    //     try {
    //         return await channel.refresh();
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(async () => {
    //     if (newGroupChannel) {
    //         await handleChannelUpdate(newGroupChannel);
    //         handleChannel(newGroupChannel)
    //     }
    // }, [newGroupChannel]);

    async function refreshChannel(channel) {
        await newGroupChannel.refresh();
        const queryParams = {userIdsFilter : []}
        for (let i = 0; i < channel.members.length; i++) {
            queryParams.userIdsFilter = [...queryParams.userIdsFilter, channel.members[i].nickname]
        }
        
        
        const query = sb.createApplicationUserListQuery(queryParams);

        const statusList = await query.next();
    
        setNewMembersList(statusList);
        setShowMembersList(true);
        return channel;
    }

    

    function getStatus(channel) {
        const c = refreshChannel(channel);
    }

    return (
        <div>
            <div className='members'>
                <h1>Members</h1>
                <button onClick={() => retrieveAllUsers()}>Invite</button>
                <div>
                <button onClick={() => getStatus(newGroupChannel)}>Refresh</button>
                </div>
                {membersList()}
            </div>
        </div>
    );
}

export default MemberList;