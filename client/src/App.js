import React, {Component} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider} from './contexts/AuthContext';
import './styles/App.css'
import ProtectedRoute from "./components/components/common/ProtectedRoute";
import Home from './components/pages/Home';
import Topnav from "./components/components/common/Topnav";
import Resources from "./components/pages/Resources";
import CreateResource from "./components/pages/CreateResource";
import MyArticles from "./components/pages/articles/MyArticles";
import CreateArticle from "./components/pages/articles/CreateArticle";
import Login from "./components/components/auth/Login";

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
                                <Route path="/" element={<Home className={"h-100"}/>}/>
                                <Route path="/inventory/resources" element={
                                    <ProtectedRoute>
                                        <Resources/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="/inventory/createResource" element={<CreateResource/>}/>
                                <Route path="/myArticles" element={<MyArticles/>}/>
                                <Route path="/createArticle" element={<CreateArticle/>}/>
                                <Route path="/login" element={<Login/>}/>
                            </Routes>
                        </div>
                    </div>
                </Router>
            </AuthProvider>
        );
    }
}

export default App;
