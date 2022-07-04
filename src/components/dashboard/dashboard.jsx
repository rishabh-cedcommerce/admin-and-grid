import React from 'react';

import { Frame, Navigation } from "@shopify/polaris";
import { HomeMinor, ProductsMinor } from "@shopify/polaris-icons";

import { Outlet,Navigate, Routes,Route, useNavigate } from 'react-router-dom';

function Dashboard() {
  // const navigate=useNavigate();

  const navigationItems = [
    {
      url: "/dashboard",
      label: "Home",
      icon: HomeMinor,
      // onclick:navigate("/dashboard")
    },
    {
      url: "/dashboard/products",
      label: "Products",
      icon: ProductsMinor,
    },
    {
      url: "/dashboard/grid2",
      label: "Grid 2",
      icon: ProductsMinor,
    },
    {
      url: "/dashboard/grid",
      label: "Grid",
      icon: ProductsMinor,
      // onclick:navigate("/dashboard/grid")
    },
  ];

  return (
      <Frame>
        <Navigation location="/">
          <Navigation.Section items={navigationItems} />
        </Navigation>
        <Outlet />
       

      </Frame>
  );
}

export default Dashboard;