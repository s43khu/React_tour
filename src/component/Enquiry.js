import './enquiry.scss'
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Enquiry(){
    const ref=useRef();
    const [success,setSuccess]=useState(false)

    const handlesubmit=(e)=>{
        e.preventDefault();
        
    emailjs.sendForm('service_50lkxmc', 'template_6jz462d', ref.current, '8Bd_APTn_VhIhBNyl')
    .then((result) => {
        console.log(result.text);
        setSuccess(true);
    }, (error) => {
        console.log(error.text);
        setSuccess(false);
    });

    }
    return(
        <section className="Contact" id="contact">
    <div className="container">
        <div className="left">
            <form ref={ref} onSubmit={handlesubmit}>
            <p className='title'>Contact Me :</p>

                <input placeholder='name' name='name'></input>
                <input placeholder='email' type="email" name='email'></input>
                <textarea placeholder='message' rows={10} name='message'></textarea>
                <button type='submit'>Submit</button>
                {success && 
                <p>your message has been sent!</p>}
            </form>
        </div>
        <img src='./assets/enq.png' height={600}></img>
    </div>
        </section>
    )
}