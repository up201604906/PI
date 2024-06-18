import React, {useContext, useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom';
import '../../../styles/Topnav.css';
import logo from '../../../images/digi2_orange.svg';
import {AuthContext, useAuth} from "../../../contexts/AuthContext";
import gatito from "../../../images/default.png";

export default function Topnav() {
    const {currentUser} = useAuth();
    const {logout} = useContext(AuthContext);
    const [user, setUser] = useState({name: '', email: '', permission: '', picture: ''});

    const dashLinksData = [
        {text: "Dashboard", href: "/dashboard"},
        {text: "Theses", href: "/theses"},
        {text: "My Projects", href: "/my-projects/" + user.id},
        {text: "My Articles", href: "/myArticles/" + user.id},
    ]

    const socials = [
        {href: "https://www.instagram.com/digi2.lab/", class: "bi-instagram"},
        {href: "https://www.linkedin.com/company/digi2-digital-and-intelligent-industry-lab/", class: "bi-linkedin"},
        {href: "https://github.com/DIGI2-FEUP", class: "bi-github"}
    ]


    const inventoryDropdownData = [
        {text: "Resources", href: "/inventory/resources"},
        {text: "PC Allocation", href: "/inventory/pcallocation"},
        {text: "Licenses", href: "/inventory/licenses"},
        {text: "Wishlist", href: "/inventory/wishlist"},
    ]

    const userDropdownData = [
        {text: "My Profile", href: "/user/" + user.id, permission: "user"},
        {text: "User Management", href: "/user-mgmt", permission: "admin"},
        {text: "Logout", onClick: () => logout(), permission: "user"},
    ];

    useEffect(() => {
        getUserData(currentUser);
    }, [currentUser]);


    function Logo() {
        return (
            <div className={"d-flex align-items-center"}>
                <img id="logo" src={logo} alt="logo" className="logo-img"/>
                <div className="ms-2">DIGI<span>2</span> Lab</div>
            </div>
        )
    }

    function getUserData(userId) {
        fetch(`http://localhost:4000/user/${userId}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(err => console.error("Error fetching user:", err));
    }

    function get_links() {
        return (
            <>
                {dashLinksData.map((item, index) => (
                    <li key={index} className={"fw-bold me-4 me-lg-0 ms-0 ms-lg-4 mb-1"}>
                        <Link to={item.href} className={"text-decoration-none fw-bold"}>
                            {item.text}
                        </Link>

                    </li>
                ))}
            </>
        );
    }

    function get_inventory() {
        return (
            <li className={"me-5 ms-lg-4 mb-1"}>
                <div className="dropdown">
                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false" className={"fw-bold p-0"}>
                        Inventory
                    </button>
                    <ul className="dropdown-menu float-start">
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
            <li className={"mb-1"}>
                <div id="user" className={"d-flex flex-column dropdown"}>
                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false"
                            className={"d-flex flex-row mb-3 p-0"}>
                        <img className={"rounded-circle me-2 my-auto"} src={gatito} alt={"user"}/>
                        <div className={"d-flex flex-column my-auto"}>
                            <b>{user.name}</b>
                        </div>
                    </button>
                    <ul className={"dropdown-menu dropdown-menu-end"}>
                        {userDropdownData.map((item, index) => (
                            <li key={index}>
                                {
                                    item.permission === "admin" && user.permission === "admin" &&
                                    item.onClick ?
                                        <button onClick={item.onClick}
                                                className="dropdown-item w-100">{item.text}</button> :
                                        <Link to={item.href} className="dropdown-item">{item.text}</Link>
                                }

                            </li>
                        ))}
                    </ul>
                </div>
            </li>
        );
    }

    function get_socials() {
        return (
            <div className={"d-flex col-12 col-lg-auto mb-1 me-3"}>
                {socials.map((item, index) => (
                    <div className="my-auto ms-lg-3 ms-0 me-lg-0 me-5">
                        <Link to={item.href}>
                            <button className="p-0">
                                <i className={`bi w-100 h2 m-0 btn btn-primary ${item.class}`}></i>
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        );
    }


    function dashboard() {
        return (
            <Navbar className="bg-body-tertiary p-0">
                <Container className={"p-0"}>
                    <Navbar.Collapse id="basic-navbar-nav" className={"d-flex flex-wrap"}>
                        {get_socials()}
                        {get_links()}
                        {get_inventory()}
                        {get_user()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container className={"justify-content-around"}>
                <div className={"d-flex flex-wrap w-100 justify-content-around"}>
                    <Navbar.Brand href="/" sticky="top" className={"me-auto"}><Logo/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className={"justify-content-end w-100"}>
                            {currentUser && dashboard()}
                            {/*{filteredLinksData.map((item, index) => (*/}
                            {/*    <Nav.Link key={index} href={item.href} className={"col-1"}>{item.text}</Nav.Link>*/}
                            {/*))}*/}
                        </Nav>

                    </Navbar.Collapse>
                    {/*<Navbar.Collapse id="basic-navbar-nav" className={"w-100"}>*/}
                    {/*    <Nav className={"justify-content-end w-100"}>*/}
                    {/*        {currentUser && dashboard()}*/}
                    {/*    </Nav>*/}
                    {/*</Navbar.Collapse>*/}
                </div>
            </Container>
        </Navbar>
    );
}
