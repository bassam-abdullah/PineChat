import React, { useEffect, useState } from "react";
import queryString from "query-string"
import io from "socket.io-client"

import "./Chat.css"
import InfoBar from "../InfoBar/InfoBar"
import Input from "../Input/Input"
import Messages from "../Messages/Messages"

require('dotenv').config()

const ENDPOINT = "https://pine-chat-server.herokuapp.com/"
let socket

function Chat( {location} ) {

    console.log(process.env.REACT_APP_API_KEY);
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messagesArray, setMessagesArray] = useState([])

    useEffect(() => {
        const {name, room} = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)
        
        socket.emit('join', { name, room }, (error) => {
            if(error) {
              do {
                alert(error + ", Please go back and choose a unique name.");
              } while(error) 
            }
          });

          return () => {
            socket.disconnect()
            socket.off()
          }

    }, [location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessagesArray([...messagesArray, message])
        }, [messagesArray])
    })

    const sendMessage = (event) => {
        event.preventDefault()
    
        if (message) {
          socket.emit('sendMessage', message, () =>
            setMessage('')
          )
        }
        setMessage('')
      }


    return (
        <div className="outerContainer">
            <div className="container">
            <InfoBar room={room}/>
            <Messages messages={messagesArray} name={name}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    )
}

export default Chat