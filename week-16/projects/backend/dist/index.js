"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 3000 });
let allsokets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        //@ts-ignorets
        const paersedMessage = JSON.parse(message);
        if (paersedMessage.type == "join") {
            allsokets.push({
                socket,
                room: paersedMessage.payload.roomId
            });
        }
        if (paersedMessage.type == "chat") {
            //const currentUserRoom = allsokets.find((x)=> x.socket == socket).room;
            let currentUserRoom = null;
            for (let i = 0; i < allsokets.length; i++) {
                if (allsokets[i].socket == socket) {
                    currentUserRoom = allsokets[i].room;
                }
            }
            for (let i = 0; i < allsokets.length; i++) {
                if (allsokets[i].room == currentUserRoom) {
                    allsokets[i].socket.send(paersedMessage.payload.message);
                }
            }
        }
    });
});
//ex
// for( let i=0; i< allsokets.length; i++){
//     const s = allsokets[i];
//     setTimeout(()=>{
//     s.send(message.toString() + " send from server")
// },2000)
// }
// allsokets.forEach((s)=>{
//       s.send(message.toString() + " send from server")
// })
