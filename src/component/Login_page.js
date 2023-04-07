import React, { useState } from 'react';
//import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { RegisterUser } from '../Redux/Action/Registeraction'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const storeState = useSelector(state => state)   //?? which state is which??
  const [mystate, setMyState] = useState({
    username: '', password: '',email:''
  })
  const handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;

    setMyState({
      ...mystate,
      [name]: value
    })
  }
  async function mysubmit() {
    console.log("sending state:", mystate);
    const data = mystate;

    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }
    const response = await fetch('http://localhost:4700/login', config)
    const json = await response.json();


    console.log(json);
    if (json.length === 0) {
      alert("Invalid user try again!");
    }
    else if (json[0].type === "admin") {
      console.log("welcome admin");
      dispatch(RegisterUser(mystate));
      navigate("/admin");
    }
    else if (json[0].type === "customer") {
      console.log("customer ");
      dispatch(RegisterUser(mystate));
      //localStorage.setItem("cname",username);
      navigate("/customer");
    }
    else if (json[0].type === "invalid") {
      alert("Invalid user try again!");
    }

  }
  return (
    <div>
      <h1>WELCOME,{storeState.username}!</h1>
      <br /><br /><br />
      <Container>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter Username" name="username"
              onChange={handleChange}

            />

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="button" onClick={mysubmit}>
            Submit
          </Button>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Don't have account?<a href="/register">create new</a> </Form.Label>
          </Form.Group>
        </Form>
      </Container>

    </div>


  );
}