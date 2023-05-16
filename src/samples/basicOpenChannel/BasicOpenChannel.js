import { useState } from 'react';
import ChatPage from './pages/ChatPage/ChatPage';
import Login from './pages/Login/Login';

export default function App({sb}) {
  const [isLogined, setIsLogined] = useState(false)
  const [userId, setUserId] = useState(null)

  if (isLogined) {
    return <ChatPage sb = {sb} userId = {userId}/>;
  } else {
    return <Login sb = {sb} userId = {userId} setUserId = {setUserId} isLogined={isLogined} setIsLogined={setIsLogined}/>;
  }
}