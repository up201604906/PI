import React from "react";
import "../../styles/Home.css";
import "../../styles/Theses.css";

class Thesis extends React.Component {
    state = {
        thesis: null,
        isEditing: false,
        editedThesis: null
    };

    callAPI() {
        const thesisId = window.location.pathname.split("/").pop();

        fetch(`http://localhost:4000/thesis/${thesisId}`)
          .then((res) => res.json())
          .then((thesis) => this.setState({ thesis }))
          .catch((err) => console.error(err));
    }

    componentDidMount() {
        this.callAPI();
    }

    refreshData() {
        this.callAPI();
    }

    toggleEdit = () => {
        this.setState(prevState => ({
            isEditing: !prevState.isEditing,
            editedThesis: !prevState.isEditing ? { ...this.state.thesis[0] } : null
        }));
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            editedThesis: {
                ...prevState.editedThesis,
                [name]: value
            }
        }));
    }

    handleSubmit = () => {
        const thesisId = window.location.pathname.split("/").pop();
        fetch(`http://localhost:4000/thesis/${thesisId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.editedThesis),
        })
        .then(() => {
            this.setState({ isEditing: false });
            this.refreshData();
        })
        .catch((err) => console.error(err));
    }

    handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this thesis?")) {
            const thesisId = window.location.pathname.split("/").pop();
            fetch(`http://localhost:4000/thesis/${thesisId}`, {
                method: 'DELETE',
            })
            .then(() => {
                window.location.href = "/theses";
            })
            .catch((err) => console.error(err));
        }
    }

    render() {
        const { thesis, isEditing, editedThesis } = this.state;

        return (
            <div>
                {thesis && thesis.map(thesis => {
                    const { id, course, title, mentor, comentor, host_institution_name, host_institution_description, proposer_name, proposer_email, proposer_phone, proposer_position, involved_areas, description, goals, innovative_aspects, work_plan, bibliography, candidate_profile, work_after_dissertation, conferences_and_scientific_journals, edition, observations, state } = thesis;
                    return (
                        <div key={id}>
                            <div key={id} className="single-thesis">
                                <div className="thesis-header">
                                    <div className="title">{isEditing ? <input type="text" name="title" value={editedThesis.title} onChange={this.handleInputChange} /> : title}</div>
                                    <div className="thesis-header-right">
                                        <div><strong>{isEditing ? <input type="text" name="course" value={editedThesis.course} onChange={this.handleInputChange} /> : course}</strong></div>
                                        <div><strong>Edition:</strong> {isEditing ? <input type="text" name="edition" value={editedThesis.edition} onChange={this.handleInputChange} /> : edition}</div>
                                        <div><strong>State:</strong> {isEditing ? <input type="text" name="state" value={editedThesis.state} onChange={this.handleInputChange} /> : state}</div>
                                    </div>
                                </div>
                                <div className="thesis-body">
                                    <div className="thesis-host-institution">
                                        <label className="thesis-subtitle">Host Institution</label>
                                        <div><strong>Name:</strong> {isEditing ? <input type="text" name="host_institution_name" value={editedThesis.host_institution_name} onChange={this.handleInputChange} /> : host_institution_name}</div>
                                        <div><strong>Description:</strong> {isEditing ? <textarea name="host_institution_description" value={editedThesis.host_institution_description} onChange={this.handleInputChange} /> : host_institution_description}</div>
                                    </div>
                                    <div className="thesis-mentors">
                                        <label className="thesis-subtitle">Mentors</label>
                                        <div><strong>Mentor:</strong> {isEditing ? <input type="text" name="mentor" value={editedThesis.mentor} onChange={this.handleInputChange} /> : mentor}</div>
                                        <div><strong>Co-Mentor:</strong> {isEditing ? <input type="text" name="comentor" value={editedThesis.comentor} onChange={this.handleInputChange} /> : comentor}</div>
                                    </div>
                                    <div className="thesis-proposer">
                                        <label className="thesis-subtitle">Proposer</label>
                                        <div><strong>Name:</strong> {isEditing ? <input type="text" name="proposer_name" value={editedThesis.proposer_name} onChange={this.handleInputChange} /> : proposer_name}</div>
                                        <div><strong>E-mail:</strong> {isEditing ? <input type="text" name="proposer_email" value={editedThesis.proposer_email} onChange={this.handleInputChange} /> : proposer_email}</div>
                                        <div><strong>Phone Number:</strong> {isEditing ? <input type="text" name="proposer_phone" value={editedThesis.proposer_phone} onChange={this.handleInputChange} /> : proposer_phone}</div>
                                        <div><strong>Position:</strong> {isEditing ? <textarea name="proposer_position" value={editedThesis.proposer_position} onChange={this.handleInputChange} /> : proposer_position}</div>
                                    </div>
                                    <div className="thesis-details">
                                        <label className="thesis-subtitle">Details</label>
                                        <div><strong>Description:</strong> {isEditing ? <textarea name="description" value={editedThesis.description} onChange={this.handleInputChange} /> : description}</div>
                                        <div><strong>Goals:</strong> {isEditing ? <textarea name="goals" value={editedThesis.goals} onChange={this.handleInputChange} /> : goals}</div>
                                        <div><strong>Work Plan:</strong> {isEditing ? <textarea name="work_plan" value={editedThesis.work_plan} onChange={this.handleInputChange} /> : work_plan}</div>
                                        <div><strong>Innovative Aspects:</strong> {isEditing ? <textarea name="innovative_aspects" value={editedThesis.innovative_aspects} onChange={this.handleInputChange} /> : innovative_aspects}</div>
                                        <div><strong>Involved Areas:</strong> {isEditing ? <input type="text" name="involved_areas" value={editedThesis.involved_areas} onChange={this.handleInputChange} /> : involved_areas}</div>
                                    </div>
                                    <div className="thesis-references">
                                        <label className="thesis-subtitle">References</label>
                                        <div><strong>Bibliography:</strong> {isEditing ? <textarea name="bibliography" value={editedThesis.bibliography} onChange={this.handleInputChange} /> : bibliography}</div>
                                        <div><strong>Conferences and Scientific Journals:</strong> {isEditing ? <textarea name="conferences_and_scientific_journals" value={editedThesis.conferences_and_scientific_journals} onChange={this.handleInputChange} /> : conferences_and_scientific_journals}</div>
                                    </div>
                                    <div className="thesis-additional">
                                        <label className="thesis-subtitle">Candidate</label>
                                        <div><strong>Candidate Profile:</strong> {isEditing ? <textarea name="candidate_profile" value={editedThesis.candidate_profile} onChange={this.handleInputChange} /> : candidate_profile}</div>
                                        <div><strong>Possibility of Work After the Dissertation:</strong> {isEditing ? <textarea name="work_after_dissertation" value={editedThesis.work_after_dissertation} onChange={this.handleInputChange} /> : work_after_dissertation}</div>
                                    </div>
                                    <div className="thesis-observations">
                                        <label className="thesis-subtitle">Observations</label>
                                        <div>{isEditing ? <textarea name="observations" value={editedThesis.observations} onChange={this.handleInputChange} /> : observations}</div>
                                    </div>
                                </div>
                                {isEditing && 
                                    <div id="buttons">
                                        <button onClick={this.handleSubmit}>Save</button>
                                        <button onClick={this.toggleEdit}>Cancel</button>
                                    </div>
                                }
                            </div>
                            {!isEditing && 
                                <div id="buttons2">
                                    <button id="editButton" onClick={this.toggleEdit}>Edit Thesis</button>
                                    <button id="deleteButton" onClick={this.handleDelete}>Delete Thesis</button>
                                </div>
                            }
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Thesis;
