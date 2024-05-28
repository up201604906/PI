import React from 'react';
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import "../../styles/Create.css";

class AddToWishlist extends React.Component {
    state = {
        isExistingResource: null,
        selectedResource: null,
        newResource: null,
        resources: [],
        name: '',
        description: '',
        category: '',
        quantity: 1,
        supplier: '',
        price: 0,
        priority: 'low',
    };

    componentDidMount() {
        // Fetch all existing resources from the server
        fetch('http://localhost:4000/inventory/resources')
            .then(res => res.json())
            .then(allResources => {
                // Fetch all resources in the wishlist
                fetch('http://localhost:4000/inventory/wishlist')
                    .then(res => res.json())
                    .then(wishlistResources => {
                        // Filter out the resources that are already in the wishlist
                        const resources = allResources.filter(resource =>
                            !wishlistResources.some(wishlistResource => wishlistResource.resource_name === resource.name)
                        );

                        // Get the categories from the wishlist resources
                        const wishlistCategories = wishlistResources.flatMap(resource => [resource.potential_resource_category, resource.resource_category]);

                        // Store the filtered resources and the categories in the state
                        this.setState({ resources, categories: [...new Set(wishlistCategories)] });
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }

    handleResourceSelection = (resourceName) => {
        this.resetState();

        if (resourceName === '') {
            return;
        }

        // Find the selected resource from the resources array
        const selectedResource = this.state.resources.find(resource => resource.name === resourceName);

        // Update the state with the details of the selected resource
        this.setState({
            selectedResource,
            name: selectedResource.name,
            description: selectedResource.description || '',
            category: selectedResource.category || '',
            supplier: selectedResource.supplier || '',
            price: selectedResource.price || 0,
            isExistingResource: true,
        });
    }

    handleChange = (event) => {
        let value = event.target.value;

        // Convert quantity to number
        if (event.target.name === 'quantity') {
            value = parseInt(value, 10);
        }

        this.setState({ [event.target.name]: value });

        // If a new resource is being added, update the newResource state
        if (!this.state.isExistingResource && event.target.name === 'name') {
            this.setState({ newResource: { name: value } });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // Validate quantity
        if (isNaN(this.state.quantity) || this.state.quantity <= 0) {
            alert('Quantity must be a number greater than 0.');
            return;
        }

        // Fetch all existing resources
        fetch('http://localhost:4000/inventory/resources')
            .then(res => res.json())
            .then((existingResources) => {
                // Check if the new name already exists
                if (this.state.newResource && existingResources.some(resource => resource.name === this.state.newResource.name)) {
                    alert("A resource with this name already exists.");
                } else {
                    fetch('http://localhost:4000/inventory/addToWishlist', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            user_name: 'sampleName', // Hardcoded for now
                            resource_name: this.state.selectedResource ? this.state.selectedResource.name : null,
                            potential_resource_name: this.state.newResource ? this.state.newResource.name : null,
                            description: this.state.description,
                            category: this.state.category,
                            supplier: this.state.supplier,
                            price: this.state.price,
                            priority: this.state.priority,
                            quantity: this.state.quantity,
                        }),
                    })
                    .then(() => {
                        window.location.href = '/inventory/wishlist';
                    })
                    .catch((err) => console.error(err));
                }
            })
            .catch(err => console.error(err));   
    }

    resetState = () => {
        this.setState({
            selectedResource: null,
            newResource: null,
            name: '',
            description: '',
            category: '',
            quantity: 1,
            supplier: '',
            price: 0,
            priority: 'low',
        });
    }

    render() {
        const { categories } = this.state;

        return (
            <div>
                <div className={"title"}><span>A</span>dd <span>R</span>esource <span>T</span>o <span>W</span>ishlist</div>
                <div>
                    <div className={"wishlist-subtitle"}> Select an option to add a resource to the wishlist: </div> 
                    <div className={"add-to-wishlist-buttons"}>
                        <button 
                            onClick={() => this.setState({ isExistingResource: true })}
                            style={{ backgroundColor: this.state.isExistingResource === true ? '#FFE3D7' : 'hsl(0, 0%, 90%)' }}
                        >
                            Add an Existing Resource
                        </button>
                        <button 
                            onClick={() => { this.setState({ isExistingResource: false }); this.resetState(); }}
                            style={{ backgroundColor: this.state.isExistingResource === false ? '#FFE3D7' : 'hsl(0, 0%, 90%)' }}
                        >
                            Add a New Resource
                        </button>
                    </div>
                </div>
                {this.state.isExistingResource !== null && (
                    <div>
                        <div className={"create-form"}>
                            <Link to="/inventory/wishlist" className="go-back">←</Link>
                            
                            <form onSubmit={this.handleSubmit}>
                                <div className={"subtitle"}>
                                    {this.state.isExistingResource ? 'Add Existing Resource' : 'Add New Resource'}
                                </div>
                                {this.state.isExistingResource && (
                                    <label className={"existing-resource-label"}>
                                        Existing Resource:
                                        <select onChange={(e) => this.handleResourceSelection(e.target.value)}>
                                            <option value="">Select a resource</option>
                                            {this.state.resources.map((resource) => (
                                                <option key={resource.id} value={resource.name}>
                                                    {resource.name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                )}
                                {this.state.isExistingResource && (
                                    <div className="warning">
                                        Warning: Changes made here will also affect the selected resource.
                                    </div>
                                )}
                                <label>
                                    Name:
                                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required disabled={this.state.isExistingResource} />
                                </label>
                                <label>
                                    Description:
                                    <textarea name="description" value={this.state.description} onChange={this.handleChange} />
                                </label>
                                <label>
                                    Category:
                                    <input list="categories" name="category" value={this.state.category} onChange={this.handleChange} />
                                    <datalist id="categories">
                                        {categories.map((option, index) => (
                                            <option key={index} value={option} />
                                        ))}
                                    </datalist>
                                </label>
                                <label>
                                    Price:
                                    <input type="number" name="price" value={this.state.price} onChange={this.handleChange} min="0" required />
                                </label>
                                <label>
                                    Supplier:
                                    <input type="text" name="supplier" value={this.state.supplier} onChange={this.handleChange} required />
                                </label>
                                <label>
                                    Quantity:
                                    <input type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} min="1" required />
                                </label>
                                <label>
                                    Priority:
                                    <select name="priority" onChange={this.handleChange}>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </label>
                                <button type="submit">Add to Wishlist</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default AddToWishlist;