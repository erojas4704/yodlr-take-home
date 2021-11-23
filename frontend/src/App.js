import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import SignUp from "./SignUp";
import Container from "react-bootstrap/Container";
import NavBar from "./NavBar";
import LogIn from "./LogIn";

function App() {
  return (
    <Router>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/login" exact element={<LogIn />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
