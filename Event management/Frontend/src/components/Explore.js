import React, { Component } from 'react'
import {Button,Modal,Form, Card, Table,Image} from 'react-bootstrap'
import Navbar from './Navibar'
import event1 from './event1.jpg'
import axios from 'axios'
import background from "../bg2.jpg";


export default class Explore extends Component {
    constructor(props) {
        super();
        this.state = {
            user_id:"",
            eventData:[],
            event_id:"",
            eventd:[],
            show:false,
            part:"",
            alertMessage:"",
            showAlert:false,
        }
    }
    componentDidMount(){
        var data = localStorage.getItem('userData');
        var jsondata = JSON.parse(data);
        let user_id=jsondata[0].user_id
        this.setState({user_id:user_id})
        axios.get('/event/list') 
            .then(response =>{
                if(response && response.data){
                    //console.log(response.data.results)
                    this.setState({eventData: response.data.results});
                    console.log(this.state.eventData)
                }
            });
    }
    handleEvent= (event) =>{
        event.preventDefault()
        // console.log("user",this.state.user_id)
        // console.log("event",this.state.event_id)
        // console.log("part",this.state.part)
        let book_time = new Date().toDateString().substring(4,20)
        console.log(book_time)
        var user=this.state.user_id
        var event_id=this.state.event_id
        var part = this.state.part

        axios.post('/booking/new',{ "event_id":event_id,"user_id":user,"participant":part,"book_time":book_time}) 
              .then(response =>{
                  if(response && response.data){
                     console.log(response)
                     if(response.data.status===200){
                        //  alert(response.data.message)
                        this.setState({alertMessage:response.data.message,showAlert:true,show:false})
                        // this.setState({show:false})
                     }
                     
                  }
              });
    }
    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })  
    }
    handleModal(eid){
        this.setState({show:!this.state.show})
        //console.log(eid)
        var event_id= eid;
        this.setState({event_id:eid})
        console.log(event_id)
        axios.post('/event/getlist',{event_id}) 
            .then(response =>{
                if(response && response.data){
                    console.log(response.data.results)
                    this.setState({eventd: response.data.results});
                }
            });
    }
    handleSuccessModal = () =>{
        this.setState({showAlert:!this.state.showAlert})
        axios.get('/event/list') 
            .then(response =>{
                if(response && response.data){
                    //console.log(response.data.results)
                    this.setState({eventData: response.data.results});
                    console.log(this.state.eventData)
                }
            });
    }
    render() {
        return (
            <div style={{
                backgroundRepeat: "no-repeat", backgroundPosition: 'center',
                backgroundSize: 'cover', backgroundImage: `url(${background})`,
                top: 0, left: 0, width: '100%',height: '100vh'
            }}>
                <Navbar />
                <h1 style={{ color: 'whitesmoke' }}>Explore</h1>
                <div className="SidePadding">
                {this.state.eventData.map((eventDetail, index)=>{
                    return <Card>
                    <Card.Body>
                        <div>
                            <Table borderless responsive>
                                <tbody className="LeftAlign">
                                    <tr>
                                        <td rowSpan="4" width="25%">
                                            <Image src={event1} thumbnail />
                                        </td>
                                        <td className="Padding-none">Name: {eventDetail.event_name}</td>
                                        <td className="Padding-none">Type: {eventDetail.cats_name}</td>
                                    </tr>
                                    <tr>
                                        <td className="Padding-none" colSpan="2">Venue: {eventDetail.venue}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="Padding-none">Avalibity: {eventDetail.availability}</td>
                                    </tr>
                                    <tr>
                                        <td className="Padding-none">Date: {(eventDetail.event_date).substring(0,10)}</td>
                                        <td className="Padding-none">Time: {eventDetail.event_time}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <Button variant="primary" onClick={() => this.handleModal(eventDetail.event_id)}>Book</Button>
                    </Card.Body>
                </Card>
                })}

                <Modal show={this.state.show}>
                    <Modal.Header>Book Event</Modal.Header>
                    <Modal.Body>
                        {this.state.eventd.map((event, index)=>{
                            return<Form>
                                <Form.Group>
                                    <Form.Control name="event_name" type="text" value={event.event_name} disabled/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control name="category" type="text" value={event.cats_name} disabled/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control name="venue" type="text" value={event.venue} disabled/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control name="event_date" type="text" value={(event.event_date).substring(0,10)} disabled/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control name="event_time" type="text" value={event.event_time} disabled/>
                                </Form.Group>
                                
                                <Form.Group>
                                    <Form.Control name="part" as="select" onChange={e => this.onChange(e)} required>
                                        <option selected disabled>Select No. of Participants</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </Form.Control>
                                </Form.Group>
                                <center>
                                <div className="SidePadding">
                                    <Button type="submit" onClick={(e)=>{this.handleEvent(e)}} style={{margin:"5px"}}>Add</Button>
                                    <Button onClick={()=>{this.handleModal()}}>Cancel</Button>
                                </div>
                                </center>
                            </Form>
                        })}
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showAlert}>
                        <Modal.Header>Book Event</Modal.Header>
                        <Modal.Body>
                            <Table borderless responsive>
                                <tbody className="LeftAlign">
                                    <tr>
                                        <td className="Padding-none">{this.state.alertMessage}</td>
                                    </tr>
                                    <tr>
                                        <td className="Padding-none">
                                            <Button onClick={()=>{this.handleSuccessModal()}}>OK</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}
