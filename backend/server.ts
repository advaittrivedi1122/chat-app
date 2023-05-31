require("dotenv").config();
import express from "express";
import appRouter from "./routes/app.routes";
import {WebSocketServer} from "ws";
import http from "http";
import "./database/db";
import { handleMessage } from "./webSocket/ws";

const app: any = express();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 8000;
const server = http.createServer(app);
const wss = new WebSocketServer({server : server});
let wsConnection;
let clients: any = [];

app.use(express.json()); // json body parser
app.use(appRouter);  // using routes from custom file

wss.on("connection",(ws)=>{
  wsConnection = ws;
  clients.push(wsConnection)
  ws.on("open",(data:any)=>{
    console.log("New Connection established")
  })
  ws.on("message",async(data)=>{
    console.log("🚀 ~ file: server.ts:27 ~ clients:", clients.length)
    let req = data.toString();
    let res:any = await handleMessage(JSON.parse(req))
    console.log("🚀 ~ file: server.ts:28 ~ ws.on ~ res:", res)
    clients.forEach((client:any) => {
      client.send(res)
    });
    // ws.send(res)
  })
  ws.on("close",(data)=>{
    // console.log("Connection closed...!!")
  })
})

server.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});

export = wsConnection;