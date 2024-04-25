import React, {Component} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import './styles/App.css'
import Home from './components/pages/Home';
import Topnav from "./components/components/common/Topnav";
import Resources from "./components/pages/Resources";
import CreateResource from "./components/pages/CreateResource";
import Licenses from "./components/pages/Licenses";
import CreateLicense from "./components/pages/CreateLicense";
import PCAllocation from "./components/pages/PCAllocation";
import CreatePCAllocation from "./components/pages/CreatePCAllocation";

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
                            }/> {}
                            <Route path="/inventory/createResource" element={
                                <CreateResource />
                            }/>
                            <Route path="/inventory/licenses" element={
                                <Licenses />
                            }/> {}
                            <Route path="/inventory/createLicense" element={
                                <CreateLicense />
                            }/>
                            <Route path="/inventory/pcallocation" element={
                                <PCAllocation />
                            }/>
                            <Route path="/inventory/createPCAllocation" element={
                                <CreatePCAllocation />
                            }/>
                            
                        </Routes>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
