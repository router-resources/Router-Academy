import React from 'react';
import Typewriter from 'typewriter-effect';
import './Home.module.css'; // Import the CSS module
import heading from '../images2/heading.png';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const Home = ({ string }) => {
  const typewriterStyles = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '19px',
    fontWeight: 'bold',
    color: 'rgb(248, 221, 251)',
    padding: '20px',
    textAlign: 'center',
  };

  return (
    <div class="container" style={{backgroundColor:'inherit',width:'19em',margin:'0',padding:'0'}}>
      <div class="typewriter-container">
       
        <br />
        <div style={typewriterStyles}>
          <Typewriter
            options={{
              strings: string,
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
