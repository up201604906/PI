import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: '' };
  }

  callAPI() {
    fetch("http://localhost:4000/")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  componentDidMount() { // Changed from componentWillMount to componentDidMount
    this.callAPI();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/app" element={
              <>
                <header className="App-header">
                  <img src={logo} className='App-logo' alt='logo'/>
                </header>
                <p className="App-intro">Server response: {this.state.apiResponse}</p>
              </>
            } />
            {/* You can add more routes here */}
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
