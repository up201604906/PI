import React from "react";
import "../../styles/Home.css";
import "../../styles/Theses.css";

class CreateThesis extends React.Component {
    state = {
        thesis: {
            course: "",
            title: "",
            mentor: "",
            comentor: "",
            host_institution_name: "",
            host_institution_description: "",
            proposer_name: "",
            proposer_email: "",
            proposer_phone: "",
            proposer_position: "",
            involved_areas: [],
            description: "",
            goals: "",
            innovative_aspects: "",
            work_plan: "",
            bibliography: "",
            candidate_profile: "",
            work_after_dissertation: "",
            conferences_and_scientific_journals: "",
            edition: "",
            observations: "",
            state: "Proposed"
        },
        involvedAreasOptions: [],
        editions: []
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "involved_areas") {
            this.setState(prevState => ({
                thesis: {
                    ...prevState.thesis,
                    [name]: value.split(", ")
                }
            }));
        } else {
            this.setState(prevState => ({
                thesis: {
                    ...prevState.thesis,
                    [name]: value
                }
            }));
        }

        // If the course changes, update the involved areas options
        if (name === "course") {
            let involvedAreasOptions = [];
            switch (value) {
                case "MEEC":
                    involvedAreasOptions = ["AUTOMATION", "ENERGY", "TELE"];
                    break;
                case "MEIC":
                    involvedAreasOptions = ["COMPUTER ARCHITECTURES AND SYSTEMS", "COMPUTER GRAPHICS AND INTERACTIVE DIGITAL MEDIA", "INFORMATION SYSTEMS", "INTELLIGENT SYSTEMS", "PROGRAMMING SCIENCE AND TECHNOLOGY", "SOFTWARE ENGINEERING"];
                    break;
                case "MESW":
                    involvedAreasOptions = ["DATA ANALYSIS IN SOFTWARE ENGINEERING", "SOFTWARE UNDERSTANDING AND EVOLUTION", "SOFTWARE REQUIREMENTS ENGINEERING", "SOFTWARE ENGINEERING", "SECURITY IN SOFTWARE ENGINEERING", "SOFTWARE TESTING"];
                    break;
                // Add cases for MM and MECD when you know the options
                default:
                    involvedAreasOptions = [];
            }
            this.setState({ involvedAreasOptions });
        }
    }

    handleInvolvedAreasChange = (event) => {
        const { value } = event.target;
        this.setState(prevState => {
            const { involved_areas } = prevState.thesis;
            if (involved_areas.includes(value)) {
                return {
                    thesis: {
                        ...prevState.thesis,
                        involved_areas: involved_areas.filter(area => area !== value)
                    }
                };
            } else {
                return {
                    thesis: {
                        ...prevState.thesis,
                        involved_areas: [...involved_areas, value]
                    }
                };
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // Create a copy of the thesis state
        const thesis = { ...this.state.thesis };

        // Convert involved_areas array to a comma-separated string
        thesis.involved_areas = thesis.involved_areas.join(", ");

        fetch("http://localhost:4000/createThesis", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(thesis),
        })
        .then(() => {
            window.location.href = "/theses";
        })
        .catch((err) => console.error(err));
    }

    componentDidMount() {
        // Fetch all existing theses from the server
        fetch('http://localhost:4000/theses')
            .then(res => res.json())
            .then(allTheses => {
                // Get the editions from the theses
                const thesisEditions = allTheses.flatMap(thesis => thesis.edition);

                // Store the filtered theses and the editions in the state
                this.setState({ editions: [...new Set(thesisEditions)] });
            })
            .catch(err => console.error(err));
    }

    render() {
        const { thesis, involvedAreasOptions } = this.state;

        return (
            <div className="single-thesis">
                <form onSubmit={this.handleSubmit}>
                    <div className="thesis-header">
                        <div className="title"><input type="text" name="title" value={thesis.title} onChange={this.handleInputChange} required/></div>
                        <div className="thesis-header-right">
                            <div><strong>Course * :</strong>
                                <select name="course" value={thesis.course} onChange={this.handleInputChange} required>
                                    <option value="">Select a course</option>
                                    <option value="MEIC">MEIC</option>
                                    <option value="MEEC">MEEC</option>
                                    <option value="MM">MM</option>
                                    <option value="MESW">MESW</option>
                                    <option value="MECD">MECD</option>
                                </select>
                            </div>
                            <div><strong>Edition: </strong> 
                                <input list="editions" name="edition" value={this.state.thesis.edition} onChange={this.handleInputChange} />
                                <datalist id="editions">
                                    {this.state.editions.map((option, index) => (
                                        <option key={index} value={option} />
                                    ))}
                                </datalist>
                            </div>
                            <div><strong>State:</strong> 
                                <select name="state" value={thesis.state} onChange={this.handleInputChange} required>
                                    <option value="Proposed">Proposed</option>
                                    <option value="Written">Written</option>
                                    <option value="Submitted">Submitted</option>
                                    <option value="Assigned">Assigned</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="thesis-body">
                        <div className="thesis-host-institution">
                            <label className="thesis-subtitle">Host Institution</label>
                            <div><strong>Name:</strong> <input type="text" name="host_institution_name" value={thesis.host_institution_name} onChange={this.handleInputChange} /></div>
                            <div><strong>Description:</strong> <textarea name="host_institution_description" value={thesis.host_institution_description} onChange={this.handleInputChange} /></div>
                        </div>
                        <div className="thesis-mentors">
                            <label className="thesis-subtitle">Mentors</label>
                            <div><strong>Mentor * :</strong> <input type="text" name="mentor" value={thesis.mentor} onChange={this.handleInputChange} required /></div>
                            <div><strong>Co-Mentor:</strong> <input type="text" name="comentor" value={thesis.comentor} onChange={this.handleInputChange} /></div>
                        </div>
                        <div className="thesis-proposer">
                            <label className="thesis-subtitle">Proposer</label>
                            <div><strong>Name * :</strong> <input type="text" name="proposer_name" value={thesis.proposer_name} onChange={this.handleInputChange} required /></div>
                            <div><strong>E-mail:</strong> <input type="text" name="proposer_email" value={thesis.proposer_email} onChange={this.handleInputChange} /></div>
                            <div><strong>Phone Number:</strong> <input type="text" name="proposer_phone" value={thesis.proposer_phone} onChange={this.handleInputChange} /></div>
                            <div><strong>Position:</strong> <textarea name="proposer_position" value={thesis.proposer_position} onChange={this.handleInputChange} /></div>
                        </div>
                        <div className="thesis-details">
                            <label className="thesis-subtitle">Details</label>
                            <div><strong>Description * :</strong> <textarea name="description" value={thesis.description} onChange={this.handleInputChange} required /></div>
                            <div><strong>Goals:</strong> <textarea name="goals" value={thesis.goals} onChange={this.handleInputChange} /></div>
                            <div><strong>Work Plan:</strong> <textarea name="work_plan" value={thesis.work_plan} onChange={this.handleInputChange} /></div>
                            <div><strong>Innovative Aspects:</strong> <textarea name="innovative_aspects" value={thesis.innovative_aspects} onChange={this.handleInputChange} /></div>
                            <div><strong>Involved Areas:</strong>
                                {thesis.course ? (
                                    <>
                                        <textarea name="involved_areas" value={thesis.involved_areas.join(", ")} onChange={this.handleInputChange} disabled />
                                        {involvedAreasOptions.map((option, index) => (
                                            <div key={index}>
                                                <input type="checkbox" id={option} value={option} checked={thesis.involved_areas.includes(option)} onChange={this.handleInvolvedAreasChange} />
                                                <label htmlFor={option}>{option}</label>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <p>Please select a course to choose the involved areas.</p>
                                )}
                            </div>
                        </div>
                        <div className="thesis-references">
                            <label className="thesis-subtitle">References</label>
                            <div><strong>Bibliography:</strong> <textarea name="bibliography" value={thesis.bibliography} onChange={this.handleInputChange} /></div>
                            <div><strong>Conferences and Scientific Journals:</strong> <textarea name="conferences_and_scientific_journals" value={thesis.conferences_and_scientific_journals} onChange={this.handleInputChange} /></div>
                        </div>
                        <div className="thesis-additional">
                            <label className="thesis-subtitle">Candidate</label>
                            <div><strong>Candidate Profile:</strong> <textarea name="candidate_profile" value={thesis.candidate_profile} onChange={this.handleInputChange} /></div>
                            <div><strong>Possibility of Work After the Dissertation:</strong> <textarea name="work_after_dissertation" value={thesis.work_after_dissertation} onChange={this.handleInputChange} /></div>
                        </div>
                        <div className="thesis-observations">
                            <label className="thesis-subtitle">Observations</label>
                            <div><textarea name="observations" value={thesis.observations} onChange={this.handleInputChange} /></div>
                        </div>
                    </div>
                    <div id="buttons">
                        <button type="submit">Create Thesis</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateThesis;