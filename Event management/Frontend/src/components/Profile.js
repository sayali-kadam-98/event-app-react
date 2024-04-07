import React, { Component } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
//import {Button, Card, Table,Image} from 'react-bootstrap'
import Navbar from './Navibar'
import axios from 'axios'
//import event1 from './event1.jpg'
import background from "../bg2.jpg";

export default class Profile extends Component {
    constructor(props) {
        super();
        this.state = {
            user_id:"",
            userData:[]
        }
    }
    componentDidMount(){
        var data = localStorage.getItem('userData');
        var jsondata = JSON.parse(data);
        let user_id=jsondata[0].user_id
        this.setState({user_id:user_id})
        axios.post('users/list',{user_id}) 
            .then(response =>{
                if(response && response.data){
                    this.setState({userData: response.data.data});
                    console.log(response.data.data)
                }
            });
    }
    render() {
        return (
            <div style={{
                backgroundRepeat: "no-repeat", backgroundPosition: 'center',
                backgroundSize: 'cover', backgroundImage: `url(${background})`, position: "fixed",
                top: 0, left: 0, width: '100vw',height: '100vh'
            }}> 
                <Navbar />
                <h1 style={{ color: 'whitesmoke' }}>Profile</h1>
                <center>
                {this.state.userData.map((userDetail, index)=>{
                    return<Card style={{width:"50%"}}>
                    <Card.Body>
                        <Table borderless>
                            <tbody>
                                <tr>
                                    <td><h4>Name:</h4></td>
                                    <td><h5>{userDetail.name}</h5></td>
                                </tr>
                                <tr>
                                <td><h4>Email:</h4></td>
                                    <td><h5>{userDetail.email}</h5></td>
                                </tr>
                                <tr>
                                <td><h4>Contact:</h4></td>
                                    <td><h5>{userDetail.contact}</h5></td>
                                </tr>
                                {/* <tr>
                                    <td colSpan="2"><Button>Update</Button></td>
                                </tr> */}
                            </tbody>
                        </Table>                        
                    </Card.Body>
                </Card>
                })} 
                </center>
            </div>
        )
    }
}
