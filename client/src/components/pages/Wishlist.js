import React from 'react';
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import "../../styles/Inventory.css";

class Table extends React.Component {
    state = {
        wishlist: [],
        editingRow: null,
        editedData: null,
        isResource: null,
        row: null
    };

    handleDelete = (row, isResource) => {
        if (window.confirm("Are you sure you want to delete this resource?")) {
        const endpoint = isResource
            ? `http://localhost:4000/inventory/wishlist/${row[0]}/${row[1]}/null`
            : `http://localhost:4000/inventory/wishlist/${row[0]}/null/${row[1]}`;
        fetch(endpoint, {
            method: "DELETE",
        })
            .then(() => this.props.refreshData())
            .catch((err) => console.error(err));
        }
    };

    handleEdit = (index, row) => {
        const editedRow = [...row];
        // Remove '€' from price
        editedRow[6] = parseFloat(editedRow[6].replace(' €', ''));
        editedRow[7] = parseFloat(editedRow[7].replace(' €', ''));
        this.setState({ editingRow: index, editedData: editedRow, row: editedRow, isResource: row[11] });
    };

    handleSave = () => {
        const { editedData, isResource, row } = this.state;
        const updatedItem = {
            user_name: editedData[0],
            name: editedData[1],
            description: editedData[2],
            category: editedData[3],
            supplier: editedData[4],
            price: editedData[6],
            priority: editedData[8],
            quantity: editedData[5],
            state: editedData[10]
        };

        const endpoint = isResource
            ? `http://localhost:4000/inventory/wishlist/${row[0]}/${row[1]}/null`
            : `http://localhost:4000/inventory/wishlist/${row[0]}/null/${row[1]}`;
        fetch(endpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem),
        })
        .then(() => {
            this.setState({ editingRow: null, editedData: null });
            this.props.refreshData();
        })
        .catch((err) => console.error(err));
    }

    handleChange = (event, cellIndex) => {
        const editedData = [...this.state.editedData];
        editedData[cellIndex] = event.target.value;
        this.setState({ editedData });
    }

    handleCancel = () => {
        this.setState({ editingRow: null, editedData: null });
    }

    render() {
        const { tableHead, data } = this.props;

        return (
        <table>
            <thead>
            <tr>
                {tableHead.map((head, index) => <th key={index}>{head}</th>)}
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {row.map((cell, i) => {
                        if (i === 11) return null; // Skip the isResource column
                        return this.state.editingRow === index && i !== 7 && i !== 9 ? ( // Prevent the total price & added at from being edited
                            <td key={i}>
                                {i === 8 ? ( // If it's the priority cell
                                <select className={"priority-edit-select"} value={this.state.editedData[i] || ''} onChange={(event) => this.handleChange(event, i)}>
                                    <option value="low">low</option>
                                    <option value="medium">medium</option>
                                    <option value="high">high</option>
                                </select>
                            ) : i === 10 ? ( // If it's the state cell
                                <select className={"priority-edit-select"} value={this.state.editedData[i] || ''} onChange={(event) => this.handleChange(event, i)}>
                                    <option value="open">open</option>
                                    <option value="ordered">ordered</option>
                                    <option value="delivered">delivered</option>
                                </select>
                            ) : (
                                <input value={this.state.editedData[i] || ''} onChange={(event) => this.handleChange(event, i)} />
                            )}
                            </td>
                        ) : (
                            <td className="move-to-resources" key={i}>
                                {cell}
                                { i === 10 && cell === 'delivered' && <button id="moveToResourcesButton" onClick={() => this.props.handleMoveToResourcesClick(row[0], row[1], row[11], row[5])}>Move to Resources</button> } 
                            </td>
                        );
                    })}
                        <td className="actions">
                            {this.state.editingRow === index ? (
                                <>
                                    <button onClick={this.handleSave}>Save</button>
                                    <button onClick={this.handleCancel}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => this.handleEdit(index, row)}>Edit</button>
                                    <button onClick={() => this.handleDelete(row, row[11])}>Delete</button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        );
    }
}

class Wishlist extends React.Component {
    state = {
        wishlist: [],
        searchTerm: '',
        categoryFilter: '',
        priorityFilter: '',
        stateFilter: '',
        isPopupVisible: false,
        selectedQuantity: 0
    };

    refreshData = () => {
        this.callAPI();
    }

    callAPI() {
        fetch("http://localhost:4000/inventory/wishlist")
            .then((res) => res.json())
            .then((res) => {
                const wishlist = res.map(item => {
                    const date = new Date(item.added_at);
                    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

                    return {
                        user_name: item.user_name,
                        resource_name: item.resource_name,
                        resource_description: item.resource_description,
                        resource_category: item.resource_category,
                        resource_supplier: item.resource_supplier,
                        resource_price: item.resource_price,
                        resource_priority: item.resource_priority,
                        potential_resource_name: item.potential_resource_name,
                        potential_resource_description: item.potential_resource_description,
                        potential_resource_category: item.potential_resource_category,
                        potential_resource_supplier: item.potential_resource_supplier,
                        potential_resource_price: item.potential_resource_price,
                        potential_resource_priority: item.potential_resource_priority,
                        quantity: item.quantity,
                        added_at: formattedDate,
                        state: item.state
                    };
                });
                this.setState({ wishlist });
            })
            .catch((err) => console.error(err));
    }

    componentDidMount() {
        this.callAPI();
    }

    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value });
    }

    handleCategoryFilterChange = (event) => {
        this.setState({ categoryFilter: event.target.value });
    }

    handlePriorityFilterChange = (event) => {
        this.setState({ priorityFilter: event.target.value });
    }

    handleStateFilterChange = (event) => { 
        this.setState({ stateFilter: event.target.value });
    }

    handleMoveToResourcesClick = (userName, resourceName, isResource, quantity) => {
        this.setState({ 
            isPopupVisible: true,
            userName: userName,
            resourceName: isResource ? resourceName : null,
            potentialResourceName: isResource ? null : resourceName,
            selectedQuantity: quantity
        });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.setState({ isPopupVisible: false }); // Close the popup

        const userName = this.state.userName;
        const resourceName = this.state.resourceName;
        const potentialResourceName = this.state.potentialResourceName;
        const quantity = event.target.quantity.value;

        let room = null;
        let cabinet = null;
        let shelf = null;
        let box = null;

        if (resourceName === null) {
            room = event.target.room.value;
            cabinet = event.target.cabinet.value;
            shelf = event.target.shelf.value;
            box = event.target.box.value;
        }

        fetch('http://localhost:4000/inventory/wishlist/moveToResources', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ 
                userName, 
                resourceName, 
                potentialResourceName, 
                room, 
                cabinet, 
                shelf, 
                box, 
                quantity 
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                this.refreshData();
            } else {
                console.error('Error:', data);
            }
        })
        .catch((err) => {
            console.error('Error:', err);
        });
    }

    handleQuantityChange = (event) => {
        this.setState({ selectedQuantity: event.target.value });
    }

    render() {
        const categories = [...new Set(this.state.wishlist.map(wishlistItem => wishlistItem.resource_category || wishlistItem.potential_resource_category))].filter(category => category && category !== '');
        const priorities = [...new Set(this.state.wishlist.map(wishlistItem => wishlistItem.resource_priority || wishlistItem.potential_resource_priority))].filter(priority => priority && priority !== '');
        const states = [...new Set(this.state.wishlist.map(wishlistItem => wishlistItem.state))].filter(state => state && state !== '');
        const mappedWishlist = this.state.wishlist.map(item => ({
            user_name: item.user_name,
            name: item.resource_name !== null ? item.resource_name : item.potential_resource_name,
            description: item.resource_description !== null ? item.resource_description : item.potential_resource_description,
            category: item.resource_category !== null ? item.resource_category : item.potential_resource_category,
            supplier: item.resource_supplier !== null ? item.resource_supplier : item.potential_resource_supplier,
            price: (item.resource_price !== null ? item.resource_price : item.potential_resource_price) || 0,
            priority: item.resource_priority !== null ? item.resource_priority : item.potential_resource_priority,
            quantity: item.quantity,
            added_at: item.added_at,
            state: item.state,
            isResource: item.resource_name !== null ? true : false
        }));
        const filteredWishlist = mappedWishlist.filter(
            wishlistItem => (wishlistItem.user_name ? wishlistItem.user_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) : false) || 
                            (wishlistItem.name ? wishlistItem.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) : false) ||
                            (wishlistItem.description ? wishlistItem.description.toLowerCase().includes(this.state.searchTerm.toLowerCase()) : false)
        ).filter(
            wishlistItem => this.state.categoryFilter === '' || wishlistItem.category === this.state.categoryFilter
        ).filter(
            wishlistItem => this.state.priorityFilter === '' || wishlistItem.priority === this.state.priorityFilter
        ).filter(
            wishlistItem => this.state.stateFilter === '' || wishlistItem.state === this.state.stateFilter
        );

        return (
            <div className={"d-flex flex-column"}>
                <div className={"title"}><span>W</span>ishlist</div>
                <div id={"search_filters"}>
                    <input type="text" placeholder={'\uD83D\uDD0E\uFE0E Search...'} value={this.state.searchTerm} onChange={this.handleSearch} />
                    <label>Filters:</label>
                    <select value={this.state.categoryFilter} onChange={this.handleCategoryFilterChange}>
                        <option value="">All Categories</option>
                        {categories.map((category, index) => <option key={index} value={category}>{category}</option>)}
                    </select>
                    <select value={this.state.priorityFilter} onChange={this.handlePriorityFilterChange}>
                        <option value="">All Priorities</option>
                        {priorities.map((priority, index) => <option key={index} value={priority}>{priority}</option>)}
                    </select>
                    <select value={this.state.stateFilter} onChange={this.handleStateFilterChange}>
                        <option value="">All States</option>
                        {states.map((state, index) => <option key={index} value={state}>{state}</option>)}
                    </select>
                    <Link to="/inventory/addToWishlist" className="create-resource">
                        <button>Add Resource To Wishlist</button>
                    </Link>
                </div>
                {this.state.isPopupVisible && <div id="overlay"></div>}
                <div id="popupForm" style={{display: this.state.isPopupVisible ? 'block' : 'none'}}>
                    <div className={"move-subtitle"}> Complete before moving to resources: </div> 
                    <form id="moveToResourcesForm" onSubmit={this.handleFormSubmit}>
                        <label htmlFor="quantity">Quantity:</label>
                        <input type="number" id="quantity" name="quantity" value={this.state.selectedQuantity} onChange={this.handleQuantityChange} min="1"/>
                        {this.state.resourceName === null && (
                            <>
                                <label htmlFor="room">Room:</label>
                                <input type="text" id="room" name="room"/>
                                <label htmlFor="cabinet">Cabinet:</label>
                                <input type="text" id="cabinet" name="cabinet"/>
                                <label htmlFor="shelf">Shelf:</label>
                                <input type="text" id="shelf" name="shelf"/>
                                <label htmlFor="box">Box:</label>
                                <input type="text" id="box" name="box"/>
                            </>
                        )}
                        <div id="moveToResourcesButtons">
                            <button type="submit">Move</button>
                            <button type="button" onClick={() => this.setState({ isPopupVisible: false })}>Cancel</button>
                        </div>
                    </form>
                </div>
                <div id={"info"} className={"d-flex flex-row justify-content-around w-100"}>
                    <div className="table-container">
                        <Table 
                            title={"Wishlist"} 
                            tableHead={["User", "Resource Name", "Description", "Category", "Supplier", "Desired Quantity", "Unitary Price", "Total Price", "Priority", "Added At", "State"]} 
                            data={filteredWishlist.map(item => [item.user_name, item.name, item.description, item.category, item.supplier, item.quantity, `${item.price} €`, `${item.price * item.quantity} €`, item.priority, item.added_at, item.state, item.isResource])} 
                            refreshData={this.refreshData}
                            handleMoveToResourcesClick={this.handleMoveToResourcesClick}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Wishlist;