import React from 'react';
import logo from '../assets/logo.png';
import { TextRevealCard, TextRevealCardTitle, TextRevealCardDescription } from "../components/ui/text-reveal-card";

const Home = () => { 
    return (
      <div className="flex items-center rounded-full justify-center h-screen w-screen bg-white ">
      <TextRevealCard
        text="Track. Trade. Simplified. "
        revealText="ChainScore."
        className="text-center"
      >
        {/* <TextRevealCardTitle className="mb-4">Welcome to My Site</TextRevealCardTitle>
        <TextRevealCardDescription>
          This is a demo of the TextRevealCard component.
        </TextRevealCardDescription>*/}
      </TextRevealCard>
    </div>
  );
};

export default Home;

