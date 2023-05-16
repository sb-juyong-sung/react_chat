import '../pages/ChatPage/ChatPage.css';

function MemberList({ newGroupChannel, mutedMembers, setMutedMembers, retrieveAllUsers }) {

    function membersList() {
        if (newGroupChannel) {
            return <div className="members-list">
                {newGroupChannel.members.map((member) =>
                    <div className="member-item" key={member.userId}>
                        {member.nickname}
                    </div>
                )}
            </div>;
        } else {
            return null;
        }
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