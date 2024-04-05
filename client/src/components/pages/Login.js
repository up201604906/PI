import React from 'react';
// import '../../styles/Login.css'

class Login extends React.Component {

    render() {

        return (
            <form className={"w-25 mx-auto"}>
                <h1 className={"text-center title"}>Login</h1>
                <div className="form-group my-5 mx-auto w-75">
                    <label className={"fw-bold"} for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted"></small>
                </div>
                <div className="form-group my-5 mx-auto w-75">
                    <label className={"fw-bold"} for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <div className={"text-center"}>
                    <button type="submit" className="btn btn-primary my-3 fw-bold">Login</button>
                </div>
            </form>
        );
    }
}

export default Login;
