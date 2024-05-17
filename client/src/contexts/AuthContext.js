// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [permission, setPermission] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const userPermission = localStorage.getItem('permission');
        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                if (parsedUser) {
                    setCurrentUser(parsedUser);
                    setPermission(userPermission);
                }
            } catch (error) {
                console.error("Failed to parse user data:", error);
            }
        }
        setIsLoading(false);
    }, []);

    const login = (user, token, permission) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('permission', permission);
        setCurrentUser(user);
        setPermission(permission);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('permission');
        localStorage.removeItem('token');
        setCurrentUser(null);
        setPermission(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, permission, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
