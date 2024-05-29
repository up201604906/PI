import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import "../../../styles/Home.css";
import "../../../styles/Theses.css";

class MyArticles extends Component {
    state = {
        articles: [],
        searchTerm: '',
        typeFilter: '',
        yearFilter: '',
        authorFilter: '',
        keywordFilter: '',
        publisherFilter: '',
        organizationFilter: ''
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

    handleAuthorFilterChange = (event) => {
        this.setState({ authorFilter: event.target.value });
    }

    handleKeywordFilterChange = (event) => {
        this.setState({ keywordFilter: event.target.value });
    }

    handlePublisherFilterChange = (event) => {
        this.setState({ publisherFilter: event.target.value });
    }

    handleOrganizationFilterChange = (event) => {
        this.setState({ organizationFilter: event.target.value });
    }

    exportFilteredArticles = () => {
        const { articles, searchTerm, typeFilter, yearFilter, authorFilter, keywordFilter, publisherFilter, organizationFilter } = this.state;
        const filteredArticles = articles
            .filter(article => {
                const { title, journal, booktitle, publisher, abstract, keywords, authors, organization } = article;
                const fieldsToSearch = [title, journal, booktitle, publisher, abstract, keywords, authors.join(' '), organization];
                return fieldsToSearch.some(field => field ? field.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false);
            })
            .filter(article => typeFilter === '' || article.type === typeFilter)
            .filter(article => yearFilter === '' || article.year === parseInt(yearFilter))
            .filter(article => authorFilter === '' || article.authors.some(author => author.toLowerCase().includes(authorFilter.toLowerCase())))
            .filter(article => keywordFilter === '' || (article.keywords && article.keywords.toLowerCase().includes(keywordFilter.toLowerCase())))
            .filter(article => publisherFilter === '' || (article.publisher && article.publisher.toLowerCase().includes(publisherFilter.toLowerCase())))
            .filter(article => organizationFilter === '' || (article.organization && article.organization.toLowerCase().includes(organizationFilter.toLowerCase())));

        const bibtexEntries = filteredArticles.map(article => {
            const fields = {
                title: article.title,
                author: article.authors.join(' and '),
                editor: article.editors.join(' and '),
                journal: article.journal,
                year: article.year,
                volume: article.volume,
                number: article.number,
                pages: article.pages,
                month: article.month,
                note: article.note,
                key: article.key,
                doi: article.doi,
                url: article.url,
                isbn: article.isbn,
                abstract: article.abstract,
                keywords: article.keywords,
                series: article.series,
                booktitle: article.booktitle,
                publisher: article.publisher,
                address: article.address,
                organization: article.organization,
                howpublished: article.howpublished
            };

            const fieldStrings = Object.entries(fields)
                .filter(([key, value]) => value !== null && value !== undefined)
                .map(([key, value]) => `${key}={${value}}`);

            return `@article{${article.id},\n  ${fieldStrings.join(',\n  ')}\n}`;
        }).join('\n\n');

        const blob = new Blob([bibtexEntries], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'filtered_articles.bib');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }

    render() {
        const { currentUser } = this.props;
        const { articles, searchTerm, typeFilter, yearFilter, authorFilter, keywordFilter, publisherFilter, organizationFilter } = this.state;

        const types = [...new Set(articles.map(article => article.type))].filter(type => type && type !== '');
        const years = [...new Set(articles.map(article => article.year))].filter(year => year && year !== '');
        const authors = [...new Set(articles.flatMap(article => article.authors))].filter(author => author && author !== '');
        const keywords = [...new Set(articles.flatMap(article => article.keywords ? article.keywords.split(', ') : []))].filter(keyword => keyword && keyword !== '');
        const publishers = [...new Set(articles.map(article => article.publisher))].filter(publisher => publisher && publisher !== '');
        const organizations = [...new Set(articles.map(article => article.organization))].filter(organization => organization && organization !== '');

        const sortedArticles = [...articles].sort((a, b) => b.id - a.id);
        const filteredArticles = sortedArticles.filter(article => {
            const { title, journal, booktitle, publisher, abstract, keywords, authors, organization } = article;
            const fieldsToSearch = [title, journal, booktitle, publisher, abstract, keywords, authors.join(' '), organization];
            return fieldsToSearch.some(field => field ? field.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false);
        }).filter(
            article => typeFilter === '' || article.type === typeFilter
        ).filter(
            article => yearFilter === '' || article.year === parseInt(yearFilter)
        ).filter(
            article => authorFilter === '' || article.authors.some(author => author.toLowerCase().includes(authorFilter.toLowerCase()))
        ).filter(
            article => keywordFilter === '' || (article.keywords && article.keywords.toLowerCase().includes(keywordFilter.toLowerCase()))
        ).filter(
            article => publisherFilter === '' || (article.publisher && article.publisher.toLowerCase().includes(publisherFilter.toLowerCase()))
        ).filter(
            article => organizationFilter === '' || (article.organization && article.organization.toLowerCase().includes(organizationFilter.toLowerCase()))
        );

        const myArticles = filteredArticles.filter(article => article.user_id === currentUser.id);
        const allArticles = filteredArticles.filter(article => article.user_id !== currentUser.id);

        return (
            <div className={"d-flex flex-column"}>
                <div className={"title"}><span>A</span>rticles</div>
                <div id={"search_filters"}>
                    <input type="text" placeholder={'\uD83D\uDD0E\uFE0E Search...'} value={searchTerm} onChange={this.handleSearch} />
                    <label>Filter:</label>
                    <select value={typeFilter} onChange={this.handleTypeFilterChange}>
                        <option value="">All Types</option>
                        {types.map((type, index) => <option key={index} value={type}>{type}</option>)}
                    </select>
                    <select value={yearFilter} onChange={this.handleYearFilterChange}>
                        <option value="">All Years</option>
                        {years.map((year, index) => <option key={index} value={year}>{year}</option>)}
                    </select>
                    <select value={authorFilter} onChange={this.handleAuthorFilterChange}>
                        <option value="">All Authors</option>
                        {authors.map((author, index) => <option key={index} value={author}>{author}</option>)}
                    </select>
                    <select value={keywordFilter} onChange={this.handleKeywordFilterChange}>
                        <option value="">All Keywords</option>
                        {keywords.map((keyword, index) => <option key={index} value={keyword}>{keyword}</option>)}
                    </select>
                    <select value={publisherFilter} onChange={this.handlePublisherFilterChange}>
                        <option value="">All Publishers</option>
                        {publishers.map((publisher, index) => <option key={index} value={publisher}>{publisher}</option>)}
                    </select>
                    <select value={organizationFilter} onChange={this.handleOrganizationFilterChange}>
                        <option value="">All Organizations</option>
                        {organizations.map((organization, index) => <option key={index} value={organization}>{organization}</option>)}
                    </select>
                    <Link to="/createArticle" className="create-article">
                        <button>Create New Article</button>
                    </Link>
                </div>
                <div>
                <h2>My Articles</h2>
                {myArticles.length > 0 ? (
                    myArticles.map((article) => {
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
                    })
                ) : (
                    <p>No articles found.</p>
                )}
            </div>
            <div>
                <h2>All Articles</h2>
                {allArticles.length > 0 ? (
                    allArticles.map((article) => {
                        const { id, title, year, journal, booktitle, publisher, abstract, type } = article;
                        return (
                            <Link className="thesis-link" to={`/article/${id}`} key={id}>
                                <div className="thesis" key={id}>
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
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <p>No articles found.</p>
                )}
            </div>
            <div className="floating-buttons-container">
                <Link to="/createArticle" className="floating-button">Create New Article</Link>
                <Link to="/importArticle" className="floating-button">Import Article</Link>
                <button onClick={this.exportFilteredArticles} className="floating-button">Export Articles</button>
            </div>
        </div>
    );
    }
}

const MyArticlesWithAuth = () => {
    const { currentUser } = useAuth();
    return <MyArticles currentUser={currentUser} />;
};

export default MyArticlesWithAuth;
