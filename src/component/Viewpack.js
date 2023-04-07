import Axios from "axios";
import React, { useState, useEffect, useContext } from 'react';
import { ViewContext } from "../contexts/Viewthis";
import { Button } from 'react-bootstrap'
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const { view } = useContext(ViewContext);
    const [mylist, setList] = useState([]);
    const [rate, setRate] = useState(0);
    const [cmnt, setCmnt] = useState('');
    const [rs, setRs] = useState([]);
    const user = useSelector((state) => state.username)
    const navigate = useNavigate()
    var comntcheck = false;
    for (var i = 0; i < rs.length; i++) {
        if (rs[i].user === user && rs[i].pack_id === parseInt(view)) {
            comntcheck = true;
            break;
        }
    }
    //   console.log(rs);
    //   console.log(comntcheck);
    useEffect(() => {

        Axios.get("http://localhost:4700/showpackages").then(
            res => setList(res.data));
        Axios.get("http://localhost:4700/showrating").then(
            res => setRs(res.data));
    }, []);

    const cmntChange = (e) => {
        e.preventDefault();
        setCmnt(e.target.value);
    }

    const onSubmit = () => {
        let data = { "comments": cmnt, "rating": rate, "pack_id": view, "user": user };
        Axios.post("http://localhost:4700/addrating", data).then(res => {
            setRs(res.data)
        });
    }

    return (
        <>
            {/* about package which is clicked by user */}
            {mylist.map((item) => {
                if (item.id === parseInt(view)) {
                    return (
                        <>
                            <img src={item.package_image} width="120" height="120" alt="images" /><br />
                            <b> Name: &nbsp;&nbsp;</b>{item.name}<br />
                            <b>Destination: &nbsp;&nbsp;</b>{item.destination}<br />
                            <b>Description: &nbsp;&nbsp;</b>{item.description}<br />
                            <b> Facility: &nbsp;&nbsp;</b>{item.facility}<br />
                            <b> start-Date: &nbsp;&nbsp;</b>{item.startdate}<br />
                            <b> End-Date: &nbsp;&nbsp;</b>{item.enddate}<br />
                            <b>Price:&nbsp;&nbsp; </b>Rs.{item.price}/-<br />
                            <b> Source:&nbsp;&nbsp; </b>{item.source}<br />
                            <Button variant="success" onClick={() => { navigate('/Booking') }}>Book</Button>
                            <hr />
                        </>
                    );
                }
                return null;
            })}
            {/* comment check if already  done */}
            {comntcheck === false ?
                <> <b>Rate us: &nbsp;&nbsp;</b>
                    <Container>
                        {[...Array(5)].map((item, index) => {
                            const rateit = index + 1;
                            return (
                                <label>
                                    <Radio
                                        type="radio"
                                        value={rateit}
                                        onClick={() => {
                                            setRate(rateit);
                                            alert(`Are you sure you want to give ${rateit} stars ?`);
                                        }}
                                    />
                                    <Rating>
                                        <FaStar
                                            color={
                                                rateit < rate || rateit === rate
                                                    ? "fbe016"
                                                    : "rgb(192,192,192)"
                                            }
                                        />
                                    </Rating>
                                </label>
                            );
                        })}
                    </Container><br />
                    <b>coment:</b>
                    <div class="form-group">
                        <textarea class="form-control" name="message" rows="5" onChange={cmntChange} value={cmnt} placeholder="coment here..." required></textarea>
                    </div><br />

                    <Button variant="primary" type="button" onClick={onSubmit}>
                        Submit
                    </Button><br /></>
                : <><b>Rate us: &nbsp;&nbsp;</b><h2>Already Done!</h2></>
            }
            {/* total reviews done on a package */}
            <hr /><hr />
            <h3>REVIEWS:</h3><br />

            {rs.map((sitem) => {
                if (sitem.pack_id === parseInt(view)) {
                    return (
                        <>
                            &nbsp;&nbsp;&nbsp;<b>{sitem.user}</b>&nbsp;&nbsp;&nbsp;
                            {[...Array(5)].map((item, findex) => {
                                const rating = sitem.rating - findex;
                                return (
                                    <label>
                                        <Rating style={{ cursor: "auto" }}>
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
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{sitem.comments}<br /><br />
                        </>
                    )
                }
                return null;
            })}
        </>
    )
}