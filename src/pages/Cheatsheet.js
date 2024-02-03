import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap';
import './Cheatsheet.css'
function Cookbook() {

  const cardStyles = {
      
    
    width:'650px',
   
border: '0.65px solid rgba(255, 255, 255, 0.12)',
background: 'rgba(255, 255, 255, 0.08)',
color:'white',
padding:'15px'
  };

  return (
    <center>
    <div style={{backgroundColor:'rgba(0,0,0,0.8)',margin:'0',paddingTop:'30px',color:'white'}}>
      <h1>Cheatsheet</h1>

      <br></br>

      <div  >
      <Card style={cardStyles}>
     
        <Card.Body>
          <Card.Title>CrossTalk</Card.Title>
          <br></br>
          <iframe src="https://docs.google.com/document/d/1VUL6l0MHrsYgM3Hyb3I4OrXg6SRJ9_ae6o_317bgQ5I/edit?usp=sharing" style={{width:"600px", height:"500px"}} frameborder="0"></iframe>
        <br></br>
        <br></br>
          <a href="https://docs.google.com/document/d/1VUL6l0MHrsYgM3Hyb3I4OrXg6SRJ9_ae6o_317bgQ5I/edit?usp=sharing"> <button class="cbutton">Download</button></a>
         
        </Card.Body>
      </Card>
    </div>
    <div  >
      <Card style={cardStyles}>
      
      
        <Card.Body>
          <Card.Title>Router Nitro</Card.Title>
          <br></br>
          <iframe src="https://docs.google.com/document/d/1I8zFU3nl5ZNy1SyYbJp62K6Q8Lg-ICAI6yc2PjP9LUY/edit?usp=sharing" style={{width:"600px", height:"500px"}} frameborder="0"></iframe>
          <br></br>
          <br></br>
          <a href="https://docs.google.com/document/d/1I8zFU3nl5ZNy1SyYbJp62K6Q8Lg-ICAI6yc2PjP9LUY/edit?usp=sharing"> <button class="cbutton">Download</button></a>
         
        </Card.Body>
      </Card>
    </div>
     
    </div>
    </center>
  )
}

export default Cookbook
