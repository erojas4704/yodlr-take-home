import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { cancelLogin, login } from "./actions/users";
import APIFeedback from "./APIFeedback";

export default function LogIn() {
    const dispatch = useDispatch();
    const loginData = useSelector(state => state.login);
    const userData = useSelector(state => state.user);

    useEffect(() => {
        return () => {
            // Cleanup. Cancel any pending API calls.
            dispatch(cancelLogin());
        }
    }, [dispatch]);


    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(login(form));
    }

    return (<>
        {userData.currentUserId > -1 && <Navigate to="/" />}
        <h3 className="my-3">Returning Users</h3>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="mb-3 my-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control onChange={handleChange} name="email" type="email" placeholder="E-mail" value={form.email} disabled={loginData.loading} />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" value={form.password} disabled={loginData.loading} />
            </Form.Group>
            <Button variant="primary" type="submit" className="mb-3" disabled={loginData.loading}>Log In</Button>
        </Form>
        <APIFeedback error={loginData.error} loading={loginData.loading} />
    </>
    )
}