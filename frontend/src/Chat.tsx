// import {useState, useEffect} from 'react'

export const Chat = (props: any) => {

    return (
        <div className="chat">
            <div className="messages">
                {
                    props.messages.map((messageItem: any) => {
                        return <div className="message">
                            <h3>{messageItem.message}</h3>
                        </div>
                    })
                }
            </div>
            <div className="send">
                {/* Todo: Add send message bar and send input message to backend webSocket - (ws.send) */}
                <input type="text" onChange={(e) => props.setMessage(e.target.value)} />
                <button type="submit" onClick={props.sendMessage}>Send</button>
                <button type="reset" onClick={() => { props.setMessages([]) }}>Reset</button>
            </div>
        </div>
    )
}
