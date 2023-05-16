import '../pages/ChatPage/ChatPage.css';

function MemberList({ newGroupChannel, operatorMembers, setOperatorMembers, retrieveAllUsers }) {

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

    async function operatorsList() {
        const query = newGroupChannel.createOperatorListQuery();
        const operators = await query.next();
        console.log(operators);
        setOperatorMembers(operators);
    }

    return (
        <div>
            <div className='members'>
                <h1>Members</h1>
                <button onClick={() => retrieveAllUsers()}>Invite</button>
                {membersList()}
            </div>
            <div className='members'>
                <h1>Operators</h1>
                <button onClick={() => operatorsList()}>Get</button>
                <div className="members-list">
                    {operatorMembers.map((member) => (
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