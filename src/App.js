import './App.css';
import { useState } from 'react';
import Chat from './chat_page';
import Login from './login';
import SendbirdChat from '@sendbird/chat';
import { GroupChannelModule } from '@sendbird/chat/groupChannel';


export default function App() {
  const [isLogined, setIsLogined] = useState(false)
  const sb = SendbirdChat.init({
    appId: "AF724953-484C-4A31-A559-60D67D914C0A",
    modules: [
        new GroupChannelModule(),
    ],
  }
  );


  if (isLogined) {
    return <Chat sb = {sb}/>;
  } else {
    return <Login sb = {sb} isLogined={isLogined} setIsLogined={setIsLogined}/>;
  }

}


