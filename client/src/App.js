import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes, RouterProvider} from "react-router-dom";
import {useAuth} from './contexts/AuthContext';
import './styles/App.css';
import './styles/style.css';
import './scripts/main.js';
import ProtectedRoute from "./components/components/common/ProtectedRoute";
import Dashboard from './components/pages/Dashboard';
import DashboardTopnav from "./components/components/common/DashboardTopnav";
import Topnav from "./components/components/common/Topnav";
import Resources from "./components/pages/Resources";
import CreateResource from "./components/pages/CreateResource";
import Wishlist from "./components/pages/Wishlist";
import AddToWishlist from "./components/pages/AddToWishlist";
import Licenses from "./components/pages/Licenses";
import CreateLicense from "./components/pages/CreateLicense";
import PCAllocation from "./components/pages/PCAllocation";
import CreatePCAllocation from "./components/pages/CreatePCAllocation";
import Login from "./components/components/auth/Login";
import Theses from "./components/pages/Theses";
import Thesis from "./components/pages/Thesis";
import CreateThesis from "./components/pages/CreateThesis";
import UserManagement from "./components/pages/user/UserManagement";
import AddUser from "./components/pages/user/AddUser";
import EventManagement from "./components/pages/events/EventManagement";
import AddEvent from "./components/pages/events/AddEvent";
import UserProfile from "./components/pages/user/UserProfile";
import Footer from "./components/components/common/Footer";
import MyArticles from "./components/pages/articles/MyArticles";
import CreateArticle from "./components/pages/articles/CreateArticle";
import Articles from "./components/pages/articles/Articles";
import ArticlePage from "./components/pages/articles/ArticlePage";
import BibTeXImportPage from "./components/pages/articles/BibTeXImportPage";
import MyProjects from "./components/pages/projects/MyProjects";
import Project from "./components/pages/projects/Project";
import CreateProject from "./components/pages/projects/CreateProject";
import Projects from "./components/pages/projects/Projects";
import Home from "./components/pages/digi2/Home";


function App() {
    const {currentUser} = useAuth();

    return (
        <Router>
            <Topnav/>
            <div id={"body"}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>

                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
                    <Route path="/inventory/resources" element={<ProtectedRoute><Resources/></ProtectedRoute>}/>
                    <Route path="/inventory/createResource" element={<ProtectedRoute><CreateResource/></ProtectedRoute>}/>
                    <Route path="/user-mgmt" element={<ProtectedRoute><UserManagement/></ProtectedRoute>}/>
                    <Route path="/add-user" element={<ProtectedRoute><AddUser/></ProtectedRoute>}/>
                    <Route path="/myArticles/:id" element={<ProtectedRoute><MyArticles/></ProtectedRoute>} />
                    <Route path="/createArticle" element={<ProtectedRoute><CreateArticle/></ProtectedRoute>}/>
                    <Route path="/articles" element={<Articles/>}/>
                    <Route path="/articles/:id" element={<ArticlePage/>}/>
                    <Route path="/importArticle" element={<ProtectedRoute><BibTeXImportPage /></ProtectedRoute>} />
                    <Route path="/my-projects/:id" element={<ProtectedRoute><MyProjects></MyProjects></ProtectedRoute>} />
                    <Route path="/project/:id" element={<ProtectedRoute><Project/></ProtectedRoute>} />
                    <Route path="/projects/" element={<ProtectedRoute><Projects/></ProtectedRoute>} />
                    <Route path="/projects/create" element={<ProtectedRoute><CreateProject/></ProtectedRoute>} />
                    <Route path="/event-mgmt" element={<ProtectedRoute><EventManagement/></ProtectedRoute>}/>
                    <Route path="/add-event" element={<ProtectedRoute><AddEvent/></ProtectedRoute>}/>
                    <Route path="/user/:id" element={<ProtectedRoute><UserProfile id={1}/></ProtectedRoute>}/>
                    <Route path="/inventory/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>}/>
                    <Route path="/inventory/addToWishlist" element={<ProtectedRoute><AddToWishlist/></ProtectedRoute>}/>
                    <Route path="/inventory/licenses" element={<ProtectedRoute><Licenses/></ProtectedRoute>}/> {}
                    <Route path="/inventory/createLicense" element={<ProtectedRoute><CreateLicense /></ProtectedRoute>}/>
                    <Route path="/inventory/pcallocation" element={<ProtectedRoute><PCAllocation /></ProtectedRoute>}/>
                    <Route path="/inventory/createPCAllocation" element={<ProtectedRoute><CreatePCAllocation /></ProtectedRoute>}/>
                    <Route path="/theses" element={<ProtectedRoute><Theses /></ProtectedRoute>}/>
                    <Route path="/thesis/:id" element={<ProtectedRoute><Thesis /></ProtectedRoute>}/>
                    <Route path="/createThesis" element={<ProtectedRoute><CreateThesis /></ProtectedRoute>}/>
                    <Route path="*" element={<Navigate to={currentUser ? "/dashboard" : "/"}/>}/> {/* catch-all route*/}
                </Routes>
            </div>
            <Footer/>
        </Router>
    );
}

export default App;
