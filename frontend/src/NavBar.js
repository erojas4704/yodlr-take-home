import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "./actions/users";

export default function NavBar() {
    const currentUserId = useSelector(state => state.user.currentUserId);
    const dispatch = useDispatch();

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="admin">Admin</NavLink>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {currentUserId !== -1 ?
                        <NavLink className="nav-link" onClick={() => dispatch(logoutUser())} to="/">Log Out</NavLink> :
                        <>
                            <NavLink className="nav-link" to="login">Log In</NavLink>
                            <NavLink className="nav-link" to="signup">Register</NavLink>
                        </>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}