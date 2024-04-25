import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import "../../styles/Create.css";

class CreateLicense extends React.Component {
    state = {
        description: '',
        equipment: '',
        login: '',
        password: ''
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // Fetch all existing licenses
        fetch('http://localhost:4000/inventory/licenses')
            .then(res => res.json())
            .then((existingLicenses) => {
                // Create the new license
                fetch('http://localhost:4000/inventory/createLicense', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.state),
                })
                .then(() => {
                    window.location.href = '/inventory/licenses';
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
    }

    render() {
        return (
            <div>
                <div className={"title"}><span>L</span>icense <span>C</span>reator</div>
                <div className={"create-form"}>
                    <Link to="/inventory/licenses" className="go-back">←</Link>
                    <form onSubmit={this.handleSubmit}>
                        <div className={"subtitle"}>New License</div>
                        <label>
                            Description:
                            <textarea name="description" value={this.state.description} onChange={this.handleChange} />
                        </label>
                        <label>
                            Equipment:
                            <textarea name="equipment" value={this.state.equipment} onChange={this.handleChange} />
                        </label>
                        <label>
                            Login:
                            <input type="text" name="login" value={this.state.login} onChange={this.handleChange} />
                        </label>
                        <label>
                            Password:
                            <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                        </label>

                        <button type="submit">Create License</button>
                    </form>
                </div>
            </div>
        );
    }

}

export default CreateLicense;