import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../../../contexts/AuthContext'; // Import useAuth hook
import "../../../styles/Home.css";
import "../../../styles/Create.css";

class CreateArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            summary: '',
            tags: '',
            year: new Date().getFullYear(),
            type: '',
            publisher: '',
            pages: '',
            volume: '',
            number: '',
            organization: '',
            reference: '',
            keywords: '',
            cite: '',
            state: 'draft',
            userId : '',
            isCurrentUserOwner: false, // Checkbox state for user ownership
        };
    }

    handleChange = (event) => {
        const { name, type, checked, value } = event.target;
        this.setState({
            [name]: type === 'checkbox' ? checked : value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { isCurrentUserOwner, ...articleData } = this.state;
        const { currentUser } = this.props;
    
        if (isCurrentUserOwner) {
            articleData.userId = currentUser; // Attach current user's ID if they are marked as the owner
            articleData['userId'] = currentUser;
            console.log('Article data:', articleData);
        }
    
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
        return (
            <div className="create-article">
                <div className="title"><span>Create </span>Article</div>
                <form onSubmit={this.handleSubmit} className="">
                <Link to="/myArticles" className="go-back">←</Link>
                    <label>
                        Title:
                        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} required />
                    </label>
                    <label>
                        Summary:
                        <textarea name="summary" value={this.state.summary} onChange={this.handleChange} />
                    </label>
                    <label>
                        Content:
                        <textarea name="content" value={this.state.content} onChange={this.handleChange} required />
                    </label>
                    <label>
                        Tags:
                        <input type="text" name="tags" value={this.state.tags} onChange={this.handleChange} />
                    </label>
                    <label>
                        Year:
                        <input type="number" name="year" value={this.state.year} onChange={this.handleChange} required />
                    </label>
                    <label>
                        Type:
                        <input type="text" name="type" value={this.state.type} onChange={this.handleChange} required />
                    </label>
                    <label>
                        Publisher:
                        <input type="text" name="publisher" value={this.state.publisher} onChange={this.handleChange} required />
                    </label>
                    <label>
                        Pages:
                        <input type="number" name="pages" value={this.state.pages} onChange={this.handleChange} />
                    </label>
                    <label>
                        Volume:
                        <input type="number" name="volume" value={this.state.volume} onChange={this.handleChange} />
                    </label>
                    <label>
                        Number:
                        <input type="number" name="number" value={this.state.number} onChange={this.handleChange} />
                    </label>
                    <label>
                        Organization:
                        <input type="text" name="organization" value={this.state.organization} onChange={this.handleChange} />
                    </label>
                    <label>
                        Reference:
                        <input type="text" name="reference" value={this.state.reference} onChange={this.handleChange} />
                    </label>
                    <label>
                        Abstract:
                        <textarea name="abstract" value={this.state.abstract} onChange={this.handleChange} required />
                    </label>
                    <label>
                        Keywords:
                        <input type="text" name="keywords" value={this.state.keywords} onChange={this.handleChange} />
                    </label>
                    <label>
                        Cite:
                        <input type="text" name="cite" value={this.state.cite} onChange={this.handleChange} />
                    </label>
                    <label>
                        Are you the author ?
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
                    <button type="submit">Create Article</button>
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


