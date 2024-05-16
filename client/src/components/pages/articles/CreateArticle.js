import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../../../contexts/AuthContext';
import "../../../styles/Home.css";
import "../../../styles/Create.css";

class CreateArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            tags: '',
            year: new Date().getFullYear(),
            type: '',
            journal: '',
            booktitle: '',
            publisher: '',
            address: '',
            pages: '',
            volume: '',
            number: '',
            series: '',
            month: '',
            note: '',
            url: '',
            doi: '',
            isbn: '',
            howpublished: '',
            organization: '',
            reference: '',
            abstract: '',
            keywords: '',
            cite: '',
            state: 'draft',
            userId: '',
            isCurrentUserOwner: false,
            authors: [''],
            editors: ['']
        };
    }

    handleChange = (event) => {
        const { name, type, checked, value } = event.target;
        this.setState({
            [name]: type === 'checkbox' ? checked : value
        });
    }

    handleArrayChange = (event, index, arrayName) => {
        const { value } = event.target;
        this.setState(prevState => {
            const updatedArray = [...prevState[arrayName]];
            updatedArray[index] = value;
            return { [arrayName]: updatedArray };
        });
    }

    addArrayField = (arrayName) => {
        this.setState(prevState => ({
            [arrayName]: [...prevState[arrayName], '']
        }));
    }

    removeArrayField = (index, arrayName) => {
        this.setState(prevState => {
            const updatedArray = [...prevState[arrayName]];
            updatedArray.splice(index, 1);
            return { [arrayName]: updatedArray };
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { isCurrentUserOwner, authors, editors, ...articleData } = this.state;
        const { currentUser } = this.props;

        if (isCurrentUserOwner) {
            articleData.userId = currentUser;
        }

        articleData.authors = authors.filter(author => author.trim() !== ''); // Remove empty entries
        articleData.editors = editors.filter(editor => editor.trim() !== '');

        fetch('http://localhost:4000/articles/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(articleData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Article created:', data);
            window.location.href = "/myArticles/" + currentUser; // Redirect after creation
        })
        .catch((err) => {
            console.error('Error creating article:', err);
            alert('Failed to create article.');
        });
    }

    render() {
        const { currentUser } = this.props;
        return (
            <div className="create-article">
                <div className="title"><span>Create </span>Article</div>
                <form onSubmit={this.handleSubmit} className="">
                    <Link to={`/myArticles/${currentUser}`} className="go-back">←</Link>
                    <label>
                        Title:
                        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} required placeholder="Enter the article title" />
                    </label>
                    <label>
                        Tags:
                        <input type="text" name="tags" value={this.state.tags} onChange={this.handleChange} placeholder="e.g., AI, Machine Learning" />
                    </label>
                    <label>
                        Year:
                        <input type="number" name="year" value={this.state.year} onChange={this.handleChange} required placeholder="e.g., 2024" />
                    </label>
                    <label>
                        Type:
                        <input type="text" name="type" value={this.state.type} onChange={this.handleChange} required placeholder="e.g., Journal, Conference" />
                    </label>
                    <label>
                        Journal:
                        <input type="text" name="journal" value={this.state.journal} onChange={this.handleChange} placeholder="e.g., Journal of Machine Learning" />
                    </label>
                    <label>
                        Book Title:
                        <input type="text" name="booktitle" value={this.state.booktitle} onChange={this.handleChange} placeholder="If applicable" />
                    </label>
                    <label>
                        Publisher:
                        <input type="text" name="publisher" value={this.state.publisher} onChange={this.handleChange} placeholder="e.g., Tech Publishers" />
                    </label>
                    <label>
                        Address:
                        <input type="text" name="address" value={this.state.address} onChange={this.handleChange} placeholder="e.g., 123 Main St" />
                    </label>
                    <label>
                        Pages:
                        <input type="text" name="pages" value={this.state.pages} onChange={this.handleChange} placeholder="e.g., 123-145" />
                    </label>
                    <label>
                        Volume:
                        <input type="number" name="volume" value={this.state.volume} onChange={this.handleChange} placeholder="e.g., 15" />
                    </label>
                    <label>
                        Number:
                        <input type="number" name="number" value={this.state.number} onChange={this.handleChange} placeholder="e.g., 1" />
                    </label>
                    <label>
                        Series:
                        <input type="text" name="series" value={this.state.series} onChange={this.handleChange} placeholder="If applicable" />
                    </label>
                    <label>
                        Month:
                        <input type="text" name="month" value={this.state.month} onChange={this.handleChange} placeholder="e.g., January" />
                    </label>
                    <label>
                        Note:
                        <textarea name="note" value={this.state.note} onChange={this.handleChange} placeholder="Any additional notes" />
                    </label>
                    <label>
                        URL:
                        <input type="url" name="url" value={this.state.url} onChange={this.handleChange} placeholder="e.g., http://example.com/article" />
                    </label>
                    <label>
                        DOI:
                        <input type="text" name="doi" value={this.state.doi} onChange={this.handleChange} placeholder="e.g., 10.1234/example.doi" />
                    </label>
                    <label>
                        ISBN:
                        <input type="text" name="isbn" value={this.state.isbn} onChange={this.handleChange} placeholder="If applicable" />
                    </label>
                    <label>
                        How Published:
                        <input type="text" name="howpublished" value={this.state.howpublished} onChange={this.handleChange} placeholder="If applicable" />
                    </label>
                    <label>
                        Organization:
                        <input type="text" name="organization" value={this.state.organization} onChange={this.handleChange} placeholder="e.g., ML Org" />
                    </label>
                    <label>
                        Reference:
                        <input type="text" name="reference" value={this.state.reference} onChange={this.handleChange} placeholder="Provide a reference if any" />
                    </label>
                    <label>
                        Abstract:
                        <textarea name="abstract" value={this.state.abstract} onChange={this.handleChange} placeholder="Provide an abstract" />
                    </label>
                    <label>
                        Keywords:
                        <input type="text" name="keywords" value={this.state.keywords} onChange={this.handleChange} placeholder="e.g., AI, Machine Learning" />
                    </label>
                    <label>
                        Cite:
                        <input type="text" name="cite" value={this.state.cite} onChange={this.handleChange} placeholder="e.g., citekey2024" />
                    </label>
                    <label>
                        Authors:
                        {this.state.authors.map((author, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name={`author-${index}`}
                                    value={author}
                                    onChange={(e) => this.handleArrayChange(e, index, 'authors')}
                                    required
                                    placeholder="e.g., John Doe"
                                />
                                <button type="button" onClick={() => this.removeArrayField(index, 'authors')}>Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => this.addArrayField('authors')}>Add Author</button>
                    </label>
                    <label>
                        Editors:
                        {this.state.editors.map((editor, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name={`editor-${index}`}
                                    value={editor}
                                    onChange={(e) => this.handleArrayChange(e, index, 'editors')}
                                    placeholder="e.g., Jane Smith"
                                />
                                <button type="button" onClick={() => this.removeArrayField(index, 'editors')}>Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => this.addArrayField('editors')}>Add Editor</button>
                    </label>
                    <label>
                        Are you the author?
                        <input
                            type="checkbox"
                            name="isCurrentUserOwner"
                            checked={this.state.isCurrentUserOwner}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        State:
                        <select name="state" value={this.state.state} onChange={this.handleChange}>
                            <option value="draft">Draft</option>
                            <option value="review">Review</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                    </label>
                    <button type="submit" className="btn btn-primary">Create Article</button>
                </form>
            </div>
        );
    }
}

// Higher-order component to inject currentUser from AuthContext
function withUser(Component) {
    return props => {
        const { currentUser } = useAuth(); // Use the useAuth hook
        return <Component {...props} currentUser={currentUser} />;
    };
}

export default withUser(CreateArticle); // Export the component wrapped with user context
