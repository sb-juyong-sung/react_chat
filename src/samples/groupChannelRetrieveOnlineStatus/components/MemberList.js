import '../pages/ChatPage/ChatPage.css';
import {useState, useEffect} from 'react';

function MemberList({ newGroupChannel, mutedMembers, setMutedMembers, retrieveAllUsers }) {

    const [newMembersList, setNewMembersList] = useState([]);
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

    async function refreshChannel() {
        await newGroupChannel.refresh();
        setNewMembersList(newGroupChannel.members);
        setShowMembersList(true);
    }

    return (
        <div>
            <div className='members'>
                <h1>Members</h1>
                <button onClick={() => retrieveAllUsers()}>Invite</button>
                <div>
                <button onClick={() => refreshChannel()}>Refresh</button>
                </div>
                {membersList()}
            </div>
        </div>
    );
}

export default MemberList;