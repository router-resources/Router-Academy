import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap';
import './Cookbook.css'
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
      <h1>Cookbook</h1>

      <br></br>

      <div  >
      <Card style={cardStyles}>
      <iframe src="https://github.com/router-resources/Voyager-2-Cookbook/" style={{width:"600px", height:"500px"}} frameborder="0"></iframe>
        <br></br>
        <Card.Body>
          <Card.Title>Router Nitro</Card.Title>
          <br></br>
          <a href="https://github.com/router-resources/Voyager-2-Cookbook/"> <button class="cbutton">Download</button></a>
         
        </Card.Body>
      </Card>
    </div>

     
    </div>
    </center>
  )
}

export default Cookbook
