import Axios from "axios";
import React, { useState, useEffect, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Button, Card, Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Rating } from "./RatingStyles";
import { FaStar } from "react-icons/fa";
import { PackContext } from "../contexts/PackContext";
import { ViewContext } from "../contexts/Viewthis";


export default function Home() {

  const navigate = useNavigate();
  const user = useSelector((state) => state.username)
  const [avgr, setAvgr] = useState([]);
  const { plist} = useContext(PackContext);
  const { setView } = useContext(ViewContext);


  // this is called repeatedly when ever u render
  useEffect(() => {
      Axios.get("http://localhost:4700/avgr").then(
        res => setAvgr(res.data));
  }, []);


  function onAdd(e) {
    setView(e.target.id);
    navigate('/viewcart');
  }
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'assets/t1.jpg'} height="700"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3> <p>BLIND EYE</p></h3>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'assets/t2.jpg'} height="700"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3><p>Sacred Path</p></h3>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'assets/t3.jpg'} height="700"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3><p>
              Denim Quest
            </p></h3>

          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'assets/t4.jpg'} height="700"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3><p>
              Sand Storm</p></h3>

          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'assets/t5.jpg'} height="700"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3><p>
              Lost Path
            </p></h3>

          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <br />
      <h2 align="center"><u>Available Options</u> </h2>


      {user == "Guest" || user == "admin" ? (<div>
        <Container className="text-dark" >
          <Row>
            {plist.map((item,index) => {
              return (
                <Col>  <Card key={index} style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={item.package_image} height="200" />
                  <Card.Body>
                    <Card.Title><b>{item.name}</b></Card.Title>
                    <Card.Text>
                      <b>destination:</b>{item.destination}<br />
                      <b>price:</b>Rs.{item.price}/-<br />
                      <b style={{ maxHeight: "1cm" }}>rating:
                        {avgr.map((sitem, index) => {
                          if (sitem.pack_id == item.id) {

                            return (
                              <>
                                {[...Array(5)].map((item, findex) => {
                                  const rating = sitem.avgr - findex;
                                  return (
                                    <label>
                                      <Rating style={{cursor:"auto"}}>
                                        <FaStar
                                          color={
                                            rating > 0
                                              ? "fbe016"
                                              : "rgb(192,192,192)"
                                          }
                                        />
                                      </Rating>
                                    </label>
                                  );
                                })}
                                <br />
                              </>
                            )
                          }
                        })}</b>
                    </Card.Text><OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">login to view details</Tooltip>}>
                      <Button variant="secondary" href="#none">Book</Button></OverlayTrigger>
                  </Card.Body>
                </Card></Col>

              );
            })}
          </Row>
        </Container>
      </div>
      ) : (<div>
        <Container className="text-dark">
          <Row>
            {plist.map((item) => {
              return (
                <Col>  <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={item.package_image} height="200" />
                  <Card.Body>
                    <Card.Title><b>{item.name}</b></Card.Title>
                    <Card.Text>
                      <b>destination:</b>{item.destination}<br />
                      <b>price:</b>Rs.{item.price}/-<br />
                      <b>rating:
                        {avgr.map((sitem) => {
                          if (sitem.pack_id == item.id) {

                            return (
                              <>
                                {[...Array(5)].map((i,findex) => {
                                  const rating = sitem.avgr - findex;
                                  return (
                                    <label style={{ height: "30px" }}>
                                      <Rating style={{cursor:"auto"}}>
                                        <FaStar
                                          color={
                                            rating > 0
                                              ? "fbe016"
                                              : "rgb(192,192,192)"
                                          }
                                        />
                                      </Rating>
                                    </label>
                                  );
                                })}
                                <br />
                              </>
                            )
                          }
                        })}</b>
                    </Card.Text>
                    <Button variant="success" id={item.id} onClick={onAdd}>Book</Button><br />

                  </Card.Body>
                </Card></Col>

              );
            })}
          </Row>
        </Container>
      </div>
      )
      }
    </>
  );
}