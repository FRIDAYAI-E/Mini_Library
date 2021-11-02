import React from "react";
import { NavLink } from "react-router-dom";
import UserDueTable from "./UserDueTable";
import UserFines from "./UserFines";
import { useEffect, useState } from "react";
import axios from "axios";
import { sessionAtom } from "../LoginPage"
import { useAtom } from 'jotai'
import { useHistory } from "react-router-dom";


function userDashboard() {
  const [status, setStatus] = useState("pending");
  const [loanData, setLoanData] = useState();
  
    const data = useAtom(sessionAtom)[0]
    const userID = data?.loginUser?._id
    console.log("atom", data)
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
        console.log("response", response.data);
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
        {data.loginUser === undefined ?
          (null ): (<h1>Welcome : {data?.loginUser?.name} </h1>)
        }

        
        <NavLink to={"/browsebooks"}>
          <button>Browse Books!</button>
        </NavLink>
        {status === "resolved" ? (
          <UserDueTable loanData={loanData} />
        ) : (
          <h1>Loading</h1>
        )}
        <UserFines />
      </div>
    </>
  );
}

export default userDashboard;
