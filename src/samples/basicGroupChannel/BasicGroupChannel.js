import { useState } from 'react';
import ChatPage from './pages/ChatPage/ChatPage';
import Login from './pages/Login/Login';
import SendbirdChat from '@sendbird/chat';
import { GroupChannelModule } from '@sendbird/chat/groupChannel';


export default function App() {
  const [isLogined, setIsLogined] = useState(false)
  const [userId, setUserId] = useState(null)
  const sb = SendbirdChat.init({
    appId: "AF724953-484C-4A31-A559-60D67D914C0A",
    modules: [
        new GroupChannelModule(),
    ],
  }
  );


  if (isLogined) {
    return <ChatPage sb = {sb} userId = {userId}/>;
  } else {
    return <Login sb = {sb} userId = {userId} setUserId = {setUserId} isLogined={isLogined} setIsLogined={setIsLogined}/>;
  }

}