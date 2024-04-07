import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Forget() {
    return (
        <center>
            <div>
                <Form className="Sign_up">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Change password
                    </Button>
                </Form>
            </div>
        </center>
    )
}
