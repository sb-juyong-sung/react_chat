import './login.css';

import { GroupChannelModule } from '@sendbird/chat/groupChannel';





export default function Login({ sb, userId, setUserId, isLogined, setIsLogined }) {
    function checkCredential() {
        const id_value = document.getElementById('id').value;
        const ni_value = document.getElementById('nickname').value;
        setUserId(id_value);
        connectServer(id_value, ni_value);
        setIsLogined(true);
    }

    const connectServer = async (id_value, ni_value) => {
        await sb.connect(id_value);
        await sb.setChannelInvitationPreference(true);
        const UserUpdateParams = {};
        UserUpdateParams.nickname = ni_value;
        await sb.updateCurrentUserInfo(UserUpdateParams);
    }



    function clickEnter(e) {
        if (e.key === 'Enter') {
            checkCredential();
        }
    }


    return (
        <>
            <img src="/Sendbird_Symbol_RGB.png"
                width={300}
                height={300}
                alt='Sendbird Symbol'></img>

            <div className="logo">
                Sendbird
            </div>
            <div className='align'>
                ID : <input id='id' type="text" onKeyPress={clickEnter}></input>
            </div>
            <div className='align'>
                NICKNAME : <input id='nickname' type="text" onKeyPress={clickEnter}></input>
            </div>
            <div className='align'>
                <button onClick={() => checkCredential()}>login</button>
            </div>
        </>
    );
}