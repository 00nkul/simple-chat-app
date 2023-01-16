import React from 'react'
import Add from './../images/addAvatar.png'
import { auth, storage, db } from '../Firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate , Link } from 'react-router-dom';



export const Register = () => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            if(!file){
                setError(true);
                setErrorMessage('Avatar is recquired !');
                return;
            }
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                (error) => {
                    setError(true);
                    console.log(error);
                },
                () => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        })

                        await setDoc(doc(db ,"users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        });
                        await setDoc(doc (db , "userChats" , res.user.uid) , {});
                        navigate('/');
                    })
                    .catch((err) => {
                        console.log(err , "is this error !");
                    });
                }
            );
        } catch (error) {
            console.log(error , "final ");
            setError(true);
        }
    }

    return (
        <div className='fromContainer'>
            <div className='formWrapper'>
                <span className='logo'>Chat App</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="display name" />
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <input style={{ display: "none" }} type="file" id='file' />
                    <label htmlFor='file'>
                        <img src={Add} alt='' />
                        <span>Add an Avatar</span>
                    </label>
                    <button>Sign up</button>
                    {error && <span className='errorMessage'>{errorMessage}</span>}
                </form>
                <p>You do have an account? <Link to='/login'>Login</Link></p>
            </div>
        </div>
    )
}