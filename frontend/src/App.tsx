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

  useEffect(()=>{
    ws.onmessage = (e) => {
      const parsedData: any = JSON.parse(e.data)
      setMessages([...messages, parsedData.message])
      setMessages([{id:1,message:"hello"}])
      console.log(messages)
    }
    fetchMessages()
    console.log("hello")
  }, [messages])

  return (
    <>
      <h1 align="center">Chat App</h1>
      <div className="chat">
        <div className="messages">
          {
            messages.map((messageItem)=>{
              <div className="message">
                <h3>{messageItem}</h3>
              </div>
            })
          }
        </div>
        <div className="send">
          {/* Todo: Add send message bar and send input message to backend webSocket - (ws.send) */}
        </div>
      </div>
    </>
  )
}

export default App
