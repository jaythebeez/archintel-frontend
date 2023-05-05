import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';


import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Menubar from './components/layout/Menubar';
import DashboardApp from './pages/app/DashboardApp';

import { useAppSelector } from './store/hooks';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const {user} = useAppSelector(state=>state)

  return (
    <div className="App">
      {/* <Menubar /> */}
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/app/*' element={<DashboardApp />} />
        </Route>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
