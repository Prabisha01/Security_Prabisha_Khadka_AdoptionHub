import React from 'react'
import wall from '../images/wall.jpg'
import Navbar from '../components/Navbar';
import UpNavbar from '../components/UpNavbar';


const Homepage = () => {
  const bgImage = {
    backgroundImage: `url(${wall})`,
    backgroundImage: `url(${wall})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '81vh',
   
  };

  return (
    <>
    <div>
      <UpNavbar />
    </div>
    <div>
      <Navbar />
    </div><div style={bgImage}>

      </div></>
  
  );
};

export default Homepage;