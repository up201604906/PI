import React from 'react';
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import "../../styles/Inventory.css";

class Table extends React.Component {
    state = {
        editingRow: null,
        editedData: null,
        users: [],
    };

    handleEdit = (index, row) => {
        // Fetch users
        fetch('http://localhost:4000/user-mgmt')
            .then(res => res.json())
            .then(users => {
                this.setState({ users });
            })
            .catch(err => console.error(err));

        // Fetch PC allocation
        fetch(`http://localhost:4000/inventory/pcallocation/${row[0]}`)
            .then(res => res.json())
            .then(pcallocation => {
                this.setState({ editingRow: index, editedData: [...row], editingAllocation: pcallocation });
            })
            .catch(err => console.error(err));
    }

    handleSave = () => {
        const { editedData, editingAllocation } = this.state;
        const updatedAllocation = {
          user_name: editedData[1],
          name: editedData[2],
          serial_number: editedData[3],
          room: editedData[4],
        };

        fetch(`http://localhost:4000/inventory/pcallocation/${editingAllocation.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedAllocation),
        })
        .then(() => {
            this.setState({ editingRow: null, editedData: null, editingAllocationId: null, editingAllocation: null });
            this.props.refreshData();
        })
        .catch((err) => console.error(err));
    }

    handleDelete = (row) => {
        if (window.confirm("Are you sure you want to delete this allocation?")) {
            fetch(`http://localhost:4000/inventory/pcallocation/${row[0]}`, {
              method: "DELETE",
            })
              .then(() => {
                this.props.refreshData();
              })
              .catch((err) => console.error(err));
        }
    }

    handleChange = (event, cellIndex) => {
        const editedData = [...this.state.editedData];
        editedData[cellIndex] = event.target.value;
        this.setState({ editedData });
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
                            {row.slice(1, -1).map((cell, i) => this.state.editingRow === index ? (
                                i === 0 ? (
                                    <td key={i}>
                                        <select class="priority-edit-select" name="user_name" value={this.state.editedData[i+1] || ''} onChange={(event) => this.handleChange(event, i+1)} required>
                                            {this.state.users.map((user, userIndex) => (
                                                <option key={userIndex} value={user.name}>{user.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                ) : (
                                    <td key={i}><input value={this.state.editedData[i+1] || ''} onChange={(event) => this.handleChange(event, i+1)} /></td>
                                )
                            ) : (
                                i === 0 ? (
                                    <td key={i}><Link to={`/user/${row[6]}`} style={{ color: 'black' }}>{cell}</Link></td>
                                ) : (
                                    <td key={i}>{cell}</td>
                                )
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


class PCAllocation extends React.Component {
    state = {
        pcAllocations: [],
        searchTerm: '',
        roomFilter: '',
    };

    callAPI() {
        fetch("http://localhost:4000/inventory/pcallocation")
            .then((res) => res.json())
            .then((pcAllocations) => {
                pcAllocations.sort((a, b) => a.name.localeCompare(b.name)); // Sort pcAllocations by name

                // Fetch users
                fetch('http://localhost:4000/user-mgmt')
                    .then(res => res.json())
                    .then(users => {
                        // Add user id to pcAllocations
                        const pcAllocationsWithUserId = pcAllocations.map(pcAllocation => {
                            const user = users.find(user => user.name === pcAllocation.user_name);
                            const userId = user ? user.id : null;
                            return { ...pcAllocation, userId };
                        });

                        this.setState({ pcAllocations: pcAllocationsWithUserId });
                    })
                    .catch(err => console.error(err));
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

    handleRoomFilterChange = (event) => {
        this.setState({ roomFilter: event.target.value });
    }

    render() {
        const rooms = [...new Set(this.state.pcAllocations.map(pcAllocation => pcAllocation.room))].filter(room => room && room !== '');
        const filteredPCAllocations = this.state.pcAllocations.filter(
            pcAllocation => (pcAllocation.name ? pcAllocation.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) : false) || 
                            (pcAllocation.serial_number ? pcAllocation.serial_number.toLowerCase().includes(this.state.searchTerm.toLowerCase()) : false) ||
                            (pcAllocation.user_name ? pcAllocation.user_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) : false)
        ).filter(
            pcAllocation => this.state.roomFilter === '' || pcAllocation.room === this.state.roomFilter
        );

        const tableData = filteredPCAllocations.map(pcAllocation => [pcAllocation.id, pcAllocation.user_name, pcAllocation.name, pcAllocation.serial_number, pcAllocation.room, pcAllocation.userId]);

        return (
            <div className={"d-flex flex-column"}>
                <div className={"title"}><span>P</span>C Allocations</div>
                <div id={"search_filters"}>
                    <input type="text" placeholder={'\uD83D\uDD0E\uFE0E Search...'} value={this.state.searchTerm} onChange={this.handleSearch} />
                    <label>Filter:</label>
                    <select value={this.state.roomFilter} onChange={this.handleRoomFilterChange}>
                        <option value="">All Rooms</option>
                        {rooms.map((room, index) => <option key={index} value={room}>{room}</option>)}
                    </select>
                    <Link to="/inventory/createPCAllocation" className="create-resource">
                        <button>Create New PC Allocation</button>
                    </Link>
                </div>
                <div id={"info"} className={"d-flex flex-row justify-content-around w-100"}>
                    <div className="table-container">
                        <Table title={"PC Allocations"} tableHead={["User", "Name", "Serial Number", "Room"]} data={tableData} refreshData={this.refreshData}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PCAllocation;