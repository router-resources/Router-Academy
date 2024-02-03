import React,{useState} from 'react'
import CourseCard from './CourseCard';
import Card2 from '../images/card1.png'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import { ChatViewComponent, ChatUIProvider, darkChatTheme } from "@pushprotocol/uiweb";
import {ConnectButton,Icon,TabList,Tab,useNotification} from 'web3uikit'
import { ethers } from 'ethers';
import './Projects.css'
import { Card, Button, Row, Col } from 'react-bootstrap';
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


function Projects() {
    const projectsCollectionRef = collection(db, "projects");
    const projectData=JSON.parse(localStorage.getItem('projectData'))
    const cardStyles = {
      
    
        width:'15em',
       
  border: '0.65px solid rgba(255, 255, 255, 0.12)',
  background: 'rgba(255, 255, 255, 0.08)',
  color:'white',
  padding:'15px'
      };
    
  

  return (
    <div class="content" style={{backgroundColor:'rgba(0,0,0,0.8)',margin:'0',paddingTop:'30px',color:'white'}}>
      {
      
        projectData.map((i)=>{
            return (

                <Card style={cardStyles}>
                <center>
                <Card.Img variant="top" style={{width:'7em'}} src={i.logo} />
                </center>
                <br></br>
                <Card.Body>
                  <Card.Title>{i.name}</Card.Title>
                  <br></br>
                  <a href={i.link}>About Project</a>
                </Card.Body>
              </Card>
               
            )
        })
      }
    </div>
  )
}

export default Projects
