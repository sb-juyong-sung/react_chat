import '../pages/ChatPage/ChatPage.css';
import { useState } from 'react';

function UserProfile({ sb, profileUpdateState, setProfileUpdateState }) {
    
    const [file, setFile] = useState(null);

    function handleUpdateProfile() {
        setProfileUpdateState(false);
        console.log(profileUpdateState);
    }

    async function handleUpdateUser(nick, file) {
        const params = { 
            nickname: nick,
            profileImage: file,
         };
        const user = await sb.updateCurrentUserInfo(params);
    };

    async function handleUploadProfile(e) {
        setFile(e.currentTarget.files[0]);
    }


    if (profileUpdateState) {
        return (
            <div className='overlay'>
                <div className='overlay-content'>
                    <h2>Profile</h2>
                    <div>
                        Img:
                        <input
                            type='file'
                            onChange={handleUploadProfile}>
                        </input>
                    </div>
                    <div>
                        Nickname:
                        <input id='changeNickname' type="text"></input>
                    </div>
                    <button onClick={() => handleUpdateUser(document.getElementById('changeNickname').value, file)}>Update</button>
                    <button onClick={handleUpdateProfile}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default UserProfile;