import React from 'react';
import {Link} from 'react-router-dom';
import feup_logo from '../../../images/feup-logo.png'
import digi_logo from "../../../images/digi2_orange.svg";
import logo from "../../../images/digi2_orange.svg";


const Footer = () => {

    const socials = [
        {href: "https://www.instagram.com/digi2.lab/", class: "bi-instagram"},
        {href: "https://www.linkedin.com/company/digi2-digital-and-intelligent-industry-lab/", class: "bi-linkedin"},
        {href: "https://github.com/DIGI2-FEUP", class: "bi-github"}
    ]

    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
                <p className="col-md-4 mb-0 text-body-secondary">© 2024 Digi2 Lab. All rights reserved.</p>

                <ul className="nav col-md-8 justify-content-end">
                    {socials.map((item, index) => (
                        <li className="nav-item me-3">
                            <div className={"my-auto"}>
                                <Link to={item.href} key={index}>
                                    <button className={"p-0"}>
                                        <i className={"bi h2 m-0 btn btn-primary " + item.class}></i>
                                    </button>
                                </Link>
                            </div>
                        </li>
                    ))}
                    <li className="nav-item mx-3">
                        <p>
                            <Link to="https://sigarra.up.pt/feup">
                                <button className={"d-flex flex-row ms-auto"}>
                                    <img src={feup_logo} alt={"logo"} className={"ms-auto"}></img>
                                </button>
                            </Link>
                        </p>
                    </li>
                </ul>
            </footer>
        </div>
    );
}

export default Footer;