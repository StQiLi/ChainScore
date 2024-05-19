import React from 'react';
import logo from '../assets/logo.png';

const Home = () => {
    return (
      <div className="relative w-screen h-screen bg-white">
        <div className="absolute top-0 left-0">
          <img src={logo} alt="Logo" className="" />
        </div>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-center">
            
            <div className=" h-full flex justify-center">
              <p className="text-4x1 font-bold">ChainScore</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default Home;

