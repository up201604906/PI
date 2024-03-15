import React from 'react';
import { Link } from 'react-router-dom';

class Sidenav extends React.Component{

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

                <div id={"logo"}>Digi2 Lab</div>
                <div id={"links"}>
                    <ul>
                        {this.linksData.map((item, index) => (
                            <li key={index} className="">
                                <Link to={item.href}>{item.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id={"buttons"}>
                    <ul>
                        {this.buttons.map((item, index) => (
                            <li key={index} className="">
                                <button>
                                    <Link to={item.href}>{item.text}</Link>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id={"user"} className={"d-flex flex-column"}>
                    <div className={"d-flex flex-row mb-3"}>
                        <img className={"w-25 rounded-circle me-2"} src={"https://picsum.photos/200"} alt={"user"}/>
                        <div className={"d-flex flex-column my-auto"}>
                            <b>Username</b>
                            <p>username@gmail.com</p>
                        </div>
                    </div>
                    <div className={"d-flex flex-row"}>
                        <button><Link to={"/logout"}>Logout</Link></button>
                    </div>
                </div>

            </navbar>
        );
    }
}


export default Sidenav