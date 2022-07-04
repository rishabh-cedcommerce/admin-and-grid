import React, { useState, useCallback, useEffect, createContext } from 'react';

import { Card, Stack, Button, Page } from '@shopify/polaris';

import Range from '../../utils/range/Range';
import CheckBox from '../../utils/checkbox/Checkbox';
import MovePages from '../../utils/move_pages/MovePages';
import ListTable from '../../utils/list_table/ListTable';

function Grid() {

  const [viewColumns, setViewColumns] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rangeValue, setRangeValue] = useState("10");
  const [checklist, setChecklist] = useState([]);
  const [heading,setHeading]=useState([]);
  const [rowData,setRowData]=useState([]);
  const [count, setCount] = useState(0);
  const [datas, setData] = useState([]);

  const headingsContext=[
    {
      nomenClature:"_id",
      name:"ID",
      visible:true
    },
    {
      nomenClature:"state",
      name:"State",
      visible:true
    },
    {
      nomenClature:"user_id",
      name:"User Id",
      visible:true
    },
    {
      nomenClature:"user_ids",
      name:"User Ids",
      visible:true
    },
    {
      nomenClature:"username",
      name:"Username",
      visible:true
    },
    {
      nomenClature:"id",
      name:"Id",
      visible:true
    },
    {
      nomenClature:"catalog",
      name:"Catalog",
      visible:true
    },
    {
      nomenClature:"email",
      name:"Email",
      visible:true
    },
    {
      nomenClature:"shop_id",
      name:"Shop Id",
      visible:true
    },
    {
      nomenClature:"shop_url",
      name:"Shop URL",
      visible:true
    },
    {
      nomenClature:"created_at",
      name:"Created At",
      visible:true
    },
    {
      nomenClature:"updated_at",
      name:"Updated At",
      visible:true
    },
    {
      nomenClature:"shopify_plan",
      name:"Shopify Plan",
      visible:true
    },
    {
      nomenClature:"shopify",
      name:"Shopify",
      visible:true
    },
  ];
  
  useEffect(()=>{
    const x=headingsContext.map(e=>e.nomenClature);
    setHeading(x);


    // if(datas.length>0){
    //   let newSessionData=JSON.parse(sessionStorage.getItem("HeadingContext"));
    //   let consolidatedData=[];
      
    //   for (let i=0;i<datas.length;i++){
    //     let newData=[];
    //     for (let j=0;j<newSessionData.length;j++){
    //       if(newSessionData[j]["visible"]==true){
    //         newData.push(datas[i][newSessionData[j]["nomenClature"]])
    //       }
    //     }
    //     consolidatedData.push(newData)
    //   }
    //   setRowData(consolidatedData);
    // }

    // if(datas.length>0){
    //   let formattedData = [];
    //   for (let i = 0; i < datas.length; i++) {
    //     let temp = [];
    //     for (let j = 0; j < heading.length; j++) {
    //       temp.push(datas[i][heading[j]]);
    //     }
    //     formattedData.push(temp);
    //   }
    //   setRowData(formattedData);
    // }
    
  },[]);

  sessionStorage.setItem("HeadingContext",JSON.stringify(headingsContext));

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


  // let non_object_keys = [];
  // if (datas.length > 0) {
  //   let keys = Object.keys(datas[0]);
  //   for (let j = 0; j < keys.length; j++) {
  //     if (typeof (datas[0][keys[j]]) != 'object') {
  //       non_object_keys.push(keys[j]);
  //       // console.log("count");
  //     }
  //   }
  // }

  const HeadContext=JSON.parse(sessionStorage.getItem("HeadingContext"));

  const handleAllCheckBox = (checkName, status) => {
    let updatedHeadings=[];
    let updatedRows=[];
    let newRow=[];
    if(status==false){
      for(let i =0;i<HeadContext.length;i++){
        if(HeadContext[i]["name"]==checkName){
          HeadContext[i]["visible"]=false;
        }
      }
    }
    else{
      for(let i =0;i<HeadContext.length;i++){
        if(HeadContext[i]["name"]==checkName){
          HeadContext[i]["visible"]=true;
        }
      };
    }

    // Updating Session Data as per visibility of headings

    sessionStorage.setItem("HeadingContext",JSON.stringify(HeadContext));
    
    // Updating Heading as per visibility of headings

    let newSessionData=JSON.parse(sessionStorage.getItem("HeadingContext"));
    for(let i=0;i<newSessionData.length;i++){
      if(newSessionData[i]["visible"]==true){
        updatedHeadings.push(newSessionData[i]["nomenClature"]);
      }
    }
    console.log(updatedHeadings);
    setHeading(updatedHeadings);

    let consolidatedData=[];
    
    for (let i=0;i<datas.length;i++){
      let newData=[];
      for(let j=0;j<updatedHeadings.length;j++){
        newData.push(datas[i][heading[j]])
      }
      consolidatedData.push(newData)
    }
    // setRowData(consolidatedData);
    // console.log(consolidatedData)

  }


  // let consolidatedData=[];
  //   if(datas.length>0){
  //     let newSessionData=JSON.parse(sessionStorage.getItem("HeadingContext"));
      
  //     for (let i=0;i<datas.length;i++){
  //       let newData=[];
  //       for (let j=0;j<newSessionData.length;j++){
  //         if(newSessionData[j]["visible"]==true){
  //           newData.push(datas[i][newSessionData[j]["nomenClature"]])
  //         }
  //       }
  //       consolidatedData.push(newData);
  //     }
  //     // setRowData(consolidatedData);
  //     console.log(consolidatedData);
  //   }
  


    // let consolidatedData=[];
    
    // for (let i=0;i<datas.length;i++){
    //   let newData=[];
    //   for(let j=0;j<heading.length;j++){
    //     newData.push(datas[i][heading[j]])
    //   }
    //   consolidatedData.push(newData)
    // }
    // // setRowData(consolidatedData);
    // console.log(consolidatedData)


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
          {/* {viewColumns ? non_object_keys.map((item) => <CheckBox key={item} name={item} handleCheckBox={handleAllCheckBox} status={true} />) : <></>} */}
          {viewColumns ? HeadContext.map((item) => <CheckBox key={item.nomenClature} name={item.name} handleCheckBox={handleAllCheckBox} status={item.visible} />) : <></>}
        </Stack>
        {/* {datas.length > 0 && console.log("Data is Ready")} */}

        {datas.length > 0 && <ListTable
          // headings={Object.keys(datas[0])}
          headings={heading}
          // headings={heading.length==0?Object.keys(datas[0]):heading}
          // headings={non_object_keys}
          actualData={rowData}
          // actualData={consolidatedData}
          // actualData={JSON.parse(sessionStorage.getItem("UpdatedRowData"))}
        />}

      </Card>
    </Page>

  );
}
export default Grid;
