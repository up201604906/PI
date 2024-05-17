import React, { useState } from 'react';
import bibtexParse from 'bibtex-parse-js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import "../../../styles/ImportPage.css";

const BibTeXImportPage = () => {
    const [bibtexInput, setBibtexInput] = useState('');
    const [doiInput, setDoiInput] = useState('');
    const [parsedData, setParsedData] = useState(null);
    const [additionalData, setAdditionalData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCurrentUserOwner, setIsCurrentUserOwner] = useState(false); // State to track if current user is the author
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const result = bibtexParse.toJSON(reader.result);
            const entryTags = result[0]?.entryTags || {};
            setParsedData(entryTags);
            setIsEditing(true);
        };
        reader.readAsText(file);
    };

    const handleDoiSubmit = async () => {
        try {
            const response = await fetch(`https://api.crossref.org/works/${doiInput}`);
            const data = await response.json();
            const entryTags = parseApiResponse(data.message);
            setParsedData(entryTags);
            setAdditionalData(data.message);
            setIsEditing(true);
        } catch (error) {
            console.error('Error fetching DOI data:', error);
        }
    };

    const parseApiResponse = (message) => {
        const authors = message.author.map(a => `${a.given} ${a.family}`).join(', ');
        const year = message['published-print'] ? message['published-print']['date-parts'][0][0] : message['published-online']['date-parts'][0][0];
        return {
            title: message.title[0],
            author: authors,
            year: year,
            type: message.type,
            doi: message.DOI,
            publisher: message.publisher,
            url: message.URL,
            journal: message['container-title'] ? message['container-title'][0] : '',
            volume: message.volume || '',
            number: message.issue || '',
            pages: message.page || '',
            keywords: message.subject ? message.subject.join(', ') : '',
        };
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setParsedData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        const articleData = {
            ...parsedData,
            authors: parsedData.author ? parsedData.author.split(',').map(a => a.trim()) : []
        };

        if (isCurrentUserOwner && currentUser) {
            articleData.userId = currentUser;
        }

        try {
            const response = await fetch('http://localhost:4000/articles/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(articleData)
            });
            if (response.ok) {
                navigate('/myArticles/' + currentUser);
            } else {
                console.error('Error creating article');
            }
        } catch (error) {
            console.error('Error submitting article:', error);
        }
    };

    return (
        <div className="import-page">
            <div className="modal-content">
                <h2>Import Article</h2>
                {!isEditing && (
                    <>
                        <div className="input-group">
                            <label htmlFor="bibtex-file">Upload BibTeX File:</label>
                            <input type="file" id="bibtex-file" accept=".bib" onChange={handleFileUpload} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="doi-input">Enter DOI:</label>
                            <input
                                type="text"
                                id="doi-input"
                                value={doiInput}
                                onChange={(e) => setDoiInput(e.target.value)}
                                placeholder="Enter DOI"
                            />
                            <button onClick={handleDoiSubmit} className="btn">Fetch DOI</button>
                        </div>
                    </>
                )}
                {isEditing && parsedData && (
                    <div className="edit-section">
                        <div className="form-grid">
                            <div className="main-data">
                                <h3>Edit Article Information</h3>
                                {[
                                    'title', 'author', 'type', 'year', 'publisher', 'doi', 'url', 'tags', 'journal',
                                    'booktitle', 'address', 'pages', 'volume', 'number', 'series', 'month', 'note',
                                    'isbn', 'howpublished', 'organization', 'reference', 'abstract', 'keywords', 'cite'
                                ].map((key) => (
                                    <div className="input-group" key={key}>
                                        <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                                        <input
                                            type="text"
                                            id={key}
                                            name={key}
                                            value={parsedData[key] || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                ))}
                                <div className="input-group">
                                    <label>
                                        Are you the author?
                                        <input
                                            type="checkbox"
                                            name="isCurrentUserOwner"
                                            checked={isCurrentUserOwner}
                                            onChange={() => setIsCurrentUserOwner(!isCurrentUserOwner)}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="additional-data">
                                <h3>Additional Retrieved Data</h3>
                                {additionalData && Object.keys(additionalData).filter(key => ![
                                    'title', 'author', 'type', 'year', 'publisher', 'doi', 'url'
                                ].includes(key)).map((key) => (
                                    <div className="input-group" key={key}>
                                        <label htmlFor={key}>{key}:</label>
                                        <input
                                            type="text"
                                            id={key}
                                            name={key}
                                            value={JSON.stringify(additionalData[key])}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button onClick={handleSubmit} className="btn">Submit Article</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BibTeXImportPage;
