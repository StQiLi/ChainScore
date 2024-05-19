import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Error from './pages/Error';
import Dashboard from './pages/Dashboard';
import Lookup from './pages/Lookup';
import ProtectedRoute from './pages/ProtectedRoute';
import { AuroraBackground} from './components/ui/aurora-background';
import { FloatingNav } from './components/ui/floating-navbar';

const navItems = [
  { name: 'Home', link: '/'},
  { name: 'Dashboard', link: '/dashboard'},
  { name: 'Lookup', link: '/lookup' },
];

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <div>

        <FloatingNav navItems={navItems}/>
        <AuroraBackground>
      

        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route
              path='dashboard'
              element={
                <ProtectedRoute user={user}>
                  <Dashboard user={user} />
                </ProtectedRoute>
              }
            />
            <Route path='/lookup' element={<Lookup />} />
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
        

        </AuroraBackground>

        

        
      </div>
    </BrowserRouter>
  );
}

export default App;