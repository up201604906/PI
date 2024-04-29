import React, { useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import '../../../styles/Topnav.css'
import {AuthContext, useAuth} from '../../../contexts/AuthContext';
import gatito from '../../../images/default.png'
import logo from '../../../images/digi2_orange.svg'


function Topnav() {
    const { logout } = useContext(AuthContext);
    const [user, setUser] = useState({name: '', email: '', permission: '', picture: ''});
    const {currentUser} = useAuth();

    useEffect(() => {
        getUserData(currentUser);
    }, [currentUser]);

    const linksData = [
        {text: "My Projects", href: "/list-proj?userId=" + currentUser},  //from this page, you should be able to see your team + all projects
        {text: "My Articles", href: "/list-art?userId=" + currentUser},  //this page should have an option to see all articles
        {text: "Events", href: "/events"},

        // Make these into a bottom bar or remove them and keep it only on the base website
        // {text: "Social", href: "/social"},
        // {text: "Communication", href: "/Communication"},
    ]

    const inventoryDropdownData = [
        {text: "Resources", href: "/inventory/resources"},
        {text: "PC Allocation", href: "/inventory/pc-allocation"},
        {text: "Licenses", href: "/inventory/licenses"},
        {text: "Wishlist", href: "/inventory/wishlist"},
    ]

    const userDropdownData = [
        { text: "My Profile", href: "/user/" + user.id },
        { text: "Notifications", href: "/notifications" },
        { text: "Logout", onClick: () => logout() },
    ];

    function getUserData(userId) {
        console.log(userId);
        fetch(`http://localhost:4000/user/${userId}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(err => console.error("Error fetching user:", err));
    }

    function get_logo() {
        return (
            <Link to="/" className={"navbar-brand"}>
                <button className={"d-flex flex-row"}>
                    <img src={logo} alt={"logo"}></img>
                    <div className={"my-auto ms-2"}>Digi<span>2</span> Lab</div>
                </button>
            </Link>
        )
    }

    function get_links() {
        return (
            <>
                {linksData.map((item, index) => (
                    <li key={index} className={"nav-item fw-bold"}>
                        <Link to={item.href} className={"text-decoration-none fw-bold me-3"}>
                            {item.text}
                        </Link>

                    </li>
                ))}
            </>
        );
    }

    function get_inventory() {

        return (
            <li className={"nav-item"}>
                <div className="dropdown">
                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false" className={"fw-bold p-0"}>
                        Inventory
                    </button>
                    <ul className="dropdown-menu">
                        {inventoryDropdownData.map((item, index) => (
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

    function get_user() {
        return (
            <li className={"nav-item"}>
                <div id="user" className={"d-flex flex-column dropdown"}>
                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false"
                            className={"d-flex flex-row mb-3 p-0"}>
                        <img className={"rounded-circle me-2 my-auto"} src={gatito} alt={"user"}/>
                        <div className={"d-flex flex-column my-auto"}>
                            <b>{user.name}</b>
                        </div>
                    </button>
                    <ul className={"dropdown-menu"}>
                        {userDropdownData.map((item, index) => (
                            <li key={index}>
                                {item.onClick ?
                                    <button onClick={item.onClick} className="dropdown-item">{item.text}</button> :
                                    <Link to={item.href} className="dropdown-item">{item.text}</Link>
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            </li>
        );
    }

    function get_items() {
        return (
            <div className={"d-flex align-items-center me-0"}>
                <ul className={"navbar-nav"}>
                    <div className={"d-flex me-5"}>
                        {get_links()}
                        {get_inventory()}
                    </div>
                    {get_user()}
                </ul>
            </div>
        );
    }


    return (
        <nav id={"topnav"} className={"navbar navbar-expand-lg top-bar"}>
            <div className={"container-fluid"}>
                {get_logo()}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div id={"navbarText"} className={"collapse navbar-collapse"}>
                    {get_items()}
                </div>

            </div>
        </nav>
    );

}


export default Topnav;