import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase'
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';

export default function Navbar() {
    const {currentUser} = useContext(AuthContext)
    const fun = () => {
        signOut(auth);
    }
    return (
        <div className='navbar'>
            <span className='logo'> Chat App</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={fun}>logout</button>
            </div>
        </div>
    )
}
