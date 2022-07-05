import React,{useCallback} from 'react';

import { Frame, Navigation } from "@shopify/polaris";
import { HomeMinor, ProductsMinor } from "@shopify/polaris-icons";

import { Outlet, useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate=useNavigate();

  const navigationItems = [
    {
      label: "Home",
      icon: HomeMinor,
      onClick:()=>navigate("/dashboard")
    },
    {
      label: "Products",
      icon: ProductsMinor,
      onClick:()=>navigate("/dashboard/products")
    },
    {
      label: "Grid 2",
      icon: ProductsMinor,
      onClick:()=>navigate("/dashboard/grid2")
    },
    {
      label: "Grid",
      icon: ProductsMinor,
      onClick:()=>navigate("/dashboard/grid")
    },
  ];

  return (
    <>
      <Frame>
        <Navigation location="/">
          <Navigation.Section items={navigationItems} />
        </Navigation>
        <Outlet />
      </Frame>
    </>
  );
}

export default Dashboard;