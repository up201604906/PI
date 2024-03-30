import React from 'react';
import {Link} from 'react-router-dom';
import '../../../styles/Topnav.css'

import gatito from '../../../images/default.png'
import logo from '../../../images/digi2_orange.svg'


class Topnav extends React.Component {

    state = {
        showInventoryDropdown: false,
        showUserDropdown: false,
    };

    linksData = [
        {text: "My Projects", href: "/myProjects"},  //seeing all projects could be wrong
        {text: "Articles", href: "/articles"},  //this page should have an option to see only my articles
        {text: "Events", href: "/events"},
        {text: "Inventory"}

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

    // Move buttons to their specific pages
    /*
    buttons = [
        {text: "New User", href: "/newuser"},
        {text: "New Project", href: "/newproject"},
    ]*/

    toggleInventoryDropdown = () => {
        this.setState(prevState => ({ showInventoryDropdown: !prevState.showInventoryDropdown }));
    };

    toggleUserDropdown = () => {
        this.setState(prevState => ({ showUserDropdown: !prevState.showUserDropdown }));
    }

    render() {
        return (
            <navbar className={"top-bar d-flex justify-content-between align-items-center"}>

                <div id={"logo"}>
                    <Link to="/">
                        <button className={"d-flex flex-row"}>
                            <img src={logo} alt={"logo"}></img>
                            <div className={"mb-0 mt-auto ms-2"}>Digi<span>2</span> Lab</div>
                        </button>
                    </Link>
                </div>
                <div className={"d-flex align-items-center"}>
                    <div id="links">
                        <ul>
                            {this.linksData.map((item, index) => (
                            <li key={index} className={"my-3"}>
                                <Link to={item.href} onClick={item.text === "Inventory" ? this.toggleInventoryDropdown : null}>
                                {item.text}
                                </Link>
                                {item.text === "Inventory" && (
                                <ul className={this.state.showInventoryDropdown ? "dropdown-content" : ""}>
                                    {this.inventoryDropdownData.map((dropdownItem, dropdownIndex) => (
                                        <li key={dropdownIndex}>
                                        <Link to={dropdownItem.href} onClick={this.toggleInventoryDropdown}>
                                            {dropdownItem.text}
                                        </Link>
                                        </li>
                                    ))}
                                </ul>
                                )}
                            </li>
                            ))}
                        </ul>
                    </div>
                
                    {/* <div id={"buttons"}>
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
                    </div> */}

                    <div id="user" className={"d-flex flex-column"} onClick={this.toggleUserDropdown}>
                        <button className={"d-flex flex-row mb-3"}>
                            <img className={"rounded-circle me-2 my-auto"} src={gatito} alt={"user"}/>
                            <div className={"d-flex flex-column my-auto"}>
                                <b>John Doe</b>
                            </div>
                        </button>
                        {this.state.showUserDropdown && (
                            <ul className={this.state.showUserDropdown ? "dropdown-content" : ""}>
                                {this.userDropdownData.map((item, index) => (
                                    <li key={index}>
                                        <Link to={item.href}>{item.text}</Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </navbar>
        );
    }
}


export default Topnav