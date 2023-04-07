import Axios from "axios";
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Table } from 'react-bootstrap'

export default function Package_Home() {

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [source, setSource] = useState('');
  const [desc, setDesc] = useState('');
  const [dest, setDest] = useState('');
  const [facility, setFaciltity] = useState('');
  const [sdate, setSdate] = useState('');
  const [edate, setEdate] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);

  const [mylist, setList] = useState([]);

  // this is called repeatedly when ever u render
  useEffect(() => {

    Axios.get("http://localhost:4700/showpackages").then(
      res => setList(res.data));

    console.log("once");

  }, []);

  function changeName(e) { setName(e.target.value); }

  function changeSource(e) { setSource(e.target.value); }

  function changeDesc(e) { setDesc(e.target.value); }

  function changeDest(e) { setDest(e.target.value); }

  function changeFacility(e) { setFaciltity(e.target.value); }

  function changeSdate(e) { setSdate(e.target.value); }

  function changeEdate(e) { setEdate(e.target.value); }

  function changePrice(e) { setPrice(e.target.value); }


  function changeFile(e) {
    setFile(e.target.files[0]);
    console.log(file)
  }
  async function mysubmit() {

    const url = 'http://localhost:4700/savepackage';
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('dest', dest);
    formData.append('desc', desc);
    formData.append('source', source);
    formData.append('facility', facility);
    formData.append('sdate', sdate);
    formData.append('edate', edate);

    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const res = await Axios.post(url, formData, config);
    alert("The file is successfully uploaded");
    console.log(res.data);
  }

  function myupdate() {
    const data = { "id": id, "name": name, "source": source, "desc": desc, "dest": dest, "facility": facility, "sdate": sdate, "edate": edate, "price": price };
    console.log(data);
    Axios.post("http://localhost:4700/update", data)
      .then((res) => {
        setList(res.data);
        alert("The file is successfully uploaded");
      }).catch((error) => {
      });
  }

  function onDelete(e) {
    e.preventDefault();
    const id = e.target.id;
    console.log(id);
    Axios.get(`http://localhost:4700/packagedelete/${id}`).then(res => {
      setList(res.data);
    });
  };

  function onEdit(e) {
    e.preventDefault();
    const id = e.target.id;
    console.log(id);
    Axios.get(`http://localhost:4700/packageedit/${id}`).then(res => {

      setName(res.data[0].name);
      setDesc(res.data[0].description);
      setDest(res.data[0].destination);
      setSource(res.data[0].source);
      setFaciltity(res.data[0].facility);
      setEdate(res.data[0].enddate);
      setSdate(res.data[0].startdate);
      setPrice(res.data[0].price);
      setId(res.data[0].id);


    });
  };

  return (

    <div>
      <h2 align="center"><u> EDIT_PACKAGES</u> </h2>


      <Container>

        <Form>
          <Form.Group className="mb-3" controlId="t1">
            <Form.Label>Package Name</Form.Label>
            <Form.Control type="text"
              name="t1" onChange={changeName} value={name} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="t2">
            <Form.Label>Source</Form.Label>
            <Form.Control type="text" name="t2" onChange={changeSource} value={source} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="t3">
            <Form.Label>Destination</Form.Label>
            <Form.Control type="text" name="t3" onChange={changeDest} value={dest} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="t4">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="t4" onChange={changeDesc} value={desc} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="t5">
            <Form.Label>Facility</Form.Label>
            <Form.Control type="text" name="t5" onChange={changeFacility} value={facility} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="t6">
            <Form.Label>Start-Date</Form.Label>
            <Form.Control type="text" name="t6" onChange={changeSdate} value={sdate} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="t7">
            <Form.Label>End-Date</Form.Label>
            <Form.Control type="text" name="t7" onChange={changeEdate} value={edate} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="t8">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" name="t8" onChange={changePrice} value={price} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="file">
            <Form.Label>File</Form.Label>
            <Form.Control type="file" name="file" onChange={changeFile} />
          </Form.Group>

          <Button variant="primary" type="button" onClick={mysubmit}>
            Add Package
          </Button>
          &nbsp;
          <Button variant="success" type="button" onClick={myupdate}>
            Update Package
          </Button>
        </Form>

        <br />
        <br />

        <Table striped bordered hover className="table-dark">
          <thead>
            <th>Image</th> <th>Id</th> <th>Name</th><th>Destination</th><th>Description</th><th>Facility</th><th>Start-date</th><th>End-date</th><th>Price</th><th>Source</th><th>Delete</th> <th>Edit</th>
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
                  <td>
                    <Button variant="danger"
                      id={item.id}
                      onClick={onDelete}
                    >
                      Delete
                    </Button>
                  </td>

                  <td>    <Button variant="warning" id={item.id} onClick={onEdit}  >
                    edit
                  </Button>
                  </td>
                </tr>
              );
            })}


          </tbody>
        </Table>

      </Container>
    </div>
  );
}