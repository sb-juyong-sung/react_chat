import '../pages/ChatPage/ChatPage.css';
import { useEffect } from 'react';

function MemberList({ newGroupChannel, bannedMembers, setBannedMembers, retrieveAllUsers }) {

    function membersList() {
        if (newGroupChannel) {
            return <div className="members-list">
                {newGroupChannel.members.map((member) =>
                    <div className="member-item" key={member.userId}>
                        {member.nickname}
                        <button onClick={() => banUser(member)}>ban</button>
                    </div>
                )}
            </div>;
        } else {
            return null;
        }
    }

    async function bannedMembersList() {
        const query = newGroupChannel.createBannedUserListQuery();
        const bannedUsers = await query.next();
        console.log(bannedUsers);
        setBannedMembers(bannedUsers);
        return null;
    }

    async function banUser(member) {
        await newGroupChannel.banUser(member, 1000, 'yes');
        bannedMembersList();
    }

    async function unbanUser(member) {
        await newGroupChannel.unbanUser(member);
        bannedMembersList();
    }

    

    useEffect(() => {
        bannedMembersList();
    }, []);

    return (
        <div>
            <div className='members'>
                <h1>Members</h1>
                <button onClick={() => retrieveAllUsers()}>Invite</button>
                {membersList()}
            </div>
            <div className='members'>
                <h1>Banned Members</h1>
                <button onClick={() => bannedMembersList()}>Get</button>
                <div className="members-list">
                    {bannedMembers.map((member) => (
                        <div className="member-item" key={member.userId}>
                            {member.nickname}
                            <button onClick={() => unbanUser(member)}>unban</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MemberList;