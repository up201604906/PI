import React from 'react';
import {Link} from 'react-router-dom';
import feup_logo from '../../../images/feup-logo.png'
import digi_logo from "../../../images/digi2_orange.svg";
import logo from "../../../images/digi2_orange.svg";


const Footer = () => {
    return (
        <footer className={"d-flex flex-row"}>
            <Link to="https://sigarra.up.pt/feup" className={"w-25"}>
                <button className={"d-flex flex-row w-75"}>
                    <img src={feup_logo} alt={"logo"} className={"w-50"}></img>
                </button>
            </Link>
            <div className={"my-auto"}>© 2024 Digi2 Lab. All rights reserved.</div>
            <Link to="/" className={"navbar-brand"}>
                <button className={"d-flex flex-row"}>
                    <img src={logo} alt={"logo"}></img>
                    <div className={"my-auto ms-2"}>Digi<span>2</span> Lab</div>
                </button>
            </Link>
        </footer>
    );
}

export default Footer;