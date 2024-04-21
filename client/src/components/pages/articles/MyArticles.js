import React from 'react';
import { Link } from 'react-router-dom';
import "../../../styles/Home.css";
import "../../../styles/Create.css";

class MyArticles extends React.Component {
    state = {
        articles: [],
        isLoading: true,
    };

    componentDidMount() {
        this.fetchArticles();
    }

    fetchArticles = () => {
        fetch('http://localhost:4000/articles/byUser/1') // temporary
            .then(response => response.json())
            .then(data => this.setState({ articles: data, isLoading: false }))
            .catch(error => console.error('Error fetching articles:', error));
    }

    render() {
        const { articles, isLoading } = this.state;
        if (isLoading) {
            return <div>Loading articles...</div>;
        }
        return (
            <div className="article-management">
                <div className="title"><span>My </span>Articles</div>
                <div className="articles-list">
                    {articles.map((article, index) => (
                        <div key={index} className="article-item">
                            <h3>{article.title}</h3>
                            <p>{article.summary}</p>  
                            <Link to={`/articles/${article.id}`}>Read More</Link>
                        </div>
                    ))}
                </div>
                <Link to="/createArticle" className="btn btn-primary">Create New Article</Link>
            </div>
        );
    }
}

export default MyArticles;
