import React, {Component} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import './styles/App.css'
import Home from './components/pages/Home';
import Topnav from "./components/components/common/Topnav";
import Resources from "./components/pages/Resources";
import Login from "./components/pages/Login";
import CreateResource from "./components/pages/CreateResource";
import UserManagement from "./components/pages/UserManagement";

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
            <Router>
                <div className="App">
                    <Topnav/>
                    <div id={"body"}>
                        <Routes>
                            <Route path="/" element={
                                <Home className={"h-100"}/>
                                // <p className="App-intro">Server response: {this.state.apiResponse}</p>
                            }/>
                            <Route path="/inventory/resources" element={
                                <Resources />
                            }/>
                            <Route path="/login" element={
                               <Login />
                            }/>
                            <Route path="/inventory/createResource" element={
                                <CreateResource />
                            }/>
                            <Route path={"/user-mgmt"} element={
                                <UserManagement/>
                            }/>
                        </Routes>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
