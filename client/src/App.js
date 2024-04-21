import React, {Component} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider} from './contexts/AuthContext';
import './styles/App.css'
import ProtectedRoute from "./components/components/common/ProtectedRoute";
import Home from './components/pages/Home';
import Topnav from "./components/components/common/Topnav";
import Resources from "./components/pages/Resources";
// import Login from "./components/pages/Login";
import CreateResource from "./components/pages/CreateResource";
import Login from "./components/components/auth/Login";
import UserManagement from "./components/pages/UserManagement";
import AddUser from "./components/pages/AddUser";
import EventManagement from "./components/pages/EventManagement";
import AddEvent from "./components/pages/AddEvent";
import UserProfile from "./components/pages/UserProfile";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {apiResponse: ''};
    }

    callAPI() {
        fetch("http://localhost:4000/")
            .then(res => res.text())
            .then(res => this.setState({apiResponse: res}))
            .catch(err => err);
    }

    componentDidMount() { // Changed from componentWillMount to componentDidMount
        this.callAPI();
    }

    render() {
        return (
            <AuthProvider>
                <Router>
                    <div className="App">
                        <Topnav/>
                        <div id={"body"}>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/inventory/resources" element={<Resources/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/inventory/createResource" element={<CreateResource/>}/>
                                <Route path={"/user-mgmt"} element={<UserManagement/>}/>
                                <Route path={"add-user"} element={<AddUser/>}/>
                                <Route path={"event-mgmt"} element={<EventManagement/>}/>
                                <Route path={"add-event"} element={<AddEvent/>}/>
                                <Route path={"user/:id"} element={<UserProfile id={1}/>}/>
                            </Routes>
                        </div>
                    </div>

                </Router>
            </AuthProvider>
        );
    }
}

export default App;
