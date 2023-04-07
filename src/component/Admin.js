import Axios from "axios";
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

function Admin() {

  const storeState = useSelector(state => state)

  const [mylist, setList] = useState([]);
  // this is called repeatedly when ever u render
  useEffect(() => {

    Axios.get("http://localhost:4700/showpackages").then(
      res => setList(res.data));

    console.log("once");

  }, []);
  const navigate = useNavigate();
  function onAdd() {
    navigate('/addpackage');
  }
  function goto() {
    navigate('/userinfo');
  }

  return (
    <div>
      <h1> Welcome,{storeState.username}</h1>
      <Button variant='danger' onClick={onAdd}>Edit Packages</Button>
      <Button variant='success' onClick={goto}>no.of users(not working)</Button>


      <Table striped bordered hover className="table-dark">
        <thead>
          <th>Image</th> <th>Id</th> <th>Name</th><th>Destination</th><th>Description</th><th>Facility</th><th>Start-date</th><th>End-date</th><th>Price</th><th>Source</th>
        </thead>
        <tbody>
          {mylist.map((item, index) => {

            return (
              <tr key={index}>
                <td><img src={item.package_image} width="120" height="120" alt="images" /></td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.destination}</td>
                <td>{item.description}</td>
                <td>{item.facility}</td>
                <td>{item.startdate}</td>
                <td>{item.enddate}</td>
                <td>{item.price}</td>
                <td>{item.source}</td>
              </tr>
            );
          })}


        </tbody>
      </Table>
    </div>
  );
}
export default Admin;