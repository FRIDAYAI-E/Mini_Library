import React from "react";
import { NavLink } from "react-router-dom";
// import BrowseBooks from './BrowseBooks';
import UserDueTable from "./UserDueTable";
import UserFines from "./UserFines";
import {useEffect, useState} from "react"
import axios from "axios"

function userDashboard() {
  const [status, setStatus] = useState("pending");
  const [loanData, setLoanData] = useState();
  
  useEffect(() => {
    const getData = async() => {
      try{
        const response = await axios.get(`/api/onloan`)
        setStatus("loading")
        console.log("response", response.data)
        setLoanData(response.data)
        setStatus("resolved")
      } catch (error) {
        console.log("error", error)
      }
    };
    getData()    
  }, []);
  
  console.log("loanData", loanData)
  return (
    <>
      <div>
        <NavLink to={"/browsebooks"}>
          <button>Browse Books!</button>
        </NavLink>
        {status === "resolved" ? (
        <UserDueTable loanData={loanData}  />
      ) : (
        <h1>Loading</h1>
      )}
        {/* <UserDueTable /> */}
        <UserFines />
        <h1>Network status: {status}</h1>
      </div>
    </>
  );
}

export default userDashboard;
