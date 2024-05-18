import * as React from 'react';
import PropTypes from 'prop-types';
import { FaBars as MenuIcon } from 'react-icons/fa';
import ToggleColorMode from './ToggleColorMode';

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

function Navbar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <header className="fixed top-0 left-0 w-full mt-2 bg-transparent z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between rounded-full bg-white bg-opacity-40 backdrop-blur-xl border border-gray-300 shadow-md py-2 px-6">
            <div className="flex items-center flex-grow ml-[-18px] px-0">
              <img
                src={
                  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                }
                style={logoStyle}
                alt="logo of sitemark"
              />
              <nav className="hidden md:flex space-x-4 ml-4">
                <button
                  onClick={() => scrollToSection('features')}
                  className="py-1.5 px-3 text-gray-700"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="py-1.5 px-3 text-gray-700"
                >
                  Testimonials
                </button>
                <button
                  onClick={() => scrollToSection('highlights')}
                  className="py-1.5 px-3 text-gray-700"
                >
                  Highlights
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="py-1.5 px-3 text-gray-700"
                >
                  Pricing
                </button>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="py-1.5 px-3 text-gray-700"
                >
                  FAQ
                </button>
              </nav>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              <a
                href="/material-ui/getting-started/templates/sign-in/"
                target="_blank"
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Sign in
              </a>
              <a
                href="/material-ui/getting-started/templates/sign-up/"
                target="_blank"
                className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full hover:bg-blue-700"
              >
                Sign up
              </a>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleDrawer(true)}
                className="text-primary min-w-[30px] p-1"
              >
                <MenuIcon />
              </button>
              <div
                className={`fixed top-0 right-0 h-full bg-white p-4 transition-transform ${
                  open ? 'transform translate-x-0' : 'transform translate-x-full'
                }`}
              >
                <div className="flex flex-col items-end">
                  <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                </div>
                <button
                  onClick={() => scrollToSection('features')}
                  className="w-full text-left py-2 text-gray-700"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="w-full text-left py-2 text-gray-700"
                >
                  Testimonials
                </button>
                <button
                  onClick={() => scrollToSection('highlights')}
                  className="w-full text-left py-2 text-gray-700"
                >
                  Highlights
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="w-full text-left py-2 text-gray-700"
                >
                  Pricing
                </button>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="w-full text-left py-2 text-gray-700"
                >
                  FAQ
                </button>
                <hr className="my-2" />
                <a
                  href="/material-ui/getting-started/templates/sign-up/"
                  target="_blank"
                  className="w-full text-center bg-blue-500 text-white py-2 rounded-full hover:bg-blue-700"
                >
                  Sign up
                </a>
                <a
                  href="/material-ui/getting-started/templates/sign-in/"
                  target="_blank"
                  className="w-full text-center border border-blue-500 text-blue-500 py-2 rounded-full hover:bg-blue-500 hover:text-white"
                >
                  Sign in
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

Navbar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Navbar;
