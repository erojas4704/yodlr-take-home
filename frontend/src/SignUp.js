
import { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { createUser as registerUser } from "./actions/users";
import APIFeedback from "./APIFeedback";

export default function SignUp() {
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.user.currentUserId);
    const newUser = useSelector(state => state.user.newUser);
    const loading = newUser.loading;
    const error = newUser.error || errorMessage;
    
    const [form, setForm] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordConfirmation: ""
    });

    const handleSubmit = e => {
        e.preventDefault();
        if (form.password !== form.passwordConfirmation) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        dispatch(registerUser({
            email: form.email,
            firstName: form.firstName,
            lastName: form.lastName,
            password: form.password
        }));
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
            <Row>
                <Col md>
                    <Form.Group controlId="password" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" value={form.password} />
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group controlId="passwordConfirmation" className="mb-3">
                        <Form.Label>Confirm</Form.Label>
                        <Form.Control onChange={handleChange} name="passwordConfirmation" type="password" placeholder="Confirm Password" value={form.passwordConfirmation} />
                    </Form.Group>
                </Col>
            </Row>
            <APIFeedback error={error} loading={loading} />
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    </>
    );
}