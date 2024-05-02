import React from 'react';
import { Link } from 'react-router-dom';
import "../../../styles/Home.css";
import "../../../styles/Create.css";

class MyArticles extends React.Component {
    state = {
        articles: [],
        isLoading: true,
        noArticlesFound: false,
    };

    componentDidMount() {
        this.fetchArticles();
        // Set a timeout to check if no articles are found
        this.noArticlesTimeout = setTimeout(() => {
            if (this.state.articles.length === 0 && !this.state.isLoading) {
                this.setState({ noArticlesFound: true });
            }
        }, 5000); // waits 5 seconds before deciding no articles are available
    }

    componentWillUnmount() {
        clearTimeout(this.noArticlesTimeout); // Clean up the timeout on component unmount
    }

    fetchArticles = () => {
        fetch('http://localhost:4000/getArticles/2') // temporary
            .then(response => response.json())
            .then(data => this.setState({ articles: data, isLoading: false }))
            .catch(error => {
                console.error('Error fetching articles:', error);
                this.setState({ isLoading: false });
            });
    }

    render() {
        const { articles, isLoading, noArticlesFound } = this.state;
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
                        <div key={index} className="article-item">
                            <h3>{article.title}</h3>
                            <p>{article.summary}</p>
                            <Link to={`/articles/${article.id}`}>Read More</Link>
                        </div>
                    )) : (
                        <div>No articles found.</div>
                    )}
                </div>
                <Link to="/createArticle" className="btn btn-primary">Create New Article</Link>
            </div>
        );
    }
}

export default MyArticles;
