import React from 'react';
import {Link} from "react-router-dom";
import "../../../styles/Home.css";
import "../../../styles/Inventory.css";

const eventTypes = ["Type 1", "Type 2", "Type 3", "Type 4"];


class Table extends React.Component {

    render() {
        const events = [
            {
                id: 1,
                title: "Event 1",
                type: "Type 1",
                start: "06-06-2024",
                end: "09-06-2024",
            },
            {
                id: 2,
                title: "Event 2",
                type: "Type 2",
                start: "06-06-2024",
                end: "09-06-2024",
            }
        ]

        return (
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {events.map((event, index) => (
                    <tr key={index}>
                        <td><Link to={"http://localhost3000/event/" + event.id}>{event.title}</Link></td>
                        <td>
                            <select defaultValue={event.type}>
                                {eventTypes.map((role, index) => (
                                    <option key={index} value={role}>{role}</option>
                                ))}
                            </select>
                        </td>
                        <td>{event.start}</td>
                        <td>{event.end}</td>

                        <td className="actions">
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
}

class Filters extends React.Component {
    render() {

        return (
            <div id={"search_filters"}>
                <input type="text" placeholder={'\uD83D\uDD0E\uFE0E Search...'}/>
                <label>Filters:</label>
                <select>
                <option value="">All Types</option>
                    {eventTypes.map((role, index) => (
                        <option key={index} value={role}>{role}</option>
                    ))}
                </select>
                <Link to="/add-event" className="create-resource">
                    <button>Add Event</button>
                </Link>
            </div>
        )
    }
}

class EventManagement extends React.Component {

    render() {
        return (
            <div className={"d-flex flex-column"}>
                <div className={"title"}><span>E</span>vents</div>
                <Filters/>
                <Table/>
            </div>
        );
    }
}

export default EventManagement;