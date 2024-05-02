import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {useAuth} from './contexts/AuthContext';
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
import MyArticles from "./components/pages/articles/MyArticles";
import CreateArticle from "./components/pages/articles/CreateArticle";
function App() {
    const {currentUser} = useAuth();

    return (
        <Router>
            {console.log(currentUser)}
            {currentUser ? <Topnav/> : <NotAuthTopnav/>}
            <div id={"body"}>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                    <Route path="/inventory/resources" element={<ProtectedRoute><Resources/></ProtectedRoute>}/>
                    <Route path="/inventory/createResource"
                           element={<ProtectedRoute><CreateResource/></ProtectedRoute>}/>
                    <Route path="/user-mgmt" element={<ProtectedRoute><UserManagement/></ProtectedRoute>}/>
                    <Route path="/add-user" element={<ProtectedRoute><AddUser/></ProtectedRoute>}/>
                    <Route path="/myArticles" element={<ProtectedRoute><MyArticles/></ProtectedRoute>}/>
                    <Route path="/createArticle" element={<ProtectedRoute><CreateArticle/></ProtectedRoute>}/>
                    <Route path="/event-mgmt" element={<ProtectedRoute><EventManagement/></ProtectedRoute>}/>
                    <Route path="/add-event" element={<ProtectedRoute><AddEvent/></ProtectedRoute>}/>
                    <Route path="/user/:id" element={<ProtectedRoute><UserProfile id={1}/></ProtectedRoute>}/>
                    <Route path="*" element={<Navigate to={currentUser ? "/home" : "/"}/>}/> {/* catch-all route*/}
                </Routes>
            </div>
            <Footer/>
        </Router>
    );
}

export default App;
