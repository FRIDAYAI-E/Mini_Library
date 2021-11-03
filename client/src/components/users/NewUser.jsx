import React from "react";
import axios from "axios"

function NewUser() {
    
    const createNewUser = async (newUser) =>{
        await axios.post("/api/user", newUser)
        .then(res=>{
            console.log(res.data)
        })
    }


    const handleSubmit = (event) =>{
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const email = event.target.email.value
        const role = "user"
        createNewUser({username: username, password: password, email: email, role: role})
    }


  return (
    <div>
      <h1>Create new User </h1>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="username" />
        <input name="password" placeholder="Password" />
        <input name="email" placeholder="Email" />

        <button>Create New User</button>
      </form>
    </div>
  );
}

export default NewUser;
