import React from "react"
import ReactEmoji from 'react-emoji'

import "./Message.css"

function Message({ message: { user, text }, name }) {
    
    let isCurrentUser = false

    const trimmedName = name.trim().toLowerCase()

    if(user === trimmedName) {
        isCurrentUser = true
    }
    return (
        isCurrentUser ? (
            <div className="messageContainer justifyEnd">
                <div className="messageBox sent">
                    <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        : (
            <>
                <div>
                    <p className="sentText margins">{user}</p>
                </div>
                <div className="messageContainer justifyStart">
                        <div className="messageBox received">
                            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                        </div>
                    </div>
            </>
        )
    )
}

export default Message