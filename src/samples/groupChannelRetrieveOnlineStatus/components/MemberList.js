import '../pages/ChatPage/ChatPage.css';
import {useState, useEffect} from 'react';

function MemberList({ sb, newGroupChannel, mutedMembers, newMembersList, setMutedMembers, setNewMembersList, retrieveAllUsers }) {

    const [showMembersList, setShowMembersList] = useState(true);

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

    async function refreshChannel(channel) {
        // await channel.refresh();
        
        setNewMembersList(channel.members);
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