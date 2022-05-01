import React from 'react'
import SendIcon from '@mui/icons-material/Send';

import "./Input.css"


function Input({message, setMessage,sendMessage}) {
    return (
        <form className="form">
            <input 
            className="input"
            type="text"
            placeholder="Type a message..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
            />
            <button className="sendButton" onClick={(e) => sendMessage(e)}><SendIcon fontSize='medium'/></button>
        </form>
    )
}


export default Input