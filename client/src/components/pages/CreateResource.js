import React from 'react';
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import "../../styles/Create.css";

class CreateResource extends React.Component {
    state = {
        name: '',
        description: '',
        category: '',
        quantity: 0,
        available: 0,
        supplier: '',
        room: '',
        cabinet: '',
        shelf: '',
        box: '',
        price: 0,
        priority: 'low',
        categories: [],
    };

    componentDidMount() {
        // Fetch all existing resources from the server
        fetch('http://localhost:4000/inventory/resources')
            .then(res => res.json())
            .then(allResources => {
                // Get the categories from the resources
                const resourceCategories = allResources.flatMap(resource => resource.category);

                // Store the filtered resources and the categories in the state
                this.setState({ categories: [...new Set(resourceCategories)] });
            })
            .catch(err => console.error(err));
    }

    handleChange = (event) => {
        let value = event.target.value;

        // Convert quantity and available to numbers
        if (event.target.name === 'quantity' || event.target.name === 'available') {
            value = parseInt(value, 10);
        }

        this.setState({ [event.target.name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // Validate quantity and available
        if (isNaN(this.state.quantity) || isNaN(this.state.available)) {
            alert('Quantity and Available must be numbers.');
            return;
        }

        if (this.state.quantity <= 0) {
            alert('Quantity must be a number greater than 0.');
            return;
        }

        if (this.state.available < 0) {
            alert('Available must be a number greater than or equal to 0.');
            return;
        }

        // Fetch all existing resources
        fetch('http://localhost:4000/inventory/resources')
            .then(res => res.json())
            .then((existingResources) => {
                // Check if the new name already exists
                if (existingResources.some(resource => resource.name === this.state.name)) {
                    alert('A resource with this name already exists.');
                } else {
                    // Create the new resource
                    fetch('http://localhost:4000/inventory/createResource', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(this.state),
                    })
                    .then(() => {
                        window.location.href = '/inventory/resources';
                    })
                    .catch((err) => console.error(err));
                }
            })
            .catch((err) => console.error(err));
    }

    render() {
        return (
            <div>
                <div className={"title"}><span>R</span>esource <span>C</span>reator</div>
                <div className={"create-form"}>
                    <Link to="/inventory/resources" className="go-back">←</Link>
                    <form onSubmit={this.handleSubmit}>
                        <div className={"subtitle"}>New Resource</div>
                        <label>
                            Name:
                            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                        </label>
                        <label>
                            Description:
                            <textarea name="description" value={this.state.description} onChange={this.handleChange} />
                        </label>
                        <label>
                            Category:
                            <input list="categories" name="category" value={this.state.category} onChange={this.handleChange} />
                            <datalist id="categories">
                                {this.state.categories.map((option, index) => (
                                    <option key={index} value={option} />
                                ))}
                            </datalist>
                        </label>
                        <div>
                            <label>
                                Quantity:
                                <input type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} required />
                            </label>
                            <label>
                                Available:
                                <input type="number" name="available" value={this.state.available} onChange={this.handleChange} required />
                            </label>
                        </div>
                        <label>
                            Supplier:
                            <input type="text" name="supplier" value={this.state.supplier} onChange={this.handleChange} />
                        </label>
                        <div className="location">
                            <label className="location-label">Location</label>
                            <div id="top-line">
                                <label>
                                    Room:
                                    <input type="text" name="room" value={this.state.room} onChange={this.handleChange} />
                                </label>
                                <label>
                                    Cabinet:
                                    <input type="text" name="cabinet" value={this.state.cabinet} onChange={this.handleChange} />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Shelf:
                                    <input type="text" name="shelf" value={this.state.shelf} onChange={this.handleChange} />
                                </label>
                                <label>
                                    Box:
                                    <input type="text" name="box" value={this.state.box} onChange={this.handleChange} />
                                </label>
                            </div>
                        </div>
                        
                        <button type="submit">Create Resource</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateResource;