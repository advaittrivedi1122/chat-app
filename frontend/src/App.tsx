// import.meta.env.VITE_CHAT_URL
import { useState, useEffect } from 'react'
import './App.css'
import useWebSocket from 'react-use-websocket'

function App() {
  const [id, setID] = useState(0)
  const [message, setMessage] =useState("")
  const [messages, setMessages]: any = useState([])
  const url: any = import.meta.env.VITE_CHAT_URL
  // const ws = new WebSocket(url)
  const { sendMessage: sendNewMessage } = useWebSocket(url, {
    // share: true,
    onMessage: (e)=> {
      const parsedData: any = JSON.parse(e.data)
      setMessages(parsedData)
      console.log(`parsed`,parsedData)
    }
  })

  const sendMessage = async ()=>{
    console.log(message)
    const data = {id, message}
    console.log(messages)
    sendNewMessage(JSON.stringify(data))
    setMessages([...messages, message])
    console.log(messages)
    return
  } 

  useEffect(()=>{
    console.log("re-rendered")
    setMessages([...messages, message])
  },[message])

  return (
    <>
      <h1 align="center">Chat App</h1>
      <div className="chat">
        <div className="messages">
          {
            messages.map((messageItem:any)=>{
              return <div className="message">
                <h3>{messageItem.message}</h3>
              </div>
            })
          }
        </div>
        <div className="send">
          {/* Todo: Add send message bar and send input message to backend webSocket - (ws.send) */}
          <input type="text" onChange={(e)=>setMessage(e.target.value)}/>
          <button type="submit" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  )
}

export default App
