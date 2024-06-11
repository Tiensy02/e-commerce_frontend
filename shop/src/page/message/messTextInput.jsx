import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

import './index.css'

export const MessTextInput = ({ chatId, userCurrentId, recipientId, sendMess, setMessages }) => {

    const [input, setInput] = useState("");

    const handleSendMess = (e) => {
        e.preventDefault()
        if (input.trim() != "") {
            const chatMess = {
                chatId: chatId,
                senderId: userCurrentId,
                recipientId: recipientId,
                content: input
            }

            sendMess(chatMess);
            setMessages(messages => [...messages, chatMess]);
        }
        setInput("");
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSendMess(e);
        }
    }

    return (
        <>
            <div className='wrap_form' noValidate autoComplete="off" onKeyDown={handleEnter}>
                <input
                    autoComplete="off"
                    id="standard-text"
                    className="wrap_text"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                />
                <Button onClick={handleSendMess} variant="contained" color="primary">
                    <SendIcon />
                </Button>
            </div>
        </>
    )
}



