import React, { createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext();


    function CurrentUserProvider({ children }) {
    
        const [currentUser, setCurrentUser] = useState(null)
        useEffect(() => {
    
            const getLoggedInUser = async () => {
                let response = await fetch('http://localhost:5000/authentication/profile', {
                credentials: 'include'
            })
                let user = await response.json()
                setCurrentUser(user)
            }
            getLoggedInUser()
        }, [])
      
    

    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export default CurrentUserProvider;