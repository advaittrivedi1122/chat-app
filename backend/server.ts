require("dotenv").config();
import express from "express";
import * as appController from "./controller/appController";
import bodyParser from "body-parser";
import {WebSocketServer} from "ws";
import http from "http";

const app: any = express();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;
const jsonParser = bodyParser.json();
const server = http.createServer(app)

const wss = new WebSocketServer({server : server})

let messages: any = []

wss.on("connection",(ws)=>{
  ws.send("Connected...!!")
  ws.on("message",(data)=>{
    let message = data.toString()
    message = JSON.parse(message).message
    message = message !== "" ? message : "No message"
    messages.push(message)
    ws.send(JSON.stringify(messages))
  })
})

app.post("/", jsonParser, appController.sendMessage);

server.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});
