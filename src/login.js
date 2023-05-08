import './login.css';

import { GroupChannelModule } from '@sendbird/chat/groupChannel';




export default function Login({sb, isLogined, setIsLogined}) {
    function checkCredential() {
        const id_value = document.getElementById('id').value;
        const pw_value = document.getElementById('password').value;
        if (pw_value === 'bird') {
            connectServer(id_value);
            setIsLogined(true);

        }
    }   

    const connectServer = async (id_value) => {
          const user = await sb.connect(id_value);
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
            alt = 'Sendbird Symbol'></img>
   
            <div className="logo">
                Sendbird
            </div>
            <div className='align'>
                ID : <input id = 'id' type="text" onKeyPress={clickEnter}></input>
            </div>
            <div className='align'>
                PW : <input id = 'password' type="text" onKeyPress={clickEnter}></input>
            </div>
            <div className='align'>
                <button onClick={() => checkCredential()}>login</button>
            </div>
        </>
    );
}