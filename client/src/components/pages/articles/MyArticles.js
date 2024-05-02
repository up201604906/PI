import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../../../styles/Home.css";
import "../../../styles/Create.css";

const MyArticles = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [noArticlesFound, setNoArticlesFound] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        if (id ) {
            fetchArticles(id );
        } else {
            console.error('User ID not provided.');
            setIsLoading(false);
        }

        const noArticlesTimeout = setTimeout(() => {
            if (articles.length === 0 && !isLoading) {
                setNoArticlesFound(true);
            }
        }, 5000);

        return () => clearTimeout(noArticlesTimeout);
    }, [id , articles.length, isLoading]);

    const fetchArticles = async (userId) => {
        try {
            const response = await fetch(`http://localhost:4000/getArticles/${userId}`);
            const data = await response.json();
            setArticles(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching articles:', error);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading articles...</div>;
    }
    if (noArticlesFound) {
        return (
            <div className="article-management">
                <div className="title"><span>My </span>Articles</div>
                <div>No articles found.</div>
                <Link to="/createArticle" className="btn btn-primary">Create New Article</Link>
            </div>
        );
    }
    return (
        <div className="article-management">
            <div className="title"><span>My </span>Articles</div>
            <div className="articles-list">
                {articles.length > 0 ? articles.map((article, index) => (
                    <div key={index} className="article-item" style={{marginBottom: '20px'}}>
                        <h3>{article.title}</h3>
                        <h4>{article.publisher}</h4>
                        <Link to={`/articles/${article.id}`} className="btn btn-secondary">Read More</Link>
                    </div>
                )) : <div className="sub-title">No articles found.</div>}
            </div>
            <Link to="/createArticle" className="btn btn-primary">Create New Article</Link>
        </div>
    );
};

export default MyArticles;
