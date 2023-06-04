import {useEffect, useState} from 'react'
import "./Chat.css"

export const Chat = (props: any) => {
    const [text, setText] = useState("")
    const [textAreaHeight, setTextAreaHeight] : [any,Function] = useState(25)
    const [rows, setRows] = useState(1)

    const handleTextArea = (event:any)=>{
        setText(event.target.value)
        adjustTextAreaHeight(event.target)
        
    }

    const adjustTextAreaHeight = (textArea:any)=>{
        let str = textArea.value.split("\n")
        setRows(str.length - 1)
        // let height = textArea.scrollHeight
        // setTextAreaHeight(height)
    }

    useEffect(()=>{
        props.setMessage(text)
        if(!text) {
            setTextAreaHeight(25)
        }
        console.log("🚀 ~ file: Chat.tsx:24 ~ useEffect ~ text:", JSON.stringify(text))
        console.log("🚀 ~ file: Chat.tsx:29 ~ Chat ~ rows:", rows)
    }, [text, rows])

    return (
        <div className="chat">
            <div className="messages">
                {
                    props.messages.map((message: any) => {
                        return <div className="message">
                            {
                                message.userId === props.userId 
                                ? <h3 style={{textAlign:"end"}}>{message.message}</h3>
                                : <h3 style={{textAlign:"start"}}>{message.message}</h3>
                            }
                        </div>
                    })
                }
            </div>
            <div className="send">
                {/* Todo: Add send message bar and send input message to backend webSocket - (ws.send) */}
                {/* <input type="text" className="messageInput" onChange={(e) => props.setMessage(e.target.value)} /> */}
                <textarea value={text} className='messageInput' rows={rows} onChange={handleTextArea} style={{height: textAreaHeight}}/>
                <button type="submit" onClick={props.sendMessage}>Send</button>
                <button type="reset" onClick={() => { props.setMessages([]) }}>Reset</button>
            </div>
        </div>
    )
}
