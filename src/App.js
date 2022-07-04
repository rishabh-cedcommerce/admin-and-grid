import React from 'react';
import './App.css';

import "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

import Grid from './components/grid/grid';
import LogIn from './components/login/login';
import Dashboard from './components/dashboard/dashboard';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  
  return (
    <React.Fragment>
      <BrowserRouter>
        <AppProvider i18n={enTranslations}>

          <Routes>
            <Route path="/" element={localStorage.getItem('AuthToken') ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            <Route path="login" element={localStorage.getItem("AuthToken") ? <Navigate to="/dashboard" /> : <LogIn />} />
            <Route path="dashboard" element={localStorage.getItem("AuthToken") ? <Dashboard /> : <Navigate to="/login" />} >
              <Route path="grid" element={localStorage.getItem("AuthToken") ? <Grid /> : <Navigate to="/login" />} />
            </Route>
          </Routes>

        </AppProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
