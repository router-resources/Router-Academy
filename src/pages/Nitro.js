import React,{useState} from 'react'
import CourseCard from './CourseCard';
import Card2 from '../images/card1.png'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import { ChatViewComponent, ChatUIProvider, darkChatTheme } from "@pushprotocol/uiweb";
import {ConnectButton,Icon,TabList,Tab,useNotification} from 'web3uikit'
import { ethers } from 'ethers';
import './Testing.css'
function Testing() {
    const [link,setLink]=useState('')
    const [courseId,setCourseId]=useState(0)
    const [moduleId,setModuleId]=useState(0)
    const [notes,setNotes]=useState(0)
    const [show, setShow] = useState(false);
   

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const videoLink=["a","b","c","d","e"]
    // const repeatCount = localStorage.getItem('user') ?parseInt(JSON.parse(localStorage.getItem("user"))[courseId].numberOfModules) :videoLink.length;
    const repeatCount = videoLink.length

    const [showNFT, setShowNFT] = useState(false);
    const handleCloseNFT = () => setShow(false);
    const handleShowNFT = () => setShow(true);
    

    const dispatch0 = useNotification();

    const handleNewNotification0 = (
       
    ) => {
        dispatch({
            type:"error",
            message: 'Please Sign in to continue',
            title: 'User Not Authenticated',
            icon:"chevronRightX2",
            position:  'bottomR',
        });
    };
    const dispatch = useNotification();

    const handleNewNotification = (
       
    ) => {
        dispatch({
            type:"error",
            message: 'Please connect your crypto wallet',
            title: 'User Not Authenticated',
            icon:"chevronRightX2",
            position:  'bottomR',
        });
    };

    const dispatch1 = useNotification();

    const handleNewNotification1 = (
       
    ) => {
        dispatch1({
            type:"warning",
            message: 'Please complete the course to claim your NFT Certificate',
            title: 'Course not completed',
            icon:"chevronRightX2",
            position:  'bottomR',
            
        });
    };
    const dispatch2 = useNotification();
    const handleNewNotification2 = (
       
        ) => {
            dispatch2({
                type:"success",
                message: 'You have claimed your NFT Certificate ! You can view it on OpenSea.',
                title: 'Congratulations',
                icon:"chevronRightX2",
                position:  'bottomR',
                
            });
        };
    
    
    let abi=[
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "initialOwner",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "ERC721IncorrectOwner",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ERC721InsufficientApproval",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "approver",
                    "type": "address"
                }
            ],
            "name": "ERC721InvalidApprover",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "ERC721InvalidOperator",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "ERC721InvalidOwner",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                }
            ],
            "name": "ERC721InvalidReceiver",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "ERC721InvalidSender",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ERC721NonexistentToken",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "OwnableInvalidOwner",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "OwnableUnauthorizedAccount",
            "type": "error"
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
  return (
    <div style={{backgroundColor:'rgba(0,0,0,0.8)',margin:'0',paddingTop:'30px'}}> 
        <div >
        
        {localStorage.getItem('name')? <div class="container">
        <div class="right">
        <strong>
      Module &nbsp;{moduleId+1}
      </strong>
    <CourseCard link={link} notes={notes} courseId={courseId} moduleId={moduleId} courseName="nitro" />
     
      
    </div>
    <br></br>
    <div class="left">
      
     <hr></hr>

    {Array.from({ length: repeatCount }, (_, i) => (
        <div key={i}>
          <div className="fruits-divst" onClick={async() => {
            setCourseId(courseId);
            setModuleId(i);
          
                setLink(videoLink[i])
             
             
            setNotes('notes');
          }}>
            
            <l style={{ color: 'rgb(185, 27, 100)' }} className={JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user"))[courseId].isModuleComplete[`${i}`]==true ||localStorage.getItem(`C${courseId}M${i}`)=='true' || JSON.parse(localStorage.getItem("userinfo")).nitro.length>i && JSON.parse(localStorage.getItem("userinfo")).nitro.includes(`s${i}`) ? 'fas fa-check-circle checked-icon' : 'far fa-circle unchecked-icon'}></l>
            <strong>
              &nbsp;
              Module &nbsp; {i+1}
              <br></br>
              <l style={{ color: 'rgb(185, 27, 100)', fontSize: '17px' }}>{i+1}/11</l> <l style={{ color: 'grey', fontSize: '15px' }}>Video </l>
            </strong>
          </div>
          <hr></hr>
        </div>
      ))}

      <hr></hr>
      <button type="button" class={localStorage.getItem(`s1completed`) && localStorage.getItem(`s1completed`)=='true' ?`btn btn-success`: `btn btn-danger`}     onClick={async()=>{
        

        if(typeof window.ethereum == 'undefined') {
           handleNewNotification()
        }


        
        if(localStorage.getItem(`s1completed`) && localStorage.getItem(`s1completed`)=='true')
        {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
              });
            window.open(`https://testnets.opensea.io/${accounts[0]}`, '_blank');
        }
        else
        {
            let flag=0;
            for (let index = 0; index < videoLink.length; index++) {
                
               if(!(JSON.parse(localStorage.getItem('userinfo')).nitro.includes(`s${index}`)))
               {
                flag=flag+1;
                
               }
            }
            if(flag==0)
            {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                  });
                const provider = new ethers.providers.Web3Provider(window.ethereum)
             
            
                const signer = provider.getSigner();
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{
                    chainId: "0x13881",
                    rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
                    chainName: "Mumbai",
                    nativeCurrency: {
                        name: "MATIC",
                        symbol: "MATIC",
                        decimals: 18
                    },
                    blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
                }]
            })
           
            
            
            const contractAddress = "0x1221C8c7836c26475ED2960a6f93818AA9E0d777";
            const contract = new ethers.Contract(
                contractAddress,
                abi,
                signer
            )
          
            contract.safeMint(localStorage.getItem("address"),"https://ipfs.moralis.io:2053/ipfs/QmYCtcBTzRWyW5qpVVnEpXQ7nUoxAmuCQMnog5n1ugAi69/media/0")
            .then((transaction) => {
            
            handleNewNotification2()
            localStorage.setItem(`s1completed`,'true')
            window.location.reload(true)
            })
      
            .catch((err) => {
           alert(err)
            handleNewNotification1()
           
            
            });
            
            }

            else{
                handleNewNotification1()
            }
            }
        
        
        }}
        >{localStorage.getItem(`s1completed`) && localStorage.getItem(`s1completed`)=='true'?<div>View Your Certificate</div>:'Mint NFT Certificate'}</button>

    </div>
  
  </div>
  :handleNewNotification0()}


   
  
  </div>
  <br></br>
  <hr></hr>
  
  </div>
  
  )
}

export default Testing