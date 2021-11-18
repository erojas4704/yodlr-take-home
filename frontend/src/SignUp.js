
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SignUp() {
    const form = useState({ email: "" });

    return (<>
        <h1>Yodlr Registration Portal</h1>
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="E-mail address" value={"conot"}/>
            </Form.Group>
        </Form>
        <Button variant="primary" type="submit">Submit</Button>
        <p><Link to="/admin">Admin Page</Link></p>
    </ >
    );
}