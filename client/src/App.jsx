import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Form, FormControl, Button, Modal } from "react-bootstrap";

import Home from "./components/home/Home";
import MovieDetail from "./components/moviedetail/MovieDetail";

export default function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const LoginModal = (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "black" }}>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ color: "black" }}>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{ color: "black" }}>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button
            variant="primary"
            onClick={(e) => console.log(e)}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );

  const navBar = (
    <div>
      <Navbar bg="dark" variant="dark" className="justify-content-start">
        <Link to={"/"}>
          <Navbar.Brand>
            <img
              alt="TMDB"
              src={
                "https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg"
              }
              width="50"
              height="50"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </Link>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-3" />
          <Button variant="outline-light">Search</Button>
        </Form>
        <Button className="mr-3 ml-3" onClick={handleShow}>
          Login
        </Button>
        <Button>SignUp</Button>
      </Navbar>
    </div>
  );

  return (
    <div>
      {navBar}
      {LoginModal}
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/movie/:id" component={MovieDetail} exact />
        </Switch>
      </main>
    </div>
  );
}
