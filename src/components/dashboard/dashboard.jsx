import React,{useCallback} from 'react';

import { Frame, Navigation,TextStyle } from "@shopify/polaris";
import { HomeMinor, ProductsMinor } from "@shopify/polaris-icons";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Grid from "../grid/grid"

import { Outlet, useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate=useNavigate();

  const navigationItems = [
    {
      label: "Home",
      icon: HomeMinor,
      onClick:()=>navigate("/panel")
    },
    {
      label: "Products",
      icon: ProductsMinor,
      onClick:()=>navigate("/panel/products")
    },
    {
      label: "Grid 2",
      icon: ProductsMinor,
      onClick:()=>navigate("/panel/grid2")
    },
    {
      label: "Grid",
      icon: ProductsMinor,
      onClick:()=>navigate("/panel/grid")
    },
  ];
  const navigation=()=>{
    return(
      <Navigation location="/">
      <Navigation.Section items={navigationItems} />
    </Navigation>
    )
  }

  return (
    <>
      <Frame navigation={navigation()}>
      <Routes>
        <Route path="grid" element={<Grid />} />
        <Route path="products" element={<TextStyle variation="negative">The Page you are looking for is under construction</TextStyle>} />
        <Route path="grid2" element={<TextStyle variation="negative">The Page you are looking for is under construction</TextStyle>} />
      </Routes>
        {/* <Outlet /> */}
      </Frame>
    </>
  );
}

export default Dashboard;