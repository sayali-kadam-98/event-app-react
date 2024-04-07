import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {Modal, Table,} from 'react-bootstrap';
import background from "../bg2.jpg";
//import Login from './Login';
//import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';


export default class Signup extends Component {
    constructor(props) {
        super();

        this.state = {
            name: "",
            email:"",
            contact: "",
            password:"",
            alertMessage:"",
            showAlert:false,
        }
    }
    
    setName = (name) =>{
        this.setState({ name: name})
    }
    setContact = (contact)=>{
        this.setState({ contact: contact})
    }
    setEmail = (email) =>{
        this.setState({ email: email})
    }
    setPassword = (password)=>{
        this.setState({ password: password})
    }
    validate = (event) =>{
        event.preventDefault();
        //console.log(this.state)
        axios.post('/users/new',{
            "name":this.state.name, 
            "email":this.state.email,
            "contact":this.state.contact, 
            "password":this.state.password}) 
        .then(response =>{
            console.log(response.data.status)
            if(response.data.status === 200){
                //localStorage.setItem('userreg', JSON.stringify(response));
                this.props.history.push('/login')
            }
            else{
                // alert(response.data.message)
                this.setState({alertMessage:response.data.message, showAlert:true})

            }
        });
        // var data = localStorage.getItem('userreg');
        // console.log(data)
    }
    handleSuccessModal = () =>{
        this.setState({showAlert:!this.state.showAlert})
    }
    
      render() {
        return (
            // <div style={{flex:1, height:'100%', backgroundRepeat: "no-repeat",backgroundPosition: 'center',
            // backgroundSize: 'cover', backgroundImage: `url(${background})`}}>
            <div style={{ backgroundRepeat: "no-repeat",backgroundPosition: 'center',
            backgroundSize: 'cover', backgroundImage: `url(${background})`,position:"fixed", 
            top:0, left: 0, width: '100vw',height: '100vh'}}>
                 <center>
                    <Form className="Sign_up">
                            <h1>Sign up</h1>
                            <Form.Group controlId="formBasicName">
                                <Form.Control type="text" placeholder="Enter Name" onChange={e => this.setName(e.target.value)}/>
                            </Form.Group>
                            
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter email" onChange={e => this.setEmail(e.target.value)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicCOntact">
                                <Form.Control type="text" placeholder="Enter Contact" onChange={e => this.setContact(e.target.value)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" onChange={e => this.setPassword(e.target.value)}/>
                            </Form.Group>
                            <Button variant="success" type="submit" onClick={this.validate}>
                                Register
                            </Button>
                            <Form.Text> 
                                Already a Member? <a href="/login">Login</a>
                            </Form.Text>
                        </Form>
                        <Modal show={this.state.showAlert}>
                    <Modal.Header>Events</Modal.Header>
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
                </center>
            </div> 
        );
      }
}
