import React from 'react';
import {Link} from 'react-router-dom';
import '../../../styles/Sidenav.css'

import gatito from '../../../images/default.png'
import logo from '../../../images/digi2_orange.svg'


class Sidenav extends React.Component {

    linksData = [
        {text: "Home", href: "/"},
        {text: "My Projects", href: "/projects"},
        {text: "Inventory", href: "/inventory"},
        {text: "Social", href: "/social"},
        {text: "Communication", href: "/Communication"},
    ]

    buttons = [
        {text: "New User", href: "/newuser"},
        {text: "New Project", href: "/newproject"},
    ]

    render() {
        return (
            <navbar className={"position-fixed d-flex flex-column justify-content-between h-100"}>

                <div id={"logo"}>
                    <Link>
                        <button className={"d-flex flex-row"}>
                            <img src={logo} alt={"logo"}></img>
                            <div className={"mb-0 mt-auto ms-2"}>Digi<span>2</span> Lab</div>
                        </button>
                    </Link>
                </div>
                <div id={"links"}>
                    <ul>
                        {this.linksData.map((item, index) => (
                            <li key={index} className={"my-3"}>
                                <Link to={item.href}>{item.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id={"buttons"}>
                    <ul>
                        {this.buttons.map((item, index) => (
                            <li key={index} className={"my-3"}>
                                <Link to={item.href}>
                                    <button>
                                        {item.text}
                                    </button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id={"user"} className={"d-flex flex-column"}>
                    <Link to={"/user/1"}>
                        <button className={"d-flex flex-row mb-3"}>
                            <img className={"rounded-circle me-2 my-auto"} src={gatito} alt={"user"}/>
                            <div className={"d-flex flex-column my-auto"}>
                                <b>John Doe</b>
                                <p>johndoe@gmail.com</p>
                            </div>
                        </button>
                    </Link>

                    <div className={"d-flex flex-row"}>
                        <Link to={"/logout"}>
                            <button>Logout</button>
                        </Link>
                    </div>
                </div>

            </navbar>
        );
    }
}


export default Sidenav