
import { useEffect, useRef, useState } from 'react'
import './App.css'



function App() {
  const [messages , setMessages] =useState(["hii"]);
  const wsRef = useRef();

useEffect(()=>{

  const ws = new  WebSocket("http://localhost:3000"); 
  ws.onmessage= (event)=>{
    setMessages(m => [...m , event.data]);

  }
    wsRef.current = ws;

    ws.onopen = ()=>{
      ws.send(JSON.stringify({
        type:"join",
        payload:{
        roomId: "red"
    }}))
    }

 return ()=>
 {
  ws.close()
 }

  

},[])
 

  return (
   <div className='h-screen bg-black text-white '>
    <br /><br />

      <div className='h-[85vh]  '>
        {messages.map(message => <span className='p-3 m-8 rounded  bg-red-400'> {message}</span>)}
      </div>

      <div className='w-full bg-white flex'>
        <input  id ="message" className='flex p-2 border-amber-300 border-2 text-black'  type="text" />
        <button  onClick={()=>{
          const message = document.getElementById("message")?.value;
          wsRef.current.send(JSON.stringify({
            type:"chat",
            payload:{
              message:message
            }
          }))
        }} className='bg-purple-400 text-white p-4'>send Message</button>
      </div>
    </div>
    
  )
}

export default App
