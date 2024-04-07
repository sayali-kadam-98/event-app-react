import React, { Component } from 'react'
import { Button, Modal, Card, Table, Image } from 'react-bootstrap'
import Navbar from './Navibar'
import event1 from './event1.jpg'
import axios from 'axios'
import background from "../bg2.jpg";

export default class Bookings extends Component {
    constructor(props) {
        super();
        this.state = {
            user_id: "",
            bookData: [],
            alertMessage: "",
            showAlert: false,
        }
    }
    componentDidMount() {
        var data = localStorage.getItem('userData');
        var jsondata = JSON.parse(data);
        let user_id = jsondata[0].user_id
        console.log(user_id)
        axios.post('/booking/list', { user_id })
            .then(response => {
                if (response && response.data) {
                    //console.log(response.data.results)
                    this.setState({ bookData: response.data.results });
                    console.log("Bookings", this.state.bookData)
                    if (this.state.bookData.length === 0) {
                        // alert("No Booked Events! go ahead and book Some events")
                        this.setState({ alertMessage: "No Booked Events! go ahead and book Some events", showAlert: true })
                    }
                }
            });
    }
    handleEvent = (event, book_id, event_id, part) => {
        event.preventDefault()
        console.log('Event', event, book_id, event_id, part)
        axios.post('/booking/cancel', { "book_id": book_id, "event_id": event_id, "participant": part })
            .then(response => {
                if (response && response.data) {
                    console.log(response)
                    if (response.data.status === 200) {
                        //  alert(response.data.message)
                        this.setState({ alertMessage: response.data.message, showAlert: true })
                        // this.setState({show:false})
                    }

                }
            });
    }
    handleModal = () => {
        this.setState({ showAlert: !this.state.showAlert })
    }
    render() {
        return (
            <div style={{flex:1}}>
                <div style={{
                    backgroundRepeat: "no-repeat", backgroundPosition: 'center',
                    backgroundSize: 'cover', backgroundImage: `url(${background})`,
                    top: 0, left: 0, width: '100vw',height: '100vh'
                }}>
                    <Navbar />
                    <h1 style={{ color: 'whitesmoke' }}>My Bookings</h1>
                    <div className="SidePadding">
                        {this.state.bookData.map((bookDetail, index) => {
                            return <Card>
                                <Card.Body>
                                    <div>
                                        <Table borderless responsive>
                                            <tbody className="LeftAlign">
                                                <tr>
                                                    <td rowSpan="5" width="25%">
                                                        <Image src={event1} thumbnail />
                                                    </td>
                                                    <td className="Padding-none"><b>Booking ID: {bookDetail.book_id}</b></td>
                                                </tr>
                                                <tr>
                                                    <td className="Padding-none">Name: {bookDetail.event_name}</td>
                                                    <td className="Padding-none">Type: {bookDetail.cats_name}</td>
                                                </tr>
                                                <tr>
                                                    <td className="Padding-none">Venue: {bookDetail.venue}</td>
                                                    <td className="Padding-none">Status: <b>{bookDetail.status}</b></td>
                                                </tr>
                                                <tr>
                                                    <td className="Padding-none">Participants: {bookDetail.participant}</td>
                                                    <td className="Padding-none">Booked on: {bookDetail.book_time}</td>
                                                </tr>
                                                <tr>
                                                    <td className="Padding-none">Date: {(bookDetail.event_date).substring(0, 10)}</td>
                                                    <td className="Padding-none">Time: {bookDetail.event_time}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                    {bookDetail.status !== 'Canceled' ?
                                        <Button type="submit" onClick={(e) => { this.handleEvent(e, bookDetail.book_id, bookDetail.event_id, bookDetail.participant) }} variant="primary">Cancel Book</Button>
                                        : null
                                    }
                                </Card.Body>
                            </Card>
                        })}
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
                                                <Button onClick={() => { this.handleModal() }}>OK</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}
