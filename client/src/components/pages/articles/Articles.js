import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../../styles/Home.css";
import "../../../styles/Create.css";
import "../../../styles/Articles.css";

const Articles = () => {
    const [articles, setArticles] = useState([]);
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

    if (isLoading) {
        return <div className="loading-container">Loading articles...</div>;
    }

    if (error) {
        return <div className="error-container">Error: {error}</div>;
    }

    return (
        <div className="article-management">
            <div className="title">Articles</div>
            {articles.length === 0 ? (
                <div>No articles found.</div>
            ) : (
                <div className="articles-list">
                    {articles.map(article => (
                        <div key={article.id} className="article-card">
                            <h3>{article.title}</h3>
                            <p>Publisher: {article.publisher}</p>
                            <p>Type: {article.type}, Year: {article.year}</p>
                            <p>Volume: {article.volume}, Issue: {article.number}, Pages: {article.pages}</p>
                            <p>Keywords: {article.keywords}</p>
                            <Link to={`/articles/${article.id}`} className="btn btn-primary">Read More</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Articles;
