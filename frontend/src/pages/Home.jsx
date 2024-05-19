import React from 'react';
import logo from '../assets/logo.png';

const Home = () => {
    return (
      <div className="w-screen h-screen border border-black">
        <div className="border-2 border-black">
          <img src={logo} alt="Logo" className="" />
        </div>
        <div className="flex flex-col items-center justify-center h-screen border-2 border-black">
          <div className="text-center">
            
            <div className="border-2 border-black h-full flex justify-center">
              <h1 className="text-4x1 font-bold">ChainScore</h1>
            </div>
          </div>
      </div>
      </div>
    );
  };
  export default Home;

