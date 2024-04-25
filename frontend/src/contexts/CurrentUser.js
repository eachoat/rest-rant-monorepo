import React, { createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext();

function CurrentUserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                const response = await fetch('http://localhost:5000/authentication/profile');
                if (response.ok) {
                    const user = await response.json();
                    setCurrentUser(user);
                } else {
                    // Handle error response
                    console.error('Error fetching user data:', response.status, response.statusText);
                }
            } catch (error) {
                // Handle fetch error
                console.error('Fetch error:', error);
            }
        };

        getLoggedInUser();
    }, []);

    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export default CurrentUserProvider;