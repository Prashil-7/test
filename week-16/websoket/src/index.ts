console.log("hii");
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port :3000});

wss.on("connection", (socket) => {
    console.log("hii from WebSocketServer");
   
   setInterval(()=>{
     socket.send("hi from sokets");
   },500)

   socket.on("message",(e)=>{
    console.log("hii msg",e.toString());
    
   })
});
 
