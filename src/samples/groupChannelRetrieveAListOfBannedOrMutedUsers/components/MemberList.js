import '../pages/ChatPage/ChatPage.css';
import { useEffect } from 'react';

function MemberList({ newGroupChannel, mutedMembers, bannedMembers, setMutedMembers, setBannedMembers, retrieveAllUsers }) {

    function membersList() {
        if (newGroupChannel) {
            return <div className="members-list">
                {newGroupChannel.members.map((member) =>
                    <div className="member-item" key={member.userId}>
                        {member.nickname}
                        <button onClick={() => muteUser(member)}>mute</button>
                        <button onClick={() => unmuteUser(member)}>unmute</button>
                    </div>
                )}
            </div>;
        } else {
            return null;
        }
    }

    async function mutedMembersList() {
        const query = newGroupChannel.createMutedUserListQuery();
        const mutedUsers = await query.next();
        setMutedMembers(mutedUsers);
    }

    async function muteUser(member) {
        await newGroupChannel.muteUser(member, 1000, 'yes');
        mutedMembersList();
    }

    async function unmuteUser(member) {
        await newGroupChannel.unmuteUser(member);
        mutedMembersList();
    }

    async function bannedMembersList() {
        const query = newGroupChannel.createBannedUserListQuery();
        const bannedUsers = await query.next();
        console.log(bannedUsers);
        setBannedMembers(bannedUsers);
        return null;
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
                <h1>Muted Members</h1>
                <button onClick={() => mutedMembersList()}>Get</button>
                <div className="members-list">
                    {mutedMembers.map((member) => (
                        <div className="member-item" key={member.userId}>
                            {member.nickname}
                        </div>
                    ))}
                </div>
            </div>
            <div className='members'>
                <h1>Banned Members</h1>
                <button onClick={() => bannedMembersList()}>Get</button>
                <div className="members-list">
                    {bannedMembers.map((member) => (
                        <div className="member-item" key={member.userId}>
                            {member.nickname}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MemberList;