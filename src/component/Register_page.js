import Axios from "axios";
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [type] = useState('customer');

  const navigate = useNavigate();

  function changeUsername(e) {
    setUsername(e.target.value);
  }
  function changePassword(e) {
    setPassword(e.target.value);
  }
  function changeEmail(e) {
    setEmail(e.target.value);
  }
  function mysubmit() {
    const data = { 'username': username, 'password': password, 'email': email, 'type': type };
    Axios.post('http://localhost:4700/adduser', data);
    console.log(data);
    alert("account created!");
    navigate('/login');
  }

  return (
    <Container className="auth-container">
      <Row>
        <Col>
          <Card className="auth-container-card" style={{ width: "25rem" }}>
            <Card.Title className="mb-3">Sign-In</Card.Title>
            <Form className="auth-container-form">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control className="auth-container-input" type="email" onChange={changeEmail} value={email} />
                <Form.Text className="text-muted">
                  We'll share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  className="auth-container-input"
                  type="text" onChange={changeUsername} value={username}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="auth-container-input"
                  type="password" onChange={changePassword} value={password}
                />
              </Form.Group>
              <Button
                className="mb-3 auth-container-button"
                style={{ width: "100%" }}
                variant="primary outline-light"
                type="submit" onClick={mysubmit}
              >
                Submit
              </Button>

              <Form.Group className="mt-3">
                <Form.Text className="text-muted">
                  By continuing, you agree to Pentagon's Conditions of Use and
                  Privacy Notice.
                </Form.Text>
              </Form.Group>
            </Form>
          </Card>

        </Col>
      </Row>
    </Container>
  );
}

