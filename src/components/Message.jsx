import moment from 'moment/moment';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext';
import ImageModal from './ImageModal';

export default function Message({ message, showDate }) {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const [messageTime, setMessageTime] = useState('');
    const [showImageModal, setShowImageModal] = useState(false);

    const ref = useRef();
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])

    useEffect(() => {
        const date = moment.unix(message.date.seconds);
        setMessageTime(date.format("h:mm a"));
    }, []);
    return (
        <>
            {showDate && <p className='message-day'>{moment.unix(message.date.seconds).format("MMM D")}</p>}
            <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
                <div className="messageInfo">
                    <img src={
                        message.senderId === currentUser.uid ?
                            currentUser.photoURL
                            : data.user.photoURL
                    } alt="" />
                    <span> {messageTime}</span>
                </div>
                <div className="messageContent">
                    <p>{message.text}</p>
                    {
                        message.img &&
                        <img
                            src={message.img}
                            alt=""
                            onClick={() => setShowImageModal(true)}
                        />
                    }
                </div>
            </div>
            <ImageModal show={showImageModal} setShow={setShowImageModal} img={message.img} />
        </>
    )
}
