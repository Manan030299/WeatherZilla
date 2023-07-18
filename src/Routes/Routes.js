import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {PrivateRoutes} from './PrivateRoutes';
import {SignIn} from '../components/login/SignIn';
import {SignUp} from '../components/login/SignUp';
import {Dashboard} from '../components/dashboard/Dashboard';
import {Favourite} from '../components/dashboard/Favourite';

export const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/login' element={<SignIn />} />
          <Route path='/' element={<Navigate to= '/login' />} />
          <Route path='/signup' element={<SignUp />} />

          <Route element={<PrivateRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/favourite-locations' element={<Favourite />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
