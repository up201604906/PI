// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user !== null && user !== undefined) {
            setCurrentUser(JSON.parse(user));
        }
        setIsLoading(false);
    }, []);

    const login = (user, permission, token) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('permission', permission);
        localStorage.setItem('token', token);
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
