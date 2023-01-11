import { doc, onSnapshot } from 'firebase/firestore';
import moment from 'moment/moment';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { ChatContext } from '../Context/ChatContext';
import { db } from '../Firebase';
import Message from './Message'
export default function Messages() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);
    const [prevDate, setPrevDate] = useState('');

    const handleSetPrevDate = (val) => {
        console.log(val, " val");
        setPrevDate(val);
        console.log(prevDate, "prevDate ignore");
    }
    useEffect(() => {
        const fun = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
            // doc.exists() && console.log(doc.data().messages);
        })
        return () => {
            fun();
        }
    }, [data.chatId]);

    return (
        <div className='messages'>
            {
                messages.map((message, id) => {
                    const showDate = ( id === 0 ||   moment.unix(messages[id - 1].date.seconds).format("MMM D") != moment.unix(message.date.seconds).format("MMM D"))
                    return (
                        <Message message={message} key={id} showDate={showDate} />
                    )
                })
            }
        </div>
    )
}