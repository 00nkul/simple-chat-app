import { doc, onSnapshot } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext';
import { db } from '../Firebase';

export default function Chats() {
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
                // console.log(Object.entries(doc.data()));
            });
            return () => {
                unsub();
            };
        };
        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleClick = (userInfo) => {
        dispatch({ type: "CHANGE_USER", payload: userInfo });
    };
    return (
        <div className='chats'>
            {
                chats  && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                    <div className="userChat" key={chat[0]} onClick={() => handleClick(chat[1].userInfo)}>
                        <img src={chat[1].userInfo.photoURL} alt="" />
                        <div className="userChatInfo">
                            <span>{chat[1].userInfo.displayName}</span>
                            <p>{chat[1].lastMessage?.text}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
