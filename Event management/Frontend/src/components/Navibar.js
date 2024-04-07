import React, { Component } from 'react'
import { Navbar, Nav, Form, FormControl, Button, Image } from 'react-bootstrap';
import event4 from './event4.jpg'
import './Components.css';
//import Button from 'react-bootstrap/Button';

export default class Navibar extends Component {
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand>
                        <Image src={event4} thumbnail/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="d-flex justify-content-between" style={{width:"100%"}}>
                            <ul className="navbar-nav">
                                <li>
                                <Nav.Link href="/MyEvents">My Events</Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link href="/Book">Bookings</Nav.Link>
                                </li>
                                <li>
                                <   Nav.Link href="/Explore">Explore</Nav.Link>
                                </li>
                            </ul>
                            {/* <center>
                                <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-success">Search</Button>
                                </Form>
                            </center> */}
                            
                            <ul className="navbar-nav">
                                <li>
                                <   Nav.Link href="/Profile">My Account</Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link href="/Logout">Log out</Nav.Link>
                                </li>
                            </ul>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
