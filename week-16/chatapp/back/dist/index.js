"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("hii");
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 3000 });
wss.on("connection", (socket) => {
    console.log("hii from WebSocketServer");
    socket.on("message", (e) => {
        if (e.toString() == 'ping') {
            socket.send("pomgs");
        }
        console.log("hii msg", e.toString());
    });
});
