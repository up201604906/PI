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
        fetch(`http://localhost:4000/inventory/licenses/${row[0]}`)
            .then(res => res.json())
            .then(license => {
                this.setState({ editingRow: index, editedData: [...row], editingLicense: license });
            })
            .catch(err => console.error(err));
    }

    handleSave = () => {
        const { editedData, editingLicense } = this.state;
        const updatedLicense = {
            description: editedData[1],
            equipment: editedData[2],
            login: editedData[3],
            password: editedData[4],
        };

        fetch(`http://localhost:4000/inventory/licenses/${editingLicense.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedLicense),
        })
        .then(() => {
            this.setState({ editingRow: null, editedData: null, editingLicenseId: null, editingLicense: null });
            this.props.refreshData();
        })
        .catch((err) => console.error(err));
    }

    handleDelete = (row) => {
        fetch(`http://localhost:4000/inventory/licenses/${row[0]}`, {
            method: 'DELETE',
        })
        .then(() => {
            this.props.refreshData();
        })
        .catch((err) => console.error(err));
    }

    handleChange = (event, cellIndex) => {
        const editedData = [...this.state.editedData];
        editedData[cellIndex] = event.target.value;
        this.setState({ editedData });
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
                            {row.slice(1).map((cell, i) => this.state.editingRow === index ? (
                                <td key={i}><input value={this.state.editedData[i+1] || ''} onChange={(event) => this.handleChange(event, i+1)} /></td>
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
                            Are you sure you want to delete this License?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary btn-sm rounded custom-btn" data-bs-dismiss="modal"
                                    onClick={() => this.handleDelete(this.state.deletingRow)}>Delete License
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

class Licenses extends React.Component {
    state = {
        licenses: [],
        searchTerm: '',
        equipmentFilter: '',
    };

    callAPI() {
        fetch("http://localhost:4000/inventory/licenses")
            .then((res) => res.json())
            .then((res) => {
                const licenses = res.map((license) => license);
                licenses.sort((a, b) => a.description.localeCompare(b.description)); // Sort licenses by description
                this.setState({ licenses });
            })
            .catch((err) => console.error(err));
    }

    componentDidMount() {
        this.callAPI();
    }

    refreshData = () => {
        this.callAPI();
    }

    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value });
    }

    handleEquipmentFilterChange = (event) => {
        this.setState({ equipmentFilter: event.target.value });
    }

    render() {
        const equipments = [...new Set(this.state.licenses.map(license => license.equipment))].filter(equipment => equipment && equipment !== '');
        const filteredLicenses = this.state.licenses.filter(
            license => (license.description ? license.description.toLowerCase().includes(this.state.searchTerm.toLowerCase()) : false) || 
                        (license.equipment ? license.equipment.toLowerCase().includes(this.state.searchTerm.toLowerCase()) : false)
        ).filter(
            license => this.state.equipmentFilter === '' || license.equipment === this.state.equipmentFilter
        );

        const tableData = filteredLicenses.map(license => [license.id, license.description, license.equipment, license.login, license.password]);

        return (
            <div className={"d-flex flex-column"}>
                <div className={"title"}><span>L</span>icenses</div>
                <div id={"search_filters"}>
                    <input type="text" placeholder={'\uD83D\uDD0E\uFE0E Search...'} value={this.state.searchTerm} onChange={this.handleSearch} />
                    <label>Filter:</label>
                    <select value={this.state.equipmentFilter} onChange={this.handleEquipmentFilterChange}>
                        <option value="">All Equipments</option>
                        {equipments.map((equipment, index) => <option key={index} value={equipment}>{equipment}</option>)}
                    </select>
                    <Link to="/inventory/createLicense" className="create-resource">
                        <button>Create New License</button>
                    </Link>
                </div>
                <div id={"info"} className={"d-flex flex-row justify-content-around w-100"}>
                    <div className="table-container">
                        <Table title={"Licenses"} tableHead={["Description", "Equipment", "Login", "Password"]} data={tableData} refreshData={this.refreshData}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Licenses;