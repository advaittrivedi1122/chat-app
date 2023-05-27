require("dotenv").config();
import express from "express";
import appRouter from "./routes/app.routes";
import {WebSocketServer} from "ws";
import http from "http";
import "./database/db";

const app: any = express();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 8000;
const server = http.createServer(app);
const wss = new WebSocketServer({server : server});
let wsConnection;
let messages: any = [];

app.use(express.json()); // json body parser
app.use(appRouter);  // using routes from custom file

wss.on("connection",(ws)=>{
  wsConnection = ws;
  ws.on("open",(data:any)=>{
    console.log("New Connection established")
  })
  ws.on("message",(data)=>{
    let req = data.toString();
    let message = JSON.parse(req).message;
    let id = JSON.parse(req).id;
    if (message) {
      console.log(message);
      messages.push({id, message});
    }
    ws.send(JSON.stringify(messages));
  })
  ws.on("close",(data)=>{
    // console.log("Connection closed...!!")
  })
})

server.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});

export = wsConnection;