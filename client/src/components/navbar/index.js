import React, { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from "../../actions";
import { Link, NavLink as RRNavLink } from 'react-router-dom';
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
import "./style.css";
import API from "../../utils/api";

const NavigationBar = ({ activePage }) => {
    const { currentUser } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const toggle = () => setIsOpen(!isOpen);


    useEffect(
        () => {
            // load user info into global state (Redux) if we haven't already
            if (!!currentUser) {
                getUserData(currentUser.email, (user) => {
                    dispatch(updateUser(user));
                });
            };
        },
        [currentUser]);

    const getUserData = (email, callback) => {
        //console.log("getting user for email: " + email);
        API.getUser(email)
            .then(res => {
                // now push the user data into global state
                callback(res.data[0]);
            })
            .catch(err => console.log(err));
    }


    return (
        <div>
            <Navbar className="navbar" color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/" className="trackmeet-logo">TrackMeet</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/calendar" activeClassName="chosen">Calendar</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/search" activeClassName="chosen">Search</NavLink>
                        </NavItem>
                        {!currentUser
                            ?
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/login" activeClassName="chosen">Login</NavLink>
                            </NavItem>
                            :
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    {currentUser.email}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem tag={Link} to="/profile">
                                        Profile
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/reservations">
                                        Reservations
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/rooms">
                                        Rooms
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