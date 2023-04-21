export default function Login({isLogined, setIsLogined}) {

    function credential() {
        const id_value = document.getElementById('id').value;
        const pw_value = document.getElementById('password').value;
        if (id_value === 'send' && pw_value === 'bird') {
            setIsLogined(true);
        }
    }   

    return (
        <>
            <div>
                Sendbird
            </div>
            <div>
                ID : <input id = 'id' type="text"></input>
            </div>
            <div>
                PW : <input id = 'password' type="text"></input>
            </div>
            <div>
                <button onClick={() => credential()}>login</button>
            </div>
        </>
    );
}