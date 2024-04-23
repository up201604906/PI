import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider, useAuth} from './contexts/AuthContext';
import './styles/App.css';
import ProtectedRoute from "./components/components/common/ProtectedRoute";
import Home from './components/pages/Home';
import Topnav from "./components/components/common/Topnav";
import NotAuthTopnav from "./components/components/common/NotAuthTopnav";
import Resources from "./components/pages/Resources";
import CreateResource from "./components/pages/CreateResource";
import Login from "./components/components/auth/Login";
import UserManagement from "./components/pages/UserManagement";
import AddUser from "./components/pages/AddUser";
import EventManagement from "./components/pages/EventManagement";
import AddEvent from "./components/pages/AddEvent";
import UserProfile from "./components/pages/UserProfile";
import Footer from "./components/components/common/Footer";

function App() {
    const {auth} = useAuth();

    return (
        <Router>
            {auth ? <Topnav/> : <NotAuthTopnav/>}
            <div id={"body"}>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/app" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                    <Route path="app/inventory/resources" element={<ProtectedRoute><Resources/></ProtectedRoute>}/>
                    <Route path="app/inventory/createResource" element={<ProtectedRoute><CreateResource/></ProtectedRoute>}/>
                    <Route path="app/user-mgmt" element={<ProtectedRoute><UserManagement/></ProtectedRoute>}/>
                    <Route path="app/add-user" element={<ProtectedRoute><AddUser/></ProtectedRoute>}/>
                    <Route path="app/event-mgmt" element={<ProtectedRoute><EventManagement/></ProtectedRoute>}/>
                    <Route path="app/add-event" element={<ProtectedRoute><AddEvent/></ProtectedRoute>}/>
                    <Route path="app/user/:id" element={<ProtectedRoute><UserProfile id={1}/></ProtectedRoute>}/>
                </Routes>
            </div>
            <Footer/>
        </Router>
    );
}

export default App;
