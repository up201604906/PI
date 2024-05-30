import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../../styles/Home.css";
import "../../../styles/Create.css";
import "../../../styles/Theses.css"; // Use the same CSS files as MyArticles

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [keywordFilter, setKeywordFilter] = useState('');
    const [publisherFilter, setPublisherFilter] = useState('');
    const [organizationFilter, setOrganizationFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/articles')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setArticles(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleTypeFilterChange = (event) => {
        setTypeFilter(event.target.value);
    };

    const handleYearFilterChange = (event) => {
        setYearFilter(event.target.value);
    };

    const handleAuthorFilterChange = (event) => {
        setAuthorFilter(event.target.value);
    };

    const handleKeywordFilterChange = (event) => {
        setKeywordFilter(event.target.value);
    };

    const handlePublisherFilterChange = (event) => {
        setPublisherFilter(event.target.value);
    };

    const handleOrganizationFilterChange = (event) => {
        setOrganizationFilter(event.target.value);
    };

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

    if (isLoading) {
        return <div className="loading-container">Loading articles...</div>;
    }

    if (error) {
        return <div className="error-container">Error: {error}</div>;
    }

    return (
        <div className={"d-flex flex-column"}>
            <div className={"title"}><span>A</span>rticles</div>
            <div id={"search_filters"} style={{ marginTop: '-30px' }}>
                <input type="text" placeholder={'\uD83D\uDD0E\uFE0E Search...'} value={searchTerm} onChange={handleSearch} />
                <label>Filter:</label>
                <select value={typeFilter} onChange={handleTypeFilterChange}>
                    <option value="">All Types</option>
                    {[...new Set(articles.map(article => article.type))].map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
                <select value={yearFilter} onChange={handleYearFilterChange}>
                    <option value="">All Years</option>
                    {[...new Set(articles.map(article => article.year))].map((year, index) => (
                        <option key={index} value={year}>{year}</option>
                    ))}
                </select>
                <select value={authorFilter} onChange={handleAuthorFilterChange}>
                    <option value="">All Authors</option>
                    {[...new Set(articles.flatMap(article => article.authors))].map((author, index) => (
                        <option key={index} value={author}>{author}</option>
                    ))}
                </select>
                <select value={keywordFilter} onChange={handleKeywordFilterChange}>
                    <option value="">All Keywords</option>
                    {[...new Set(articles.flatMap(article => article.keywords ? article.keywords.split(', ') : []))].map((keyword, index) => (
                        <option key={index} value={keyword}>{keyword}</option>
                    ))}
                </select>
                <select value={publisherFilter} onChange={handlePublisherFilterChange}>
                    <option value="">All Publishers</option>
                    {[...new Set(articles.map(article => article.publisher))].map((publisher, index) => (
                        <option key={index} value={publisher}>{publisher}</option>
                    ))}
                </select>
                <select value={organizationFilter} onChange={handleOrganizationFilterChange}>
                    <option value="">All Organizations</option>
                    {[...new Set(articles.map(article => article.organization))].map((organization, index) => (
                        <option key={index} value={organization}>{organization}</option>
                    ))}
                </select>
            </div>
            {filteredArticles.length === 0 ? (
                <div>No articles found.</div>
            ) : (
                <div>
                    {filteredArticles.map((article) => {
                        const { id, title, year, journal, booktitle, publisher, abstract, type } = article;
                        return (
                            <Link className="thesis-link" to={`/articles/${id}`} key={id}>
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
                    })}
                </div>
            )}
        </div>
    );
};

export default Articles;
