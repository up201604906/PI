import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../../../styles/Articles.css";

const ArticlePage = () => {
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();  // Using the useNavigate hook from react-router-dom

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

    const handleBack = () => {
        navigate(-1);  // Navigates back to the previous page in the history stack
    };

    const handleExport = () => {
        fetch(`http://localhost:4000/articles/${id}/export`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to export the article');
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${article.title}.bib`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch(error => {
                console.error('Error exporting the article:', error);
                setError(error.message);
            });
    };

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
                <p><strong>Journal:</strong> {article.journal}</p>
                <p><strong>Book Title:</strong> {article.booktitle}</p>
                <p><strong>Publisher:</strong> {article.publisher}</p>
                <p><strong>Address:</strong> {article.address}</p>
                <p><strong>Pages:</strong> {article.pages}</p>
                <p><strong>Volume:</strong> {article.volume}</p>
                <p><strong>Number:</strong> {article.number}</p>
                <p><strong>Series:</strong> {article.series}</p>
                <p><strong>Month:</strong> {article.month}</p>
                <p><strong>Note:</strong> {article.note}</p>
                <p><strong>URL:</strong> <a href={article.url} target="_blank" rel="noopener noreferrer">{article.url}</a></p>
                <p><strong>DOI:</strong> {article.doi}</p>
                <p><strong>ISBN:</strong> {article.isbn}</p>
                <p><strong>How Published:</strong> {article.howpublished}</p>
                <p><strong>Organization:</strong> {article.organization}</p>
                <p><strong>Abstract:</strong> {article.abstract}</p>
                <p><strong>Keywords:</strong> {article.keywords}</p>
                <p><strong>References:</strong> {article.reference}</p>
                <p><strong>Citation:</strong> {article.cite}</p>
                <p><strong>Authors:</strong> {article.authors}</p>
                <p><strong>Editors:</strong> {article.editors}</p>
            </div>
            <button onClick={handleBack} className="btn">Back</button>
            <button onClick={handleExport} className="btn">Export BibTeX</button>
        </div>
    );
};

export default ArticlePage;
