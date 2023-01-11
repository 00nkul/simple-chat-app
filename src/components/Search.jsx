import React from 'react'
import { useState } from 'react';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../Firebase';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

export default function Search() {
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState("");
    const [error, setError] = useState(false);
    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", userName));
        try {
            const querySnap = await getDocs(q);
            querySnap.forEach((doc) => {
                setUser(doc.data());
            })
        } catch (error) {
            console.log(error, "search error");
            setError(true);
        }
    }
    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async () => {
        // const combinedId = currentUser.uid+ user.uid;
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            if (!res.exists()) {
                //chats 
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                //userchats

                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
            }
        } catch (error) {
            console.log(error);
        }
        setUser(null);
        setUserName("");
    }
    return (
        <div className='search'>
            <div className="searchForm">
                <input type="text" placeholder='find a user' onKeyDown={handleKey} value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            {
                error && <span>User not found</span>
            }
            {user &&
                <div className="userChat" onClick={handleSelect}>
                    <img src={user.photoURL} alt=""/>
                    <div className="userChatInfo">
                        <span>{user.displayName}</span>
                    </div>
                </div>
            }
        </div>
    )
}
