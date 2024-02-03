 // import "./App.css";
import { useState,useEffect } from "react";
import { signInWithGoogle } from "./firebase-config";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Alert from 'react-bootstrap/Alert';
import { db } from "./firebase-config";
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
  } from "firebase/firestore";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { Card, Button, Row, Col } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import { ethers } from 'ethers';
import './App.css';
import logo from './images2/logo.png'
import heading from './images2/heading.png'
import HomePage from "./HomePage";
import Nitro from './pages/Nitro';
import Crosstalk from './pages/Crosstalk';
import Cheatsheet from './pages/Cheatsheet';
import Cookbook from './pages/Cookbook';
import Projects from "./pages/Projects";

import { Routes, Route,Link } from "react-router-dom";

function App() {

  const [loginButtonColor,setLoginButtonColor]=useState('button-1')
  const [loginButtonText,setLoginButtonText]=useState('Sign in ')
  const [loginImage,setLoginImage]=useState(false)
  const [loginButtonImage,setLoginButtonImage]=useState('')
  const [account,setAccount]=useState('Connect Wallet')
  const [accountShow,setAccountShow]=useState('')
  const [balance,setBalance]=useState(0)
  const [show, setShow] = useState(false);
  const courseCollectionRef = collection(db, "courses");
  const usersCollectionRef = collection(db, "usercourse");
  const projectsCollectionRef = collection(db, "projects");
  const [projects,setProjects]=useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  AOS.init();

  // You can also pass an optional settings object
  // below listed default settings
  AOS.init({
	// Global settings:
	disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
	startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
	initClassName: 'aos-init', // class applied after initialization
	animatedClassName: 'aos-animate', // class applied on animation
	useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
	disableMutationObserver: false, // disables automatic mutations' detections (advanced)
	debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
	throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
	
  
	// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
	offset: 120, // offset (in px) from the original trigger point
	delay: 0, // values from 0 to 3000, with step 50ms
	duration: 400, // values from 0 to 3000, with step 50ms
	easing: 'ease', // default easing for AOS animations
	once: false, // whether animation should happen only once - while scrolling down
	mirror: false, // whether elements should animate out while scrolling past them
	anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  
  });

  let abi= [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "modules",
				"type": "uint256"
			}
		],
		"name": "addCourse",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "modules",
				"type": "uint256"
			}
		],
		"name": "addModules",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_fromTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_toTokenId",
				"type": "uint256"
			}
		],
		"name": "BatchMetadataUpdate",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "courseId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "claimCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "module",
				"type": "uint256"
			}
		],
		"name": "completeModule",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"name": "createCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "MetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_phono",
				"type": "string"
			}
		],
		"name": "register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"name": "safeMint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "courseId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "moduleId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "linkString",
				"type": "string"
			}
		],
		"name": "setLink",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "certificate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "email",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "getCourseById",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "courseId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "moduleId",
				"type": "uint256"
			}
		],
		"name": "getLink",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "courseId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "moduleId",
				"type": "uint256"
			}
		],
		"name": "isModuleComplete",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isRegistered",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "link",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "modulesCompleted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "numberOfCourses",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "numberOfModules",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "phono",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
 
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const scrollOptions = {
        behavior: 'smooth',
        block: 'start',
      };

      // Calculate the scroll duration based on the distance to scroll and the desired time (1 second in this case).
      const scrollDuration = 500; // 1 second in milliseconds.

      // Calculate the distance to scroll to the target section from the current position.
      const distance = section.getBoundingClientRect().top;

      // Calculate the number of frames needed for the animation.
      const frames = Math.ceil(scrollDuration / (1000 / 60));

      // Calculate the amount to scroll in each frame.
      const scrollStep = distance / frames;

      // Define the function to perform the scrolling animation.
      const scrollAnimation = (currentStep) => {
        if (currentStep >= frames) return;

        // Calculate the new scroll position.
        const newScrollPosition = window.pageYOffset + scrollStep;

        // Perform the scroll step.
        window.scrollTo(0, newScrollPosition);

        // Schedule the next step of the animation.
        setTimeout(() => scrollAnimation(currentStep + 1), 1000 / 60);
      };

      // Start the scrolling animation.
      scrollAnimation(0);
    }
  };

    // Define the styles for the card with a red gradient background
    const cardStyles = {
      
      width:'15em',
      backgroundIimage: 'linear-gradient(to bottom right, yellow, orange)',
      color: 'black', // Set text color to white for better visibility on the gradient background
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a subtle box shadow
    };
  
	const startFunction=async () => {
    
		if(localStorage.getItem("name"))
		{
			
		  setLoginButtonColor('button-3')
		  setLoginButtonText('Logged in as '+localStorage.getItem("name"))
		  setLoginButtonImage(localStorage.getItem("profilePic"))
		  setLoginImage(true)
		  console.log(localStorage)
		  const data = await getDocs(courseCollectionRef);
		
		  localStorage.setItem("myname","Pranav Verma")
		  const coursedata=data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
		  const project = await getDocs(projectsCollectionRef);
		
		
		  const projectData=project.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
		  setProjects(projectData)
		  localStorage.setItem("projectData",JSON.stringify(projectData))
		 
		  let blockchain=[];
		  
		//   localStorage.setItem("blockchain",JSON.stringify(coursedata[0].blockchain))
		  
		  localStorage.setItem('courseinfo',JSON.stringify(coursedata[0]))
		  
	
		  const user = await getDocs(usersCollectionRef);
		  const userdata=user.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
		  localStorage.setItem("userdata",JSON.stringify(userdata))
		 let flag=0;
		  for (let i = 0; i < userdata.length; i++) {
			const element = userdata[i];
			if(element.email==localStorage.getItem("email")) {
			
		  console.log(userdata[i].email
			)
			localStorage.setItem("userinfo",JSON.stringify(userdata[i]))
			console.log("nitro",JSON.parse(localStorage.getItem("userinfo")).nitro.length)
           
			flag=flag+1;
			localStorage.setItem("userId",userdata[i].id)
			}
	
		
			
		  }
		  
		
		  if(flag==0)
		  {
			await addDoc(usersCollectionRef, {
				name: localStorage.getItem("name"),
				email: localStorage.getItem("email"),
				crosstalk: [""],nitro:[""]
			  });
			  const project = await getDocs(projectsCollectionRef);
		
		
			  const projectData=project.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			  setProjects(projectData)
			  localStorage.setItem("projectData",JSON.stringify(projectData))
			 
			  
			window.location.reload(true)
			
		  }
	
		//   console.log(JSON.parse(localStorage.getItem('blockchain')))
	
	   
		}
	
		
		  
		 
		
	
	  
	   
	  }
  useEffect(()=>{startFunction()}, [])
  
  async function requestAccount() {
    console.log('Requesting account...');

    // ❌ Check if Meta Mask Extension exists 
    if(window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        
        localStorage.setItem('account',accounts[0].substring(0,4)+"...."+accounts[0].substring(38,42))
        setAccount(accounts[0].substring(0,4)+"...."+accounts[0].substring(38,42));
        setAccountShow(accounts[0])

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balanc=await provider.getBalance(accounts[0]);
       
        
        
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }

  async function connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0].substring(0,4)+"...."+accounts[0].substring(38,42));
      setAccountShow(accounts[0])
	  localStorage.setItem("address",accounts[0])


      
    }
    else{
      setShow(true)
      // window.open("https://metamask.io/download/", '_blank');
    }
  }
  return (
    <div className="App">
		<center>
			<div >
      <Navbar  bg="light" data-bs-theme="light" >
        <Container>
		
          <Navbar.Brand href="#home">

			
				<img  style={{width:'17em'}} src={logo}/>
			
			</Navbar.Brand>
          <Nav className="me-auto">
		  <div class="navcontent">
            <Nav.Link href="#courses"><l style={{color:'white'}}>Courses</l></Nav.Link>
            <Nav.Link href="#Cheatsheet"><l style={{color:'white'}}>Cheatsheet</l></Nav.Link>
			<Nav.Link href="#projects"><l style={{color:'white'}}>Projects</l></Nav.Link>
{/* 			
			<Nav.Link href="#cookbook"><l style={{color:'white'}}>Cookbook</l></Nav.Link> */}
			
			<Nav.Link href="#features"><l style={{color:'white'}}>Ambassador</l></Nav.Link>
            <Nav.Link href="#pricing"><l style={{color:'white'}}><button  data-aos="fade-up" data-aos-once="false" data-aos-duration="2000"   class="cbutton" onClick={
        

        connectWallet}>{localStorage.getItem('account')?localStorage.getItem('account'):account}</button>
       </l></Nav.Link>

	   <Nav.Link href="#features"><l style={{color:'white'}}>{loginImage==true?<div class="login">
    
      
	<img style={{height:'2.5em',width: '2.5em' ,borderRadius: '3em'}} src={loginButtonImage} alt="Circular Image"/>
</div>:<div><button  data-aos="fade-up" data-aos-once="false" data-aos-duration="2000" class="cbutton" onClick={signInWithGoogle}>
	  {loginButtonText}
	</button></div>}</l></Nav.Link>
	</div>
	
          </Nav>
		 
        </Container>
      </Navbar>
	  </div>
	  </center>
	
	
    

    
    
      {/* <div class="full-size-div">hello</div> */}
      {/* <HomePage/> */}
      {/* <Switch>
        <Route path="/course1" component={Home} />
        <Route path="/course2" component={Home} />
        <Route path="/course3" component={Home} />
      </Switch> */}
<div id="courses"></div>
      <Routes>
		
      <Route path="/" element={<HomePage />} />
    
    </Routes>

	<Routes>

	<Route path="/Nitro" element={<Nitro />} />
	</Routes>
	<Routes>

<Route path="/Crosstalk" element={<Crosstalk />} />
</Routes>


	<div id="Cheatsheet"></div>
	<Routes>

	<Route path="/" element={<Cheatsheet />} />
	</Routes>

	{/* <div id="cookbook"></div>
	<Routes>

	<Route path="/" element={<Cookbook />} />
	</Routes>
	 */}
	<div id="projects"></div>
	<br></br>
	{localStorage.getItem('projectData')&& <center>
	<h1 style={{color:'white'}}>Projects</h1>
	<br></br>
	<Routes>
	<Route path="/" element={<Projects />} />
	</Routes>
	</center>
}
	
      <br></br>
	  <br></br>
  
    <center><footer style={{padding:"15px", color:"#fff",backgroundColor:"#000"}}> &copy; 2023 all rights reserved @Router Protocol &nbsp;<a href="https://twitter.com/" class="fa fa-twitter"></a> &nbsp; <a href="https://www.linkedin.com/" class="fa fa-linkedin"></a> &nbsp; <a href="https://youtube.com/" class="fa fa-youtube"></a> </footer></center>
    


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Wallet not connected</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Make sure that you have wallet installed on your browser
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            window.open("https://metamask.io/download/", '_blank');
          }}>Install Wallet</Button>
        </Modal.Footer>
      </Modal>



    </div>
  );
}

export default App;