import React, { Component } from 'react'
import { Button, Modal, Card, Table, Image, Form } from 'react-bootstrap'
import Navbar from './Navibar'
import event1 from './event1.jpg'
import axios from 'axios'
import background from "../bg2.jpg";


export default class Profile extends Component {
    constructor(props) {
        super();
        this.state = {
            user_id: "",
            eventData: [],
            catsData: [],
            show: false,
            event_name: "",
            cats_name: "",
            capacity: "",
            availability: "",
            event_date: "",
            event_time: "",
            venue: "",
            alertMessage: "",
            showAlert: false,
        }
    }

    componentDidMount() {
        var data = localStorage.getItem('userData');
        var jsondata = JSON.parse(data);
        let user_id = jsondata[0].user_id
        this.setState({ user_id: user_id })
        axios.post('/event/myevent', { user_id })
            .then(response => {
                console.log("Event:", response)
                if (response && response.data) {
                    this.setState({ eventData: response.data.results });
                    console.log(this.state.eventData)
                    if (this.state.eventData.length === 0) {
                        // alert("No Posted Events Try Posting one")
                        this.setState({ alertMessage: "No Posted Events Try Posting one", showAlert: true })
                    }
                }
            });
        axios.post('/event/cats')
            .then(response => {
                if (response && response.data) {
                    this.setState({ catsData: response.data.results });
                }
            });
    }
    handleModal() {
        this.setState({ show: !this.state.show })
    }
    handleEvent = (event) => {
        event.preventDefault()
        var event_name = this.state.event_name;
        var cats_name = this.state.cats_name;
        var capacity = this.state.capacity;
        var availability = this.state.availability;
        var date = this.state.event_date;
        var event_date = date;
        var event_time = this.state.event_time;
        var venue = this.state.venue;
        var user_id = this.state.user_id;
        axios.post('/event/new', {
            "event_name": event_name,
            "cats_name": cats_name,
            "capacity": capacity,
            "availability": availability,
            "event_date": event_date,
            "event_time": event_time,
            "venue": venue,
            "user_id": user_id
        })
            .then(response => {
                if (response && response.data) {
                    console.log(response)
                    //  alert(response.data.message)
                    this.setState({ alertMessage: response.data.message, showAlert: true })

                    if (response.data.status === 200) {
                        this.setState({ show: false })
                        axios.post('/event/myevent', { user_id })
                            .then(response => {
                                console.log("Event:", response)
                                if (response && response.data) {
                                    this.setState({ eventData: response.data.results });
                                    console.log(this.state.eventData)
                                    if (this.state.eventData.length === 0) {
                                        // alert("No Posted Events Try Posting one")
                                        this.setState({ alertMessage: "No Posted Events Try Posting one", showAlert: true })
                                    }
                                }
                            });
                    }

                }
            });
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })

    }
    handleDate(e) {
        this.setState({
            event_date: e.target.value
        });
        console.log(this.state.event_date)
    }
    handleSuccessModal = () => {
        this.setState({ showAlert: !this.state.showAlert })
    }

    render() {
        return (
            <div style={{
                backgroundRepeat: "no-repeat", backgroundPosition: 'center',
                backgroundSize: 'cover', backgroundImage: `url(${background})`,
                top: 0, left: 0, width: '100%',height: '100vh'
            }}>
                <Navbar />
                <div className="d-flex justify-content-between SidePadding">
                    <h1 style={{ color: 'whitesmoke' }}>My Events</h1>
                    <div id="post"></div>
                    <Button onClick={() => { this.handleModal() }}>Add new Event</Button>
                </div>
                <Modal show={this.state.show}>
                    <Modal.Header>Add New Event</Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Control name="event_name" type="text" placeholder="Enter Event Name" onChange={e => this.onChange(e)} required />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control name="cats_name" as="select" onChange={e => this.onChange(e)} required>
                                    <option selected disabled>Select Type</option>
                                    {this.state.catsData.map((catDetail, index) => {
                                        console.log(catDetail);
                                        return <option value={catDetail.cats_name}>{catDetail.cats_name}</option>
                                    })}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control name="capacity" type="text" placeholder="Enter capacity" onChange={e => this.onChange(e)} required />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control name="availability" type="text" placeholder="Enter availability" onChange={e => this.onChange(e)} required />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="date" placeholder="Enter date" onChange={e => this.handleDate(e)} required />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control name="event_time" as="select" placeholder="Enter time" onChange={e => this.onChange(e)} required>
                                    <option selected disabled>Select Time</option>
                                    <option value="08:00AM">08:00 am</option>
                                    <option value="09:00AM">09:00 am</option>
                                    <option value="10:00AM">10:00 am</option>
                                    <option value="11:00AM">11:00 am</option>
                                    <option value="12:00PM">12:00 pm</option>
                                    <option value="01:00PM">01:00 pm</option>
                                    <option value="02:00PM">02:00 pm</option>
                                    <option value="03:00PM">03:00 pm</option>
                                    <option value="04:00PM">04:00 pm</option>
                                    <option value="05:00PM">05:00 pm</option>
                                    <option value="06:00PM">06:00 pm</option>
                                    <option value="07:00PM">07:00 pm</option>
                                    <option value="08:00PM">08:00 pm</option>
                                    <option value="09:00PM">09:00 pm</option>
                                    <option value="10:00PM">10:00 pm</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control name="venue" type="text" placeholder="Enter Venue" onChange={e => this.onChange(e)} required />
                            </Form.Group>
                            <center>
                                <div className="SidePadding">
                                    <Button type="submit" onClick={(e) => { this.handleEvent(e) }} style={{ margin: "5px" }}>Add</Button>
                                    <Button onClick={() => { this.handleModal() }}>Cancel</Button>
                                </div>
                            </center>

                        </Form>
                    </Modal.Body>
                </Modal>
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
                <div className="SidePadding" style={{overflow: 'auto'}}>
                    {this.state.eventData.map((eventDetail, index) => {
                        //if(eventDetail.length >0){
                            




































































































































































































































































































































































































































































































































































































































































                        
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
                                                <td className="Padding-none">Total Booking: {eventDetail.booking}</td>
                                                <td className="Padding-none">Avalibity: {eventDetail.availability}</td>
                                            </tr>
                                            <tr>
                                                <td className="Padding-none">Date: {(eventDetail.event_date).substring(0, 10)}</td>
                                                <td className="Padding-none">Time: {eventDetail.event_time}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                        // }//end of if
                        // else{
                        //     return <Card>
                        //                 <div>
                        //                     <h1>No Events Posted</h1>
                        //                 </div>
                        //             </Card>
                        // }


                    })
                    }
                </div>
            </div>
        )
    }
}