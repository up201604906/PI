import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../../../styles/Home.css";
import "../../../styles/Create.css";
import "../../../styles/Articles.css";

const MyArticles = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [noArticlesFound, setNoArticlesFound] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchArticles(id);
        } else {
            console.error('User ID not provided.');
            setIsLoading(false);
        }

        const noArticlesTimeout = setTimeout(() => {
            if (articles.length === 0 && !isLoading) {
                setNoArticlesFound(true);
            }
        }, 5000);

        return () => {
            // Cleanup timeout if the component is unmounted
            clearTimeout(noArticlesTimeout);
        }
    }, [id]);

    const fetchArticles = async (userId) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:4000/getArticles/${userId}`);
            const data = await response.json();
            if (data.length === 0) {
                setNoArticlesFound(true);
            } else {
                setArticles(data);
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            setNoArticlesFound(true);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="loading-container">Loading articles...</div>;
    }
    if (noArticlesFound) {
        return (
            <div className="article-management">
                <div className="title">My Articles</div>
                <div>No articles found.</div>
                <Link to="/createArticle" className="btn btn-primary">Create New Article</Link>
            </div>
        );
    }

    return (
        <div className="article-management">
            <div className="title">My Articles</div>
            <div className="articles-list">
                {articles.map((article, index) => (
                    <div key={index} className="article-card">
                        <h3>{article.title}</h3>
                        <h4>Published by: {article.publisher}</h4>
                        <p>Type: {article.type}, Year: {article.year}</p>
                        <p>Volume: {article.volume}, Issue: {article.number}, Pages: {article.pages}</p>
                        <p>Organization: {article.organization}</p>
                        <p>Keywords: {article.keywords}</p>
                        <Link to={`/articles/${article.id}`} className="btn btn-primary">Read More</Link>
                    </div>
                ))}
            </div>
            <Link to="/createArticle" className="btn btn-primary">Create New Article</Link>
        </div>
    );
};

export default MyArticles;
