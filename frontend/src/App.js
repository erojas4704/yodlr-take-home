import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link, NavLink, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import SignUp from "./SignUp";
import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";

function App() {
  useEffect(() => {
    const getUsers = async () => {
      const ef = await axios.get("/users");
      console.log(ef.data);
    };
    getUsers();
  }, []);

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="me-auto">
              ASS NUGGET
              <Nav.Link> <NavLink to="home">Home</NavLink></Nav.Link>
              <Nav.Link> <NavLink to="admin">Admin</NavLink></Nav.Link>
              <Nav.Link> <NavLink to="signup">Sign Up</NavLink></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/signup" exact element={<SignUp />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
