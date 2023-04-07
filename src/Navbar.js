import { BsCart3 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import React, { useState, useContext, useEffect } from 'react';
import Axios from "axios";
import { PackContext } from "./contexts/PackContext";
import './component/nav.scss'

export default function NavBar() {
  const user = useSelector((state) => state.username)
  const [Text, setText] = useState('');
  const { plist,setPlist } = useContext(PackContext);
    
  useEffect(()=>{
  Axios.post(`http://localhost:4700/search?q=${Text}`).then(res=>{
      setPlist(res.data)});
  },[Text])
  const navigate = useNavigate();

  const Add = () => {
    navigate("/addpackage")
  }
  const Home = () => {
    navigate("/")
  }
  const Cart = () => {
    navigate("/viewcart")
  }
  const Searchtext = (e) => {
    setText(e.target.value);
    }

  return (
    <>
      {user === "Guest" ? (<>
        <Navbar collapseOnSelect expand="lg"  variant="dark">
          <Container>
            <Navbar.Brand href="#" onClick={Home}><img src="assets/logo.png" height={45} alt=""></img>PentaGon</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={() => navigate("/aboutus")}>About Us</Nav.Link>
                <Nav.Link href="#enquiry" onClick={()=>navigate('/enquiry')}>Enquiry</Nav.Link>  
              </Nav>
              <Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search destination"
                    className="me-2"
                    aria-label="Search"
                    onChange={Searchtext}
                  />

                </Form>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link >
                  {user}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
      ) :
        (
          user === "admin" ? (
            <>
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                  <Navbar.Brand href="#" onClick={Home}><img src="assets/logo.png" height={45} alt=""></img>PentaGon</Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="me-auto">
                      <Nav.Link href="#add" onClick={Add}>Package_lobby</Nav.Link>
                    </Nav><Nav>
                      <Form className="d-flex">
                        <Form.Control
                          type="search"
                          placeholder="Search destination"
                          className="me-2"
                          aria-label="Search"
                          onChange={Searchtext}
                        />
                      </Form>
                      <Nav.Link href="/">Logout</Nav.Link>
                      <Nav.Link>{user}</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </>) : (
            <>
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                  <Navbar.Brand href="#" onClick={Home}><img src="assets/logo.png" height={45} alt=""></img>PentaGon</Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="me-auto">
                      <Nav.Link href="#enquiry" onClick={()=>navigate('/enquiry')}>Enquiry</Nav.Link>
                      <Nav.Link href="#about" onClick={()=>navigate('/aboutus')}>About us</Nav.Link>
                    </Nav><Nav>
                      <Form className="d-flex">
                        <Form.Control
                          type="search"
                          placeholder="Search destination"
                          className="me-2"
                          aria-label="Search"
                          onChange={Searchtext}
                        />
                   
                      </Form>
                      <Nav.Link href="/">Logout</Nav.Link>
                      <Nav.Link>{user}</Nav.Link>
                      <Nav.Link href="#viewcart"><BsCart3 /></Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </>
          )
        )
      }
    </>
  )
}