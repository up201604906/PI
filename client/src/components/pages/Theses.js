import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import "../../styles/Theses.css";

class Theses extends React.Component {
    state = {
        theses: [],
        searchTerm: '',
        courseFilter: '',
        stateFilter: '',
        editionFilter: ''
    };

    callAPI() {
        fetch("http://localhost:4000/theses")
          .then((res) => res.json())
          .then((theses) => this.setState({ theses }))
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

    handleCourseFilterChange = (event) => {
        this.setState({ courseFilter: event.target.value });
    }

    handleStateFilterChange = (event) => {
        this.setState({ stateFilter: event.target.value });
    }

    handleEditionFilterChange = (event) => {
        this.setState({ editionFilter: event.target.value });
    }

    render() {
        const courses = [...new Set(this.state.theses.map(thesis => thesis.course))].filter(course => course && course !== '');
        const states = [...new Set(this.state.theses.map(thesis => thesis.state))].filter(state => state && state !== '');
        const editions = [...new Set(this.state.theses.map(thesis => thesis.edition))].filter(edition => edition && edition !== '');
       
        const sortedTheses = [...this.state.theses].sort((a, b) => b.id - a.id);
        const filteredTheses = sortedTheses.filter(thesis => {
            const { id, title, mentor, comentor, proposer_name, host_institution_name, description, involved_areas } = thesis;
            const fieldsToSearch = [id, title, mentor, comentor, proposer_name, host_institution_name, description, involved_areas];
            return fieldsToSearch.some(field => field ? field.toString().toLowerCase().includes(this.state.searchTerm.toLowerCase()) : false);
        }).filter(
            thesis => this.state.courseFilter === '' || thesis.course === this.state.courseFilter
        ).filter(
            thesis => this.state.stateFilter === '' || thesis.state === this.state.stateFilter
        ).filter(
            thesis => this.state.editionFilter === '' || thesis.edition === this.state.editionFilter
        );

        return (
            <div className={"d-flex flex-column"}>
                <div className={"title"}><span>T</span>heses <span>P</span>roposals</div>
                <div id={"search_filters"}>
                    <input type="text" placeholder={'\uD83D\uDD0E\uFE0E Search...'} value={this.state.searchTerm} onChange={this.handleSearch} />
                    <label>Filter:</label>
                    <select value={this.state.courseFilter} onChange={this.handleCourseFilterChange}>
                        <option value="">All Courses</option>
                        {courses.map((course, index) => <option key={index} value={course}>{course}</option>)}
                    </select>
                    <select value={this.state.stateFilter} onChange={this.handleStateFilterChange}>
                        <option value="">All States</option>
                        {states.map((state, index) => <option key={index} value={state}>{state}</option>)}
                    </select>
                    <select value={this.state.editionFilter} onChange={this.handleEditionFilterChange}>
                        <option value="">All Editions</option>
                        {editions.map((edition, index) => <option key={index} value={edition}>{edition}</option>)}
                    </select>
                    <Link to="/createThesis" className="create-thesis">
                        <button>Create New Thesis</button>
                    </Link>
                </div>
                <div>
                    {filteredTheses.map((thesis) => {
                        const { id, course, title, host_institution_name, description, involved_areas, edition, state } = thesis;
                        return (
                            <div className="thesis" key={id}>
                                <Link className="thesis-link" to={`/thesis/${id}`} key={id}>    
                                    <div className="line" id="line1">
                                        <div className="title">{title}</div>
                                        <div id="state">
                                            <div className="item"><strong>Edition:</strong> {edition}</div>
                                            <div className="item"><strong>State:</strong> {state}</div>
                                        </div>
                                    </div>
                                    <div className="description">{description}</div>
                                    <div className="line" id="line2">
                                        <div className="item"><strong>Course:</strong> {course}</div>
                                        <div className="item"><strong>Host Institution:</strong> {host_institution_name}</div>
                                    </div>
                                    <div className="item"><strong>Involved Areas:</strong> {involved_areas}</div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Theses;