import React from 'react';
import {Link} from 'react-router-dom';
import '../../../styles/Topnav.css'

import gatito from '../../../images/default.png'
import logo from '../../../images/digi2_orange.svg'


class Topnav extends React.Component {

    linksData = [
        {text: "My Projects", href: "/projects"},  //seeing all projects could be wrong. From this page, you should be able to see your team
        {text: "Articles", href: "/articles"},  //this page should have an option to see only my articles
        {text: "Events", href: "/events"},

        // Make these into a bottom bar or remove them and keep it only on the base website
        // {text: "Social", href: "/social"},
        // {text: "Communication", href: "/Communication"},
    ]

    inventoryDropdownData = [
        {text: "Resources", href: "/inventory/resources"},
        {text: "PC Allocation", href: "/inventory/pc-allocation"},
        {text: "Licenses", href: "/inventory/licenses"},
        {text: "Wishlist", href: "/inventory/wishlist"},
    ]

    userDropdownData = [
        {text: "My Profile", href: "/user/1"},
        {text: "Notifications", href: "/notifications"},
        {text: "Logout", href: "/logout"},
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

    get_inventory() {
        return (
            <li className={"nav-item"}>
                <div className="dropdown">
                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false" className={"fw-bold p-0"}>
                        Inventory
                    </button>
                    <ul className="dropdown-menu">
                        {this.inventoryDropdownData.map((item, index) => (
                            <li key={index}>
                                <Link to={item.href} className={"dropdown-item"}>
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </li>
        );
    }

    get_user() {
        return (
            <li className={"nav-item"}>
                <div id="user" className={"d-flex flex-column dropdown"}>
                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false" className={"d-flex flex-row mb-3 p-0"}>
                        <img className={"rounded-circle me-2 my-auto"} src={gatito} alt={"user"}/>
                        <div className={"d-flex flex-column my-auto"}>
                            <b>John Doe</b>
                        </div>
                    </button>
                    <ul className={"dropdown-menu"}>
                        {this.userDropdownData.map((item, index) => (
                            <li key={index}>
                                <Link to={item.href} className={"dropdown-item"}>{item.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </li>
        );
    }

    get_items() {
        return (
            <div className={"d-flex align-items-center me-0"}>
                <ul className={"navbar-nav"}>
                    <div className={"d-flex me-5"}>
                        {this.get_links()}
                        {this.get_inventory()}
                    </div>
                    {this.get_user()}
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


export default Topnav