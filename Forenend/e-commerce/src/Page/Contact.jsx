import React from 'react';
import "./Contact.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { FaWhatsapp, FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa";

function Contact() {
    const center = {
    lat: 9.851240261861609,
    lng: 78.09738468005153,
  };

  return (
    <>
      <div className='container'>
        <div className='contact-card'>

          {/* LEFT SIDE */}
          <div className='contact-info'>
            <h2 className='companyname'>Madurai International Airport</h2>
            <p>Airports Authority of India,<br />
               Madurai Airport, Madurai – 625022,<br />
               Tamil Nadu, India</p>

            <h4><a href='tel:+914522690717'>Call: +91‑452‑2690717</a></h4>

            <p>
              <strong>Email:</strong>
              <a href='mailto:apdmadurai@aai.aero'>apdmadurai@aai.aero</a>
            </p>

            <p>
              <strong>Terminal Manager:</strong>
              <a href='mailto:tm_madurai@aai.aero'>tm_madurai@aai.aero</a>
            </p>

            <p>
              <strong>Deputy GM (Operations):</strong>
              <a href='mailto:pgo_madurai@aai.aero'>pgo_madurai@aai.aero</a>
            </p>

            <p>
              <strong>Safety Contact:</strong>
              <a href='mailto:asm_vomd@aai.aero'>asm_vomd@aai.aero</a>
            </p>

            <div className='social-icons'>
              <a href="tel:+914522690717"><FaPhone /></a>
              <a href="mailto:apdmadurai@aai.aero"><FaEnvelope /></a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className='contact-form'>
            <h2 className='contact-title'>We’d love to assist you!</h2>
            <p>Feel free to reach out for any airport-related queries, operations, or partnership opportunities.</p>
            <a className='contact-btn' href="mailto:apdmadurai@aai.aero">Contact Us</a>
          </div>

        </div>
      </div>

      {/* GOOGLE MAP */}
      <div className='map-section'>
        <h2 className='map-title'>📍 Airport Location</h2>
        <LoadScript googleMapsApiKey="AIzaSyDW0LlIVS-Cxx0DjaFrA5mKGzpPEECfLrE">
          <GoogleMap zoom={14} center={center} mapContainerClassName="map-box">
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}

export default Contact;