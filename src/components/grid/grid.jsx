import React, { useState, useCallback, useEffect } from 'react';

import { Card, Stack, Button, Page } from '@shopify/polaris';

import Range from '../../utils/range/Range';
import CheckBox from '../../utils/checkbox/Checkbox';
import MovePages from '../../utils/move_pages/MovePages';
import ListTable from '../../utils/list_table/ListTable';

function Grid() {

  const [viewColumns, setViewColumns] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rangeValue, setRangeValue] = useState("10");
  const [heading, setHeading] = useState([]);
  const [count, setCount] = useState(0);
  const [datas, setData] = useState([]);

  useEffect(() => {
    const HeadContext = JSON.parse(sessionStorage.getItem("HeadingContext"));
    const x = HeadContext.map(e => e.nomenClature);
    setHeading(x);
  }, []);


  const handleRange = useCallback((newValue) => { setRangeValue(newValue) }, []);

  useEffect(() => {
    fetch(`https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${currentPage}&count=${rangeValue}`, {
      method: "GET",
      headers: {
        'Authorization': JSON.parse(localStorage.getItem("AuthToken")),
      }
    }).then((response) => response.json()).then((response) => {
      if (response.success) {
        setData(response.data.rows);
        setCount(response.data.count);
      }
    })
  }, [currentPage, rangeValue])


  const handlePageChange = useCallback((newValue) => {
    if (newValue == "Next") {
      setCurrentPage(currentPage + 1);
    }
    else if (newValue == "Previous" && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
    else {
      alert("You cannot go beyond this!");
    }
  }, [currentPage]);

  const HeadContext = JSON.parse(sessionStorage.getItem("HeadingContext"));

  let updatedHeading=[];
  let updatedRow=[];
  const handleAllCheckBox = (checkName, status) => {
    if(status==false){
      for(let i=0;i<HeadContext.length;i++){
        if(HeadContext[i]["name"]==checkName){
          HeadContext[i]["visible"]=false;
        }
      }      
    }
    else{
      for(let i=0;i<HeadContext.length;i++){
        if(HeadContext[i]["name"]==checkName){
          HeadContext[i]["visible"]=true;
        }
      } 
    }
    sessionStorage.setItem("HeadingContext",JSON.stringify(HeadContext));
    for(let i=0;i<HeadContext.length;i++){
      if(HeadContext[i]["visible"]!=false){
        updatedHeading.push(HeadContext[i]["nomenClature"]);
      }
    }

    setHeading(updatedHeading);
    updatedHeading=[];
    // updatedRow=[]
  }

    for (let i=0;i<datas.length;i++){
      let newRow=[]
      for(let j=0;j<heading.length;j++){
        if(datas[i][heading[j]]==null){
          newRow.push("");  
        }
        else{
          newRow.push(datas[i][heading[j]]);
        }
      }
      updatedRow.push(newRow);
    }
  
    // console.log(updatedRow);


  return (
    <Page>
      <Card title="Sales by product" sectioned>
        <p>Showing from {currentPage} to {Math.ceil(count / rangeValue)} of {count} users </p>
        <Stack>

          <MovePages handlePage={handlePageChange} />
          <Range handleRange={handleRange} />
          <Button onClick={() => setViewColumns(!viewColumns)}>{viewColumns ? "Hide Columns" : "View Columns"}</Button>

        </Stack>

        <Stack>
          {viewColumns ? HeadContext.map((item) => <CheckBox key={item.nomenClature} name={item.name} handleCheckBox={handleAllCheckBox} status={item.visible} />) : <></>}
        </Stack>

        {datas.length > 0 && <ListTable
          headings={heading}
          actualData={updatedRow}
        />}
        {updatedRow=[]}
      </Card>
    </Page>

  );
}
export default Grid;








// ======================================== Ashish Sir's Code ==============================




// import React, { useState, useCallback, useEffect, createContext } from "react";

// import { Card, Stack, Button, Page } from "@shopify/polaris";

// import Range from "../../utils/range/Range";
// import CheckBox from "../../utils/checkbox/Checkbox";
// import MovePages from "../../utils/move_pages/MovePages";
// import ListTable from "../../utils/list_table/ListTable";

// function Grid() {
//   const [viewColumns, setViewColumns] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rangeValue, setRangeValue] = useState("10");
//   const [checklist, setChecklist] = useState([]);
//   const [heading, setHeading] = useState([]);
//   const [rowData, setRowData] = useState([]);
//   const [count, setCount] = useState(0);
//   const [datas, setData] = useState([]);

