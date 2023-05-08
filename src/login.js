import './login.css';
import SendbirdChat from '@sendbird/chat';
import { OpenChannelModule, SendbirdOpenChat } from '@sendbird/chat/openChannel';




export default function Login({isLogined, setIsLogined}) {

    function checkCredential() {
        const id_value = document.getElementById('id').value;
        const pw_value = document.getElementById('password').value;
        if (id_value === 'send' && pw_value === 'bird') {
            connectServer(id_value);
            setIsLogined(true);
        }
    }   

    const connectServer = async ({id_value}) => {
        const sb = SendbirdChat.init({
            appId: "AF724953-484C-4A31-A559-60D67D914C0A",
            modules: [
                new OpenChannelModule(),
            ],
          }
          );
          
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