import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import "../../../styles/Home.css";
import "../../../styles/Theses.css";

class Articles extends Component {
    state = {
        articles: [],
        searchTerm: '',
        typeFilter: '',
        yearFilter: ''
    };

    callAPI() {
        fetch("http://localhost:4000/articles")
            .then((res) => res.json())
            .then((articles) => this.setState({ articles }))
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

    handleTypeFilterChange = (event) => {
        this.setState({ typeFilter: event.target.value });
    }

    handleYearFilterChange = (event) => {
        this.setState({ yearFilter: event.target.value });
    }

    render() {
        const { currentUser } = this.props;
        const types = [...new Set(this.state.articles.map(article => article.type))].filter(type => type && type !== '');
        const years = [...new Set(this.state.articles.map(article => article.year))].filter(year => year && year !== '');

        const sortedArticles = [...this.state.articles].sort((a, b) => b.id - a.id);
        const filteredArticles = sortedArticles.filter(article => {
            const { title, journal, booktitle, publisher, abstract, keywords } = article;
            const fieldsToSearch = [title, journal, booktitle, publisher, abstract, keywords];
            return fieldsToSearch.some(field => field ? field.toString().toLowerCase().includes(this.state.searchTerm.toLowerCase()) : false);
        }).filter(
            article => this.state.typeFilter === '' || article.type === this.state.typeFilter
        ).filter(
            article => this.state.yearFilter === '' || article.year === parseInt(this.state.yearFilter)
        );

        const myArticles = filteredArticles.filter(article => article.user_id === currentUser.id);
        const allArticles = filteredArticles.filter(article => article.user_id !== currentUser.id);

        return (
            <div className={"d-flex flex-column"}>
                <div className={"title"}><span>A</span>rticles</div>
                <div id={"search_filters"}>
                    <input type="text" placeholder={'\uD83D\uDD0E\uFE0E Search...'} value={this.state.searchTerm} onChange={this.handleSearch} />
                    <label>Filter:</label>
                    <select value={this.state.typeFilter} onChange={this.handleTypeFilterChange}>
                        <option value="">All Types</option>
                        {types.map((type, index) => <option key={index} value={type}>{type}</option>)}
                    </select>
                    <select value={this.state.yearFilter} onChange={this.handleYearFilterChange}>
                        <option value="">All Years</option>
                        {years.map((year, index) => <option key={index} value={year}>{year}</option>)}
                    </select>
                    <Link to="/createArticle" className="create-article">
                        <button>Create New Article</button>
                    </Link>
                </div>
                <div>
                    <h2>My Articles</h2>
                    {myArticles.map((article) => {
                        const { id, title, year, journal, booktitle, publisher, abstract, type } = article;
                        return (
                            <div className="thesis" key={id}>
                                <Link className="thesis-link" to={`/article/${id}`} key={id}>
                                    <div className="line" id="line1">
                                        <div className="title">{title}</div>
                                        <div id="state">
                                            <div className="item"><strong>Year:</strong> {year}</div>
                                            <div className="item"><strong>Type:</strong> {type}</div>
                                        </div>
                                    </div>
                                    <div className="description">{abstract}</div>
                                    <div className="line" id="line2">
                                        <div className="item"><strong>Journal/Booktitle:</strong> {journal || booktitle}</div>
                                        <div className="item"><strong>Publisher:</strong> {publisher}</div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <h2>All Articles</h2>
                    {allArticles.map((article) => {
                        const { id, title, year, journal, booktitle, publisher, abstract, type } = article;
                        return (
                            <div className="thesis" key={id}>
                                <Link className="thesis-link" to={`/article/${id}`} key={id}>
                                    <div className="line" id="line1">
                                        <div className="title">{title}</div>
                                        <div id="state">
                                            <div className="item"><strong>Year:</strong> {year}</div>
                                            <div className="item"><strong>Type:</strong> {type}</div>
                                        </div>
                                    </div>
                                    <div className="description">{abstract}</div>
                                    <div className="line" id="line2">
                                        <div className="item"><strong>Journal/Booktitle:</strong> {journal || booktitle}</div>
                                        <div className="item"><strong>Publisher:</strong> {publisher}</div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const ArticlesWithAuth = () => {
    const { currentUser } = useAuth();
    return <Articles currentUser={currentUser} />;
};

export default ArticlesWithAuth;
