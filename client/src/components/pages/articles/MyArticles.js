import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../../../styles/Home.css";
import "../../../styles/Create.css";
import "../../../styles/Articles.css";
import "../../../styles/Projects.css";
import BibTeXImportModal from './BibTeXImportPage'; // Import the new component

const MyArticles = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [noArticlesFound, setNoArticlesFound] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false); // State to control the modal
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
            clearTimeout(noArticlesTimeout);
        };
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

    const formatAuthors = (authors) => {
        if (Array.isArray(authors)) {
            return authors.join(', ');
        } else if (typeof authors === 'string') {
            return authors;
        } else if (typeof authors === 'object' && authors !== null) {
            return Object.values(authors).join(', ');
        }
        return 'Unknown Author';
    };

    if (isLoading) {
        return <div className="loading-container">Loading articles...</div>;
    }

    if (noArticlesFound) {
        return (
            <div className="article-management">
                <div className="title">My Articles</div>
                <div>No articles found.</div>
                <div className="floating-buttons-container">
                    <Link to="/createArticle" className="floating-button">Create New Article</Link>
                    <Link to="/importArticle" className="floating-button">Import Article</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="article-management">
            <div className="title">My Articles</div>
            <div className="articles-list">
                {articles.map((article, index) => (
                    <Link key={index} to={`/articles/${article.id}`} className="article-card-link">
                        <div className="article-card">
                            <h3>{article.title}</h3>
                            <h4>Authors: {formatAuthors(article.authors)}</h4>
                            <p>Year: {article.year}, Type: {article.type}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="floating-buttons-container">
                <Link to="/createArticle" className="floating-button">Create New Article</Link>
                <Link to="/importArticle" className="floating-button">Import Article</Link>
            </div>
        </div>
    );
};

export default MyArticles;
