import React, { useState } from "react";
import { toast } from 'react-toastify';
import { contactApi } from '../apis/Api';
import Navbar from '../components/Navbar';
import UpNavbar from "../components/UpNavbar";

const Contact = () => {
  //useState
  const [contactName , setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState(' ')
  const [contactMessage, setContactMesssage] = useState(' ')
//useState setting error message
  const [contactNameError , setContactNameError] = useState('')
  const [contactEmailError, setContactEmailError] = useState(' ')
  const [contactMessageError, setContactMesssageError] = useState(' ')

  //validate input
  const validate =() => {
    let isValid = true;

    setContactEmailError(' ')
    setContactNameError(' ')
    setContactMesssageError(' ')

    if(contactEmail.trim()=== " "){
      setContactEmailError("Email is requireq")
      isValid = false;
    }
    if(contactMessage.trim()=== " "){
      setContactMesssage("Message is required")
      isValid = false;
    }
    if(contactName.trim()=== " "){
      setContactNameError("Name is required")
      isValid = false;
    }
    return isValid
  }

  const changeContactName = (e) =>{
    setContactName(e.target.value)
  }
  const changeContactEmail = (e) =>{
    setContactEmail(e.target.value)
  }
  const changeContactMessage = (e) =>{
    setContactMesssage(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(contactName, contactEmail,contactMessage)

    //validate the data
    const isValid = validate()
    if(!isValid){
      return
    }

    //making json data object
    const data ={
      contactEmail : contactEmail,
      contactName : contactName,
      contactMessage: contactMessage
    }

    contactApi(data).then((res) => {
      if(res.data.success == false){
        toast.error(res.data.message)
      }else{
        toast.success(res.data.message)
      }
    }).catch(err =>
      {
        toast.error('Server Error')
        console.log(err.message)
      })
 
  }

  return (
    <>
    <div>
      <UpNavbar/>
    </div>
    <div>

      <Navbar />
    </div><div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="border p-4 rounded">
              <div className="mb-3">
                <h2>Contact Us</h2>
              </div>
              <form>
                <div className="form-group">
                  <div className="mb-3">
                    <label htmlFor="name">Your Name:</label>
                    <input onChange={changeContactName} type="text" className="form-control" id="name" placeholder="Enter your name" />
                    {contactNameError && <p className="text-danger">{contactNameError}</p>}
                  </div>
                </div>
                <div className="form-group">
                  <div className="mb-3">
                    <label htmlFor="email">Email Address:</label>
                    <input onChange={changeContactEmail} type="email" className="form-control" id="email" placeholder="Enter your email" />
                    {contactEmailError && <p className="text-danger">{contactEmailError}</p>}
                  </div>
                </div>
                <div className="form-group">
                  <div className="mb-3">
                    <label htmlFor="message">Write Your Message:</label>
                    <textarea onChange={changeContactMessage} className="form-control" id="message" rows="6" placeholder="Write your message"></textarea>
                    {contactMessageError && <p className="text-danger">{contactMessageError}</p>}
                  </div>
                </div>
                <div className="mb-3">
                  <button onClick={handleSubmit} className="btn btn-success" style={{backgroundColor : "#2b7509"}}>Submit</button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 mt-3 mt-md-0">
            <div className="rounded">
              <div className="mb-3">

                <strong>Address:</strong>
                <p>Dillibazar, Kathmandu</p>
              </div>
              <div className="mb-3">

                <strong>Phone:</strong>
                <p>9800000000</p>
              </div>
              <div className="mb-3">
                <strong>Email:</strong>
                <p>nursyease@gmail.com</p>
              </div>
            </div>
            <div className="mt-4">
              <iframe
                title="Google Maps"
                width="100%"
                height="300"
                loading="lazy"
                allowFullScreen
                frameBorder="0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.3344400403693!2d85.31808691451583!3d27.708955882789484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18573d796fcb%3A0x16520dd5f924cd25!2sDillibazar%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1641710014990!5m2!1sen!2snp"
              ></iframe>
            </div>
          </div>
        </div>
      </div></>
  );
};

export default Contact;