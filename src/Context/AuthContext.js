import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        const fun = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(user);
        });
        return () => {
            fun();
        };
    }, []);
    return (
        < AuthContext.Provider value={{ currentUser }}>
            {children}
        </ AuthContext.Provider >
    );
};