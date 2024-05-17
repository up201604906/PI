import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Home.css";
import "../../styles/Theses.css";

class Thesis extends React.Component {
    state = {
        thesis: null,
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

    render() {
        const { thesis } = this.state;

        console.log("Thesis:", thesis);

        return (
            <div>
                {thesis && thesis.map(thesis => {
                    const { id, course, title, mentor, comentor, host_institution_name, host_institution_description, proposer_name, proposer_email, proposer_phone, proposer_position, involved_areas, description, goals, innovative_aspects, work_plan, bibliography, candidate_profile, work_after_dissertation, conferences_and_scientific_journals, observations, state } = thesis;
                    return (
                        <div key={id} className="single-thesis">
                            <div className="thesis-header">
                                <div className="title">{title}</div>
                                <div className="thesis-header-right">
                                    <div><strong>{course}</strong></div>
                                    <div><strong>State:</strong> {state}</div>
                                </div>
                            </div>
                            <div className="thesis-body">
                                <div className="thesis-host-institution">
                                    <label className="thesis-subtitle">Host Institution</label>
                                    <div><strong>Name:</strong> {host_institution_name}</div>
                                    <div><strong>Description:</strong> {host_institution_description}</div>
                                </div>
                                <div className="thesis-mentors">
                                    <label className="thesis-subtitle">Mentors</label>
                                    <div><strong>Mentor:</strong> {mentor}</div>
                                    <div><strong>Co-Mentor:</strong> {comentor}</div>
                                </div>
                                <div className="thesis-proposer">
                                    <label className="thesis-subtitle">Proposer</label>
                                    <div><strong>Name:</strong> {proposer_name}</div>
                                    <div><strong>E-mail:</strong> {proposer_email}</div>
                                    <div><strong>Phone Number:</strong> {proposer_phone}</div>
                                    <div><strong>Position:</strong> {proposer_position}</div>
                                </div>
                                <div className="thesis-details">
                                    <label className="thesis-subtitle">Details</label>
                                    <div><strong>Description:</strong> {description}</div>
                                    <div><strong>Goals:</strong> {goals}</div>
                                    <div><strong>Work Plan:</strong> {work_plan}</div>
                                    <div><strong>Innovative Aspects:</strong> {innovative_aspects}</div>
                                    <div><strong>Involved Areas:</strong> {involved_areas}</div>
                                </div>
                                <div className="thesis-references">
                                    <label className="thesis-subtitle">References</label>
                                    <div><strong>Bibliography:</strong> {bibliography}</div>
                                    <div><strong>Conferences and Scientific Journals:</strong> {conferences_and_scientific_journals}</div>
                                </div>
                                <div className="thesis-additional">
                                    <label className="thesis-subtitle">Candidate</label>
                                    <div><strong>Candidate Profile:</strong> {candidate_profile}</div>
                                    <div><strong>Possibility of Work After the Dissertation:</strong> {work_after_dissertation}</div>
                                </div>
                                <div className="thesis-observations">
                                    <label className="thesis-subtitle">Observations</label>
                                    <div>{observations}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Thesis;