
console.log("hii");
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port :3000});

wss.on("connection", (socket) => {
    console.log("hii from WebSocketServer");
   


   socket.on("message",(e)=>{
    if(e.toString() == 'ping'){
    socket.send("pomgs");
}
    console.log("hii msg",e.toString());
    
   })
});