import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import "../../styles/Create.css";

class CreatePCAllocation extends React.Component {
    state = {
        users: [],
        user_name: '',
        name: '',
        serial_number: '',
        room: ''
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // Fetch all existing PC allocations
        fetch('http://localhost:4000/inventory/pcallocation')
            .then(res => res.json())
            .then((existingPCAllocations) => {
                // Create the new PC allocation
                fetch('http://localhost:4000/inventory/createPCAllocation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.state),
                })
                .then(() => {
                    window.location.href = '/inventory/pcallocation';
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
    }

    componentDidMount() {
        fetch('http://localhost:4000/user-mgmt')
            .then(res => res.json())
            .then((data) => {
                this.setState({ users: data });
            })
            .catch((err) => console.error(err));
    }

    render() {
        return (
            <div>
                <div className={"title"}><span>P</span>C Allocation <span>C</span>reator</div>
                <div className={"create-form"}>
                    <Link to="/inventory/pcallocation" className="go-back">←</Link>
                    <form onSubmit={this.handleSubmit}>
                        <div className={"subtitle"}>New PC Allocation</div>
                        <label>
                            User Name:
                            <select name="user_name" value={this.state.user_name} onChange={this.handleChange} required>
                                <option value="" disabled selected>Select a user</option>
                                {this.state.users.map((user, index) => (
                                    <option key={index} value={user.name}>{user.name}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Name:
                            <textarea name="name" value={this.state.name} onChange={this.handleChange} required />
                        </label>
                        <label>
                            Serial Number:
                            <input type="text" name="serial_number" value={this.state.serial_number} onChange={this.handleChange} required />
                        </label>
                        <label>
                            Room:
                            <input type="text" name="room" value={this.state.room} onChange={this.handleChange} required />
                        </label>

                        <button type="submit">Create PC Allocation</button>
                    </form>
                </div>
            </div>
        );
    }

}

export default CreatePCAllocation;