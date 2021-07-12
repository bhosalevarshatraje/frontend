import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <FontAwesomeIcon icon={faBug}/> E-Bug Tracker
                </Link>
                <Nav className="mr-auto">
                    <Link to={""} className="nav-link"></Link>
                </Nav>
                
                <Nav >
                    
                    <Link to={"/"} className="nav-link">
                        <FontAwesomeIcon icon={faHome} size="lg" />Home
                    </Link>
                    
                </Nav>
                <Nav >
                    <Link to={"/login"} className="nav-link">
                    <FontAwesomeIcon icon={faSignOutAlt}/> Logout
                    </Link>

                </Nav>
    
            </Navbar>
        );
    }
}

