import React from 'react';
import './App.css';

import "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

import Grid from './components/grid/grid';
import LogIn from './components/login/login';
import NotFound from './components/notfound/notfound';
import Dashboard from './components/dashboard/dashboard';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {

    const headingsContext=[
    {
      nomenClature: "_id",
      name: "ID",
      visible: true,
    },
    {
      nomenClature: "state",
      name: "State",
      visible: true,
    },
    {
      nomenClature: "user_id",
      name: "User Id",
      visible: true,
    },
    {
      nomenClature: "user_ids",
      name: "User Ids",
      visible: true,
    },
    {
      nomenClature: "username",
      name: "Username",
      visible: true,
    },
    {
      nomenClature: "id",
      name: "Id",
      visible: true,
    },
    {
      nomenClature: "catalog",
      name: "Catalog",
      visible: true,
    },
    {
      nomenClature: "email",
      name: "Email",
      visible: true,
    },
    {
      nomenClature: "shop_id",
      name: "Shop Id",
      visible: true,
    },
    {
      nomenClature: "shop_url",
      name: "Shop URL",
      visible: true,
    },
    {
      nomenClature: "created_at",
      name: "Created At",
      visible: true,
    },
    {
      nomenClature: "updated_at",
      name: "Updated At",
      visible: true,
    },
    {
      nomenClature: "shopify_plan",
      name: "Shopify Plan",
      visible: true,
    },
    // {
    //   nomenClature: "shopify",
    //   name: "Shopify",
    //   visible: true,
    // },
  ];

  sessionStorage.setItem("HeadingContext",JSON.stringify(headingsContext));
  
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
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;