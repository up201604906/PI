import React from 'react';
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import "../../styles/Inventory.css";

class Table extends React.Component {
    state = {
        editingRow: null,
        editedData: null,
        deletingRow: null,
    };

    handleEdit = (index, row) => {
        fetch(`http://localhost:4000/inventory/resources/${row[0]}`)
            .then(res => res.json())
            .then(resource => {
                this.setState({ editingRow: index, editedData: [...row], editingResource: resource });
            })
            .catch(err => console.error(err));
    }

    handleSave = () => {
        const { editedData, editingResource } = this.state;
        const updatedResource = {
            name: editedData[0],
            description: editedData[1],
            category: editedData[2],
            quantity: editedData[3],
            available: editedData[4],
            supplier: editedData[5],
            room: editedData[6],
            cabinet: editedData[7],
            shelf: editedData[8],
            box: editedData[9],
            price: editingResource.price, // Use the existing price
            priority: editingResource.priority, // Use the existing priority
        };

        fetch(`http://localhost:4000/inventory/resources/${editingResource.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedResource),
        })
        .then(() => {
            this.setState({ editingRow: null, editedData: null, editingResourceId: null, editingResource: null });
            this.props.refreshData();
        })
        .catch((err) => console.error(err));
    }

    handleChange = (event, cellIndex) => {
        const editedData = [...this.state.editedData];
        editedData[cellIndex] = event.target.value;
        this.setState({ editedData });
    }

    handleDelete = (row) => {
        fetch(`http://localhost:4000/inventory/resources/${row[0]}`, {
            method: 'DELETE',
        })
        .then(() => {
            this.props.refreshData();
        })
        .catch((err) => console.error(err));
    }

    render() {
        const { tableHead, data } = this.props;

        return (
            <>
            <table>
                <thead>
                    <tr>
                        {tableHead.map((head, index) => <th key={index}>{head}</th>)}
                        <th style={{ width: '80px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {row.map((cell, i) => this.state.editingRow === index ? (
                                <td key={i}><input value={this.state.editedData[i] || ''} onChange={(event) => this.handleChange(event, i)} /></td>
                            ) : (
                                <td key={i}>{cell}</td>
                            ))}
                            <td className="actions">
                                {this.state.editingRow === index ? (
                                    <>
                                        <button onClick={() => this.handleSave(index)}>Save</button>
                                        <button onClick={() => this.setState({ editingRow: null, editedData: null })}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => this.handleEdit(index, row)}>Edit</button>
                                        <button type="button" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => this.setState({ deletingRow: row })}>
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="modal fade custom-modal" id="deleteModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Confirm Delete</h5>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this Resource?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary btn-sm rounded custom-btn" data-bs-dismiss="modal"
                                    onClick={() => this.handleDelete(this.state.deletingRow)}>Delete Resource
                            </button>
                            <button type="button" className="btn btn-secondary btn-sm rounded custom-btn" data-bs-dismiss="modal">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

class Resources extends React.Component {
    state = {
        resources: [],
        searchTerm: '',
        roomFilter: '',
        categoryFilter: '',
    };

    callAPI() {
        fetch("http://localhost:4000/inventory/resources")
            .then((res) => res.json())
            .then((res) => {
                const resources = res.map(({ id, price, priority, ...resource }) => Object.values(resource));
                resources.sort((a, b) => a[0].localeCompare(b[0])); // Sort resources by name
                this.setState({ resources });
            })
            .catch((err) => console.error(err));
    }

    refreshData = () => {
        this.callAPI();
    }

    componentDidMount() {
        this.callAPI();
    }

    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value });
    }

    handleRoomFilterChange = (event) => {
        this.setState({ roomFilter: event.target.value });
    }

    handleCategoryFilterChange = (event) => {
        this.setState({ categoryFilter: event.target.value });
    }

    render() {
        const rooms = [...new Set(this.state.resources.map(resource => resource[6]))].filter(room => room && room !== '');
        const categories = [...new Set(this.state.resources.map(resource => resource[2]))].filter(category => category && category !== '');
        const filteredResources = this.state.resources.filter(
            resource => (resource[0] ? resource[0].toLowerCase().includes(this.state.searchTerm.toLowerCase()) : false) || 
                        (resource[1] ? resource[1].toLowerCase().includes(this.state.searchTerm.toLowerCase()) : false)
        ).filter(
            resource => this.state.roomFilter === '' || resource[6] === this.state.roomFilter
        ).filter(
            resource => this.state.categoryFilter === '' || resource[2] === this.state.categoryFilter 
        );

        return (
            <div className={"d-flex flex-column"}>
                <div className={"title"}><span>R</span>esources</div>
                <div id={"search_filters"}>
                    <input type="text" placeholder={'\uD83D\uDD0E\uFE0E Search...'} value={this.state.searchTerm} onChange={this.handleSearch} />
                    <label>Filters:</label>
                    <select value={this.state.roomFilter} onChange={this.handleRoomFilterChange}>
                        <option value="">All Rooms</option>
                        {rooms.map((room, index) => <option key={index} value={room}>{room}</option>)}
                    </select>
                    <select value={this.state.categoryFilter} onChange={this.handleCategoryFilterChange}>
                        <option value="">All Categories</option>
                        {categories.map((category, index) => <option key={index} value={category}>{category}</option>)}
                    </select>
                    <Link to="/inventory/createResource" className="create-resource">
                        <button>Create New Resource</button>
                    </Link>
                </div>
                <div id={"info"} className={"d-flex flex-row justify-content-around w-100"}>
                    <div className="table-container">
                        <Table title={"Resources"} tableHead={["Name", "Description", "Category", "Quantity", "Available", "Supplier", "Room", "Cabinet", "Shelf", "Box"]} data={filteredResources} refreshData={this.refreshData}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Resources;