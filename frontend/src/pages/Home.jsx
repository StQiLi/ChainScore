import React from 'react';
import logo from '../assets/logo.png';

const Home = () => {
    return (
      <section className="section">
      <div className="flex items-start justify-center align-top h-screen">
        <div className="flex left-0">
          {/* <img src={logo} alt="Logo" className="h-24 mb-4" /> */}
        </div>
        <div>
          <h1 className="text-6xl font-bold align-top border border-black">ChainScore</h1>
        </div>
      </div>
    </section>
    );
  };
  export default Home;

