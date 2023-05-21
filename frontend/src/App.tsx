// import.meta.env.VITE_CHAT_URL
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [id, setID] = useState(0)
  const [message, setMessage] =useState("")
  const [messages, setMessages]: any = useState([])
  const url: any = import.meta.env.VITE_CHAT_URL
  const ws = new WebSocket(url)

  const fetchMessages = async ()=>{
    const data = await fetch(url)
    const parsedData = await data.json()
    setMessages(parsedData)
    return
  }

  const sendMessage = async ()=>{
    console.log(message)
    const data = {id, message}
    console.log(messages)
    ws.send(JSON.stringify(data))
    setMessages([...messages, message])
    console.log(messages)
    return
  } 
  useEffect(()=>{
    ws.onmessage = (e) => {
      const parsedData: any = JSON.parse(e.data)
      setMessages([...messages, parsedData?.message])
      console.log(parsedData)
    }
    fetchMessages()
  }, [messages])

  return (
    <>
      <h1 align="center">Chat App</h1>
      <div className="chat">
        <div className="messages">
          {
            messages.map((messageItem:any)=>{
              <div className="message">
                <h3>{messageItem}</h3>
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