//   const [headingsContext, setHeadingContext] = useState([
//     {
//       nomenClature: "_id",
//       name: "ID",
//       visible: false,
//     },
//     {
//       nomenClature: "state",
//       name: "State",
//       visible: false,
//     },
//     {
//       nomenClature: "user_id",
//       name: "User Id",
//       visible: false,
//     },
//     {
//       nomenClature: "user_ids",
//       name: "User Ids",
//       visible: false,
//     },
//     {
//       nomenClature: "username",
//       name: "Username",
//       visible: false,
//     },
//     {
//       nomenClature: "id",
//       name: "Id",
//       visible: false,
//     },
//     {
//       nomenClature: "catalog",
//       name: "Catalog",
//       visible: false,
//     },
//     {
//       nomenClature: "email",
//       name: "Email",
//       visible: false,
//     },
//     {
//       nomenClature: "shop_id",
//       name: "Shop Id",
//       visible: false,
//     },
//     {
//       nomenClature: "shop_url",
//       name: "Shop URL",
//       visible: false,
//     },
//     {
//       nomenClature: "created_at",
//       name: "Created At",
//       visible: false,
//     },
//     {
//       nomenClature: "updated_at",
//       name: "Updated At",
//       visible: false,
//     },
//     {
//       nomenClature: "shopify_plan",
//       name: "Shopify Plan",
//       visible: true,
//     },
//     // {
//     //   nomenClature: "shopify",
//     //   name: "Shopify",
//     //   visible: true,
//     // },
//   ]);

//   useEffect(() => {
//     if (datas.length > 0) {
//       let consolidatedData = [];
//       let headingAll = [];
//       datas.forEach((data) => {
//         let temprow = [];
//         Object.keys(data).forEach((key) => {
//           headingsContext.forEach((heading) => {
//             if (heading.nomenClature == key && heading.visible) {
//               temprow.push(data[heading.nomenClature]);
//             }
//           });
//         });
//         consolidatedData.push(temprow);
//       });
//       headingsContext.forEach((heading) => {
//         if (heading.visible) {
//           headingAll.push(heading.nomenClature);
//         }
//       });
//       setHeading(headingAll);
//       setRowData(consolidatedData);
//       // console.log(consolidatedData);
//     }
//   }, [headingsContext, datas]);

//   const handleRange = useCallback((newValue) => {
//     setRangeValue(newValue);
//   }, []);

//   useEffect(() => {
//     fetch(
//       `https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${currentPage}&count=${rangeValue}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: JSON.parse(localStorage.getItem("AuthToken")),
//         },
//       }
//     )
//       .then((response) => response.json())
//       .then((response) => {
//         if (response.success) {
//           setData(response.data.rows);
//           setCount(response.data.count);
//         }
//       });
//   }, [currentPage, rangeValue]);

//   const handlePageChange = useCallback(
//     (newValue) => {
//       if (newValue == "Next") {
//         setCurrentPage(currentPage + 1);
//       } else if (newValue == "Previous" && currentPage > 1) {
//         setCurrentPage(currentPage - 1);
//       } else {
//         alert("You cannot go beyond this!");
//       }
//     },
//     [currentPage]
//   );

//   const handleAllCheckBox = (checkName) => {
//     let temp = [...headingsContext];
//     temp.forEach((value) => {
//       if (value.name == checkName) {
//         value.visible = !value.visible;
//       }
//     });
//     console.log(temp);
//     setHeadingContext(temp);
//   };

//   return (
//     <Page>
//       <Card title="Sales by product" sectioned>
//         <p>
//           Showing from {currentPage} to {Math.ceil(count / rangeValue)} of{" "}
//           {count} users{" "}
//         </p>
//         <Stack>
//           <MovePages handlePage={handlePageChange} />
//           <Range handleRange={handleRange} />
//           <Button onClick={() => setViewColumns(!viewColumns)}>
//             {viewColumns ? "Hide Columns" : "View Columns"}
//           </Button>
//         </Stack>

//         <Stack>
//            {/* {viewColumns ? non_object_keys.map((item) => <CheckBox key={item} name={item} handleCheckBox={handleAllCheckBox} status={true} />) : <></> */}
//           {viewColumns ? (
//             headingsContext.map((item) => (
//               <CheckBox
//                 key={item.nomenClature}
//                 name={item.name}
//                 handleCheckBox={(value) => handleAllCheckBox(value)}
//                 status={item.visible}
//               />
//             ))
//           ) : (
//             <></>
//           )}
//         </Stack>
//         {/ {datas.length > 0 && console.log("Data is Ready")} /}

//         {datas.length > 0 && (
//           <ListTable
//             // headings={Object.keys(datas[0])}
//             headings={heading}
//             // headings={heading.length==0?Object.keys(datas[0]):heading}
//             // headings={non_object_keys}
//             actualData={rowData}
//             // actualData={consolidatedData}
//             // actualData={JSON.parse(sessionStorage.getItem("UpdatedRowData"))}
//           />
//         )}
//       </Card>
//     </Page>
//   );
// }
// export default Grid;