import '../pages/ChatPage/ChatPage.css';

function MemberList({ newGroupChannel, mutedMembers, setMutedMembers, retrieveAllUsers }) {

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

    return (
        <div>
            <div className='members'>
                <h1>Members</h1>
                <button onClick={() => retrieveAllUsers()}>Invite</button>
                {membersList()}
            </div>
        </div>
    );
}

export default MemberList;