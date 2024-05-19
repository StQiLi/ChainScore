import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Error from './pages/Error';
import Dashboard from './pages/Dashboard';
import Lookup from './pages/Lookup';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/Login';
import { AuroraBackground} from './components/ui/aurora-background';
import { FloatingNav } from './components/ui/floating-navbar';

const navItems = [
  { name: 'Home', link: '/'},
  { name: 'Dashboard', link: '/dashboard'},
  { name: 'Lookup', link: '/lookup' },
];

function App() {
  const [user, setUser] = useState("stanley");
  return (
    <BrowserRouter>
      <div className="w-full h-full">
        <FloatingNav navItems={navItems}/>
        <AuroraBackground>
    
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />
          <Route path='/lookup' element ={<Lookup/> }></Route>

        </Routes>  

        </AuroraBackground>  
      </div>
    </BrowserRouter>
  );
}

export default App;