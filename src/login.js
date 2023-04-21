import './login.css';
import Symbol from './Sendbird_Symbol_RGB.png';

export default function Login({isLogined, setIsLogined}) {

    function checkCredential() {
        const id_value = document.getElementById('id').value;
        const pw_value = document.getElementById('password').value;
        if (id_value === 'send' && pw_value === 'bird') {
            setIsLogined(true);
        }
    }   



    function clickEnter(e) {
        if (e.key === 'Enter') {
            checkCredential();
        }
    }
     
    // document.getElementById("submit").onclick = function() {
    //     alert('Clicked!');
    // }

    return (
        <>  
            <img src={Symbol}
            width={300}
            height={300}
            alt = 'Sendbird Symbol'></img>
   
            <div className="logo">
                Sendbird
            </div>
            <div className='align'>
                ID : <input id = 'id' type="text"></input>
            </div>
            <div className='align'>
                PW : <input id = 'password' type="text"></input>
            </div>
            <div className='align'>
                <input value='hi' type="name" onKeyPress={clickEnter} />
                <button onClick={() => checkCredential()}>login</button>
            </div>
        </>
    );
}