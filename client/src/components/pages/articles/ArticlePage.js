import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../../../styles/Articles.css";

const ArticlePage = () => {
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:4000/articles/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch the article');
                }
                return response.json();
            })
            .then(data => {
                setArticle(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error loading the article:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!article) {
        return <div>No article found.</div>;
    }

    return (
        <div className="article-page">
            <h1>{article.title}</h1>
            <div className="metadata">
                <span>Published by: {article.publisher}</span> |
                <span> Year: {article.year}</span> |
                <span> Type: {article.type}</span>
            </div>
            <div className="details">
                <p><strong>Volume:</strong> {article.volume}</p>
                <p><strong>Issue:</strong> {article.number}</p>
                <p><strong>Pages:</strong> {article.pages}</p>
                <p><strong>Keywords:</strong> {article.keywords}</p>
                <p><strong>Abstract:</strong> {article.abstract}</p>
                <p><strong>References:</strong> {article.reference}</p>
                <p><strong>Citation:</strong> {article.cite}</p>
            </div>
            <Link to="/articles" className="btn">Back to Articles</Link>
        </div>
    );
};

export default ArticlePage;
