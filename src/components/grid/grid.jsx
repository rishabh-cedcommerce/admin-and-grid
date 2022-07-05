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
    x.push("LogIn as User");
    x.push("View User");
    setHeading(x);
  }, []);


  const handleRange = useCallback((newValue) => { setRangeValue(newValue) }, []);

  const handleLogIn=(e)=>console.log(e);
  const handleViewUser=(e)=>console.log(e);


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

    if(updatedHeading.length>0){
      updatedHeading.push("LogIn as User");
      updatedHeading.push("View User");
    }

    setHeading(updatedHeading);
    updatedHeading=[];
  }

    for (let i=0;i<datas.length;i++){
      let newRow=[]
      for(let j=0;j<heading.length-2;j++){
        if(datas[i][heading[j]]==null){
          newRow.push("");  
        }
        else{
          newRow.push(datas[i][heading[j]]);
        }
      }

      if(heading.length>0){
        newRow.push(<Button primary onClick={()=>handleLogIn(datas[i])} >LogIn</Button>);
        newRow.push(<Button primary onClick={()=>handleViewUser(datas[i])} >View User</Button>);
      }

      updatedRow.push(newRow);
    }

    
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