import React from 'react';

const roles = ["Student", "Collaborator", "Admin"];

class AddEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            start: '',
            end: '',
            location: '',
            website: '',
        };
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(JSON.stringify(this.state))
        fetch('http://localhost:4000/add-event', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state),
        })
            .then(response => {
                if (response.ok) {
                    // Handle successful login
                    console.log('Successfully Added Event');
                } else {
                    // Handle failed login
                    console.error('Something went wrong when adding event');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    title= () => {
        return (
            <div className="form-group my-3 mx-auto w-75">
                <label className="fw-bold" htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
            </div>
        )
    }

    description = () => {
        return (
            <div className="form-group my-3 mx-auto w-75">
                <label className="fw-bold" htmlFor="description">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    value={this.state.description}
                    onChange={this.handleChange}
                />
            </div>
        )
    }

    dateSelector = () => {
        return (
            <div className={"d-flex flex-row mx-auto justify-content-around w-100"}>
                <div className="form-group my-3 w-25">
                    <label className="fw-bold" htmlFor="start">Start</label>
                    <input
                        type="date"
                        className="form-control"
                        id="start"
                        name="start"
                        placeholder="Enter start"
                        value={this.state.start}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group my-3 w-25">
                    <label className="fw-bold" htmlFor="end">End</label>
                    <input
                        type="date"
                        className="form-control"
                        id="end"
                        name="end"
                        placeholder="Enter end"
                        value={this.state.end}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        )
    }

    locationAndWebsite = () => {
        return(
            <div>
                <div className="form-group my-3 mx-auto w-75">
                    <label className="fw-bold" htmlFor="location">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        placeholder="Enter location"
                        value={this.state.location}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group my-3 mx-auto w-75">
                    <label className="fw-bold" htmlFor="website">Website</label>
                    <input
                        type="text"
                        className="form-control"
                        id="website"
                        name="website"
                        placeholder="Enter website"
                        value={this.state.website}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        )
    }

    render() {
        return (
            <form className="w-50 mx-auto" onSubmit={this.handleSubmit}>
                <h1 className="title text-center">Add Event</h1>

                {this.title()}
                {this.dateSelector()}
                {this.locationAndWebsite()}
                {this.description()}

                <div className="text-center">
                    <button type="submit" className="btn btn-primary my-3 fw-bold">Add Event</button>
                </div>
            </form>
        );
    }
}

export default AddEvent;