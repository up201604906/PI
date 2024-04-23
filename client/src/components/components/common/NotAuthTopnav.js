import React from 'react';
import {Link} from 'react-router-dom';
import '../../../styles/Topnav.css'

import logo from '../../../images/digi2_orange.svg'


class NotAuthTopnav extends React.Component {

    linksData = [
        {text: "Projects", href: "/myProjects"},  //from this page, you should be able to see your team + all projects
        {text: "Articles", href: "/myArticles"},  //this page should have an option to see all articles
        {text: "Events", href: "/events"},
        {text: "Login", href: "/login"}

        // Make these into a bottom bar or remove them and keep it only on the base website
        // {text: "Social", href: "/social"},
        // {text: "Communication", href: "/Communication"},
    ]


    get_logo() {
        return (
            <Link to="/" className={"navbar-brand"}>
                <button className={"d-flex flex-row"}>
                    <img src={logo} alt={"logo"}></img>
                    <div className={"my-auto ms-2"}>Digi<span>2</span> Lab</div>
                </button>
            </Link>
        )
    }

    get_links() {
        return (
            <>
                {this.linksData.map((item, index) => (
                    <li key={index} className={"nav-item fw-bold"}>
                        <Link to={item.href} className={"text-decoration-none fw-bold me-3"}>
                            {item.text}
                        </Link>

                    </li>
                ))}
            </>
        );
    }


    get_items() {
        return (
            <div className={"d-flex align-items-center me-0"}>
                <ul className={"navbar-nav"}>
                    <div className={"d-flex me-5"}>
                        {this.get_links()}
                    </div>
                </ul>
            </div>
        );
    }

    render() {

        return (
            <nav id={"topnav"} className={"navbar navbar-expand-lg top-bar"}>
                <div className={"container-fluid"}>
                    {this.get_logo()}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div id={"navbarText"}  className={"collapse navbar-collapse"}>
                        {this.get_items()}
                    </div>

                </div>
            </nav>
        );
    }
}


export default NotAuthTopnav