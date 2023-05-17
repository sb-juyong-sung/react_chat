import '../pages/ChatPage/ChatPage.css';

function MemberList({ newGroupChannel, operatorMembers, setOperatorMembers, retrieveAllUsers }) {

    function membersList() {
        if (newGroupChannel) {
            return <div className="members-list">
                {newGroupChannel.members.map((member) =>
                    <div className="member-item" key={member.userId}>
                        {member.nickname}
                        <button onClick={() => registerOperator(member)}>register</button>
                        <button onClick={() => removeOperator(member)}>remove</button>
                    </div>
                )}
            </div>;
        } else {
            return null;
        }
    }

    async function registerOperator(member) {
        await newGroupChannel.addOperators([member.userId]);
    }

    async function removeOperator(member) {
        await newGroupChannel.removeOperators([member.userId]);
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