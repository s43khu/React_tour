import { Container, Row, Col, Button } from 'react-bootstrap';
import { useContext, useState,useEffect } from 'react';
import { ViewContext } from "../contexts/Viewthis";
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { PackContext } from "../contexts/PackContext";

function Booking(props) {
  const { bookingInfo } = props;
  const { view } = useContext(ViewContext);
  const user = useSelector((state) => state.username);
  const [no,setNo]=useState();
  const date=new Date().toLocaleDateString();
  const time=new Date().toLocaleTimeString();
  const [guests, setGuests] = useState(1);
  const { plist} = useContext(PackContext);
  const [price,setPrice]=useState(0);
const total=price*guests;
const data={"user":user,"packid":view,"phoneno":no,"guests":guests,"date":date,"time":time,"bill":total};

  const handleSelectChange = (event) => {
    setGuests(event.target.value);
    {plist.map((item) => {
        if (item.id ==view) {
            setPrice(item.price);
        }
      })}
  }
  const addno=(e)=>{
    setNo(e.target.value);
  }
  return (
    <Container>
      <Row>
        <Col>
          <h1>Booking Confirmation</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Booking Details</h3>
          <p><strong>Name:</strong> {user}</p>
          <p><strong>phone no.:</strong><input type='number' value={no} onChange={addno}></input></p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>
          <p><strong>Number of Guests:</strong> 
            <select id="numberSelect" value={guests} onChange={handleSelectChange}>
                <option>--select--</option>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </p>
          <p>total bill:{total}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => {
            if(no.length!=10){
                alert("enter phone no.(10)digits")}
                else{
                (window.print());
                Axios.post('http://localhost:4700/book',data);
            }
            }}>Confirm Booking</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Booking;
