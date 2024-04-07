import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Modal, Table,} from 'react-bootstrap'
import axios from 'axios';
import background from "../bg2.jpg";
//import { useHistory } from 'react-router-dom';
//import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
//import Signup from './Signup';
//import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';

export default class Connect extends Component {
    constructor(props) {
        super();

        this.state = {
            email:"",
            password: "",
            alertMessage:"",
            showAlert:false,
        }
    }
    setEmail = (email) =>{
        this.setState({ email: email})
    }
    setPassword = (pass)=>{
        this.setState({ password: pass})
    }
    handleSuccessModal = () =>{
        this.setState({showAlert:!this.state.showAlert})
    }
    render() {
        return (
            //check for material UI
            <div style={{ backgroundRepeat: "no-repeat",backgroundPosition: 'center',
            backgroundSize: 'cover', backgroundImage: `url(${background})`,position:"fixed", 
            top:0, left: 0, width:"100%", height:"100%"}}>
                <center>
                    <div className="Login">
                        <Form className="Sign_up">
                            <h1>Login</h1>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" onChange={e => this.setEmail(e.target.value)} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" onChange={e => this.setPassword(e.target.value)} placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={this.validate}>
                                Login
                            </Button>
                            <Form.Text> 
                                Not a Member? <a href="/signup">Signup</a>
                            </Form.Text>
                        </Form>
                    <Modal show={this.state.showAlert}>
                        <Modal.Header>Login</Modal.Header>
                        <Modal.Body>
                            <Table borderless responsive>
                                <tbody className="LeftAlign">
                                    <tr>
                                        <td className="Padding-none">{this.state.alertMessage}</td>
                                    </tr>
                                    <tr>
                                        <td className="Padding-none">
                                            <Button onClick={() => { this.handleSuccessModal() }}>OK</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Modal.Body>
                    </Modal>
                    </div>
                </center>
            </div>
        )
    }
    validate = (event) =>{
        event.preventDefault();
        //console.log(this.state)
        axios.post('/users/login',{"email":this.state.email, "password":this.state.password}) 
        .then(response =>{
                //console.log(response.data.status)
                console.log(response.data.results)
                if(response.data.status === 200){
                    localStorage.setItem('userData', JSON.stringify(response.data.results));
                    this.props.history.push('/MyEvents')
                }
                else{
                    // alert("Invalid credientials! please try again")
                    this.setState({alertMessage:"Invalid credientials! please try again",showAlert:true})
                    this.props.history.push('/Login')
                }
        });
        var data = localStorage.getItem('userData');
        console.log(data)
    }
}
