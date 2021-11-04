import React from "react";
import { NavLink } from "react-router-dom";
import UserDueTable from "./UserDueTable";
import UserFines from "./UserFines";
import { useEffect, useState } from "react";
import axios from "axios";
import { sessionAtom } from "../LoginPage"
import { useAtom } from 'jotai'
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar";



function userDashboard() {
  const [status, setStatus] = useState("pending");
  const [loanData, setLoanData] = useState();
  
    const data = useAtom(sessionAtom)[0]
    const userID = data?.loginUser?._id
    let history = useHistory()

    const isAuthenticated = () => {
      if(data.loginUser === undefined) {
        history.push("/login");
      }
    }
    isAuthenticated()

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/onloan/${userID}`);
        setStatus("loading");
        setLoanData(response.data);
        setStatus("resolved");
      } catch (error) {
        console.log("error", error);
      }
    };
    getData();
  }, []);


  return (
    <>
      <div>
      <Navbar />
        {data.loginUser === undefined ?
          ( null ): (<h2 style={{color: "#676767"}}>Welcome {data?.loginUser?.username} </h2>)
        }
        <NavLink to={"/browsebooks"}>
          <button>Browse Books!</button>
        </NavLink>
        {status === "resolved" ? (
          <>
          <UserDueTable loanData={loanData} />
          <UserFines loanData={loanData}/>
          </>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </>
  );
}

export default userDashboard;
