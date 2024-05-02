// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                if (parsedUser) { // additionally check if parsedUser is the expected object format if necessary
                    setCurrentUser(parsedUser);
                }
            } catch (error) {
                console.error("Failed to parse user data:", error);
                // Optionally clear the corrupted 'user' from local storage or handle the error as needed
            }
        }
        setIsLoading(false);
    }, []);
    

    const login = (user, token, permission) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('permission', permission);
        console.log(localStorage);
        setCurrentUser(user);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('permission');
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
