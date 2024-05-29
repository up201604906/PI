import React from 'react';
import {Link} from 'react-router-dom';
import '../../../styles/Topnav.css'

import DashboardTopnav from "./DashboardTopnav";

import logo from '../../../images/digi2_orange.svg'
import {useAuth} from "../../../contexts/AuthContext";


export default function Topnav (){

    const {currentUser} = useAuth();

    const linksData = [
        {text: "Projects", href: "/projects"},
        {text: "Articles", href: "/articles"},
        {text: "Events", href: "/events"},
        {text: "Login", href: "/login"}
    ];

    const filteredLinksData = currentUser ? linksData.filter(link => link.text !== "Login") : linksData;

    function get_logo() {
        return (
            <Link to="/" className={"navbar-brand"}>
                <button className={"d-flex flex-row py-0"}>
                    <img src={logo} alt={"logo"}></img>
                    <div className={"my-auto ms-2"}>Digi<span>2</span> Lab</div>
                </button>
            </Link>
        );
    }

    function get_links() {
        return (
            <>
                {filteredLinksData.map((item, index) => (
                    <li key={index} className={"nav-item fw-bold"}>
                        <Link to={item.href} className={"text-decoration-none fw-bold ms-5"}>
                            {item.text}
                        </Link>
                    </li>
                ))}
            </>
        );
    }

    function get_items() {
        return (
            <div className={"d-flex justify-content-end"}>
                <ul className={"navbar-nav"}>
                    <div className={"d-flex"}>
                        {get_links()}
                    </div>
                </ul>
            </div>
        );
    }

    function digi2Topnav(){
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

    return (
        <div id="topnav-container" className={"fixed-top"}>
            {digi2Topnav()}
            <DashboardTopnav/>
        </div>
    );
}
