import React from 'react';
import {Link} from 'react-router-dom';
import feup_logo from '../../../images/feup-logo.jpg'


const Footer = () => {

    const socials = [
        {href: "https://www.instagram.com/digi2.lab/", class: "bi-instagram"},
        {href: "https://www.linkedin.com/company/digi2-digital-and-intelligent-industry-lab/", class: "bi-linkedin"},
        {href: "https://github.com/DIGI2-FEUP", class: "bi-github"}
    ]

    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 px-5 border-top bg-dark">

            <ul className="nav col-md-4">
                {socials.map((item, index) => (
                    <li key={index} className="nav-item me-3">
                        <div className="my-auto">
                            <Link to={item.href}>
                                <button className="p-0">
                                    <i className={`bi h2 w-100 m-0 ${item.class}`}></i>
                                </button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>

            <p className="col-md-4 mb-0 mx-auto text-light text-center">© 2024 <b>DIGI2 Lab</b>. All rights reserved.</p>

            <p className={"col-md-4"}>
                <Link to="https://sigarra.up.pt/feup" className={"bg-light"}>
                    <button className={"d-flex flex-row ms-auto"}>
                        <img src={feup_logo} alt={"logo"} className={"ms-auto"}></img>
                    </button>
                </Link>
            </p>
        </footer>
    );
}

export default Footer;