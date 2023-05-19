import '../pages/ChatPage/ChatPage.css';

function UserProfile({ sb, profileUpdateState, setProfileUpdateState }) {

    function handleUpdateProfile() {
        setProfileUpdateState(false);
        console.log(profileUpdateState);
    }

    async function handleUpdateNickname(nick) {
        const params = {nickname: nick,}
        const user = await sb.updateCurrentUserInfo(params);
    };


    if (profileUpdateState) {
        return (
            <div className='overlay'>
                <div className='overlay-content'>
                    <h2>Profile</h2>
                    <div>
                        Nickname:
                        <input id='changeNickname' type="text"></input>
                    </div>
                    <button onClick={() => handleUpdateNickname(document.getElementById('changeNickname').value)}>Update</button>
                    <button onClick={handleUpdateProfile}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default UserProfile;