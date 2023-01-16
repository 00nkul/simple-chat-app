import React from 'react'
import Messages from './Messages'
import Input from './Input'
import Cam from './../images/cam.png'
import Add from './../images/add.png'
import More from './../images/more.png'
import { useContext } from 'react'
import { ChatContext } from '../Context/ChatContext'
import { useState } from 'react'
import ImageModal from './ImageModal'
export default function Chat() {

    const { data } = useContext(ChatContext);
    const [show, setShow] = useState(false);
    return (
        <div className='chat'>
            <div className="chatInfo">
                <div className="profile">
                    <img src={data.user?.photoURL} alt="profile"  onClick={() => setShow(true)} />
                    <span>{data.user?.displayName}</span>
                </div>
                <div className="chatIcons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Messages />
            <Input />
            <ImageModal show={show} setShow={setShow} img={data.user?.photoURL} />
        </div>
    )
}