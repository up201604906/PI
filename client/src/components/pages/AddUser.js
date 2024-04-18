import React from 'react';

const roles = ["Student", "Collaborator", "Admin"];

class AddUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            role: ''
        };
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(JSON.stringify(this.state))
        fetch('http://localhost:4000/add-user', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state),
        })
            .then(response => {
                if (response.ok) {
                    // Handle successful login
                    console.log('Successfully Added User');
                } else {
                    // Handle failed login
                    console.error('Something went wrong when adding user');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    render() {
        return (
            <form className="w-25 mx-auto" onSubmit={this.handleSubmit}>
                <h1 className="title text-center">Add User</h1>
                <div className="form-group my-5 mx-auto w-75">
                    <label className="fw-bold" htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group my-5 mx-auto w-75">
                    <label className="fw-bold" htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group my-5 mx-auto w-75">
                    <label className="fw-bold" htmlFor="role">Role</label>
                    <select
                        className="form-control"
                        id="role"
                        name="role"
                        value={this.state.permission}
                        onChange={this.handleChange}
                    >
                        <option>Select a Role</option>
                        {roles.map((role, index) => (
                            <option key={index} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary my-3 fw-bold">Add User</button>
                </div>
            </form>
        );
    }
}

export default AddUser;