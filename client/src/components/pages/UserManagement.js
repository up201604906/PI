import React from 'react';
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import "../../styles/Inventory.css";

class Table extends React.Component {
    state = {
        editingRow: null,
        editedData: null,
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
        if (window.confirm("Are you sure you want to delete this resource?")) {
            fetch(`http://localhost:4000/inventory/resources/${row[0]}`, {
                method: 'DELETE',
            })
                .then(() => {
                    this.props.refreshData();
                })
                .catch((err) => console.error(err));
        }
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
                                    <button onClick={() => this.handleDelete(row)}>Delete</button>
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

class Resources extends React.Component {
    state = {
        resources: [],
        searchTerm: '',
        roomFilter: '',
        categoryFilter: '',
    };

    callAPI() {
        fetch("http://localhost:4000/user-mgmt")
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                // const users = res.map(({ id, price, priority, ...resource }) => Object.values(resource));
                // resources.sort((a, b) => a[0].localeCompare(b[0])); // Sort resources by name
                // this.setState({ resources });
            })
            .catch((err) => console.error(err));
    }

    refreshData = () => {
        this.callAPI();
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <div className={"d-flex flex-column"}>

            </div>
        );
    }
}

export default Resources;