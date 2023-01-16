import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';

export const Login = () => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('something went wrong !')
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                // console.log(userCredentials.user);
                navigate("/")
            })
            .catch((err) => {
                setError(true);
                // console.log(err);
                setErrorMessage(err.code);
            })
    }
    return (
        <div className='fromContainer'>
            <div className='formWrapper'>
                <span className='logo'>Chat App</span>
                <span className='title'>Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <button>Login</button>
                    {error && <span className='errorMessage'>{errorMessage} </span>}
                </form>
                <p>You don't have an account? <Link to='/register'>Register</Link></p>
            </div>
        </div>
    )
}