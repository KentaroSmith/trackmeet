import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import app from "../Firebase/firebase";
import { AuthContext } from "../Firebase/auth";

const NavigationBar = ({activePage}) => {
    const { currentUser } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    console.log(activePage);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">TrackMeet</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/" active={activePage === "home"}>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/calendar" active={activePage === "calendar"}>Calendar</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/search" active={activePage === "search"}>Search</NavLink>
                        </NavItem>
                        {!currentUser
                            ?
                            <NavItem>
                                <NavLink href="/login" active={activePage === "login"}>Login</NavLink>
                            </NavItem>
                            :
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    {currentUser.email}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem tag={Link} to="/reservations">
                                        Reservations
                                </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem href="/login" onClick={() => app.auth().signOut()}>
                                        Logout
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}


export default NavigationBar;
/* function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="\">Welcome to Trackmeet!</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link active" href="/">Home <span class="sr-only">(current)</span></a>
                    <a class="nav-item nav-link" href="/saved">Calendar</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar */