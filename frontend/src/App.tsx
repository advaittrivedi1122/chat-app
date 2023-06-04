// import.meta.env.VITE_CHAT_URL
import { useState, useEffect } from 'react'
import './App.css'
import useWebSocket from 'react-use-websocket'
import {Chat} from "./Chat"

function App() {
  const [id, setID] = useState("64720b35092c7cb0957ff1d9")
  const [chatUserId, setChatUserId] = useState("64720b35092c7cb0957ff1d9")
  const [message, setMessage] =useState("")
  const [messages, setMessages]: any = useState([])
  const url: any = import.meta.env.VITE_CHAT_URL
  const { sendMessage: sendNewMessage } = useWebSocket(url, {
    // share: true,
    onOpen: (e)=> {
      console.log(`Client connected`,e)
    },
    onMessage: (e)=> {
      let parsedData = JSON.parse(e.data)
      setMessages(parsedData)
      console.log(`parsed`,parsedData)
    }
  })

  const getChats = async ()=>{
    console.log(message)
  }

  const sendMessage = async ()=>{
    console.log(message)
    const data = {
      "method": "send-message",
      "params": {
        "from": id, 
        "to": chatUserId,
        "message": message
      }
    }
    console.log(messages)
    sendNewMessage(JSON.stringify(data))
    // setMessages([...messages, message])
    console.log(messages)
    setMessage("")
    return
  } 

  useEffect(()=>{
    console.log("re-rendered")
    // setMessages([...messages, message])
  },[message])

  return (
    <>
      <h1 style={{textAlign:"center"}}>Chat App</h1>
      <Chat sendMessage={sendMessage} setMessage={setMessage} setMessages={setMessages} messages={messages} userId={id}/>
    </>
  )
}

export default App
