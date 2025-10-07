
import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {
  const [ socket , setSocket] = useState();
  const inputRef = useRef();

  const onsubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    // handle button click here
    if(!socket){return;}

    const msg = inputRef.current.value;

    //@ts-ignore
    socket.send(msg);
    //socket.send(msg);
  };
  
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    setSocket(ws)

    ws.onmessage=(ev)=>{
      alert(ev.data);
    }

  }, []);
  

  return (
  <div>
      <div>
         <input  
         ref={inputRef}
           type="text" placeholder='inputMessagge' />
         <button onClick={onsubmit}>send </button>
      </div>
  </div>
  )
}

export default App
