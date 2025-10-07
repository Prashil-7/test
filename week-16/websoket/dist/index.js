"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("hii");
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 3000 });
wss.on("connection", (socket) => {
    console.log("hii from WebSocketServer");
    setInterval(() => {
        socket.send("hi from sokets");
    }, 500);
    socket.on("message", (e) => {
        console.log("hii msg", e.toString());
    });
});
