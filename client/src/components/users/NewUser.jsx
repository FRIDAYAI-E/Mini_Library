import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function NewUser() {
  const [status, setStatus] = useState("start");
  let history = useHistory();

  const createNewUser = async (newUser) => {
    await axios.post("/api/user", newUser).then((res) => {
      console.log(res.data);
    });
  };

  const checkUser = async (user) => {
    await axios
      .post("/api/user/check", { username: user.username, email: user.email })
      .then((res) => {
        if (res.data[0] === undefined) {
          setStatus("available");
          createNewUser({
            username: user.username,
            password: user.password,
            email: user.email,
            role: user.role,
          });
          history.push("/login");
        } else {
          setStatus("unavailable");
        }
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userDetails = {
      username: event.target.username.value,
      password: event.target.password.value,
      email: event.target.email.value,
      role: "user",
    };
    checkUser(userDetails);
  };

  return (
    <div>
      <h1>Create new User </h1>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username (required)" />
        <input name="password" placeholder="Password (required)" />
        <input name="email" placeholder="Email (required)" />

        <button>Create New User</button>
      </form>

      {status === "unavailable" ? (
        <h5>Sorry the username/email is taken </h5>
      ) : null}
    </div>
  );
}

export default NewUser;
