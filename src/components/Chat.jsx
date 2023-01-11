import React from 'react'
import Messages from './Messages'
import Input from './Input'
import Cam from './../images/cam.png'
import Add from './../images/add.png'
import More from './../images/more.png'
import { useContext } from 'react'
import { ChatContext } from '../Context/ChatContext'
export default function Chat() {

    const {data} = useContext(ChatContext);
    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}