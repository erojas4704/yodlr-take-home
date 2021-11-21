
import { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { createUser as registerUser } from "./actions/users";

export default function SignUp() {
    const [form, setForm] = useState({
        email: "",
        firstName: "",
        lastName: ""
    });

    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.user.currentUserId);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(registerUser(form));
        console.log(currentUserId);
    }

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }


    return (<>
        {currentUserId !== -1 && <Navigate to="/" />}
        <h1 className="my-3">Yodlr Registration Portal</h1>
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md>
                    <Form.Group controlId="firstName" className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control onChange={handleChange} name="firstName" type="text" placeholder="First Name" value={form.firstName} />
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group controlId="lastName" className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control onChange={handleChange} name="lastName" type="text" placeholder="Last Name" value={form.lastName} />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handleChange} name="email" type="email" placeholder="E-mail address" value={form.email} />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
        <Link to="/admin">Admin Page</Link>
    </>
    );
}