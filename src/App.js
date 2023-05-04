import './App.css';
import { useState } from 'react';
import Chat from './chat_page';
import Login from './login';

export default function App() {
  const [isLogined, setIsLogined] = useState(false)

  if (isLogined) {
    return <Chat />;
  } else {
    return <Login isLogined={isLogined} setIsLogined={setIsLogined}/>;
  }

}


