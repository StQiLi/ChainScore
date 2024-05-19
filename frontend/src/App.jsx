import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Error from './pages/Error';
import Dashboard from './pages/Dashboard';
import Lookup from './pages/Lookup';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <div>
        <Navbar mode= 'light'/>
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
          <Route path='/Login' element ={<Login/> }>

          </Route>
          <Route path='/lookup' element ={<Lookup/> }>
            
          </Route>
          <Route path='*' element={<Error />} />
        </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;