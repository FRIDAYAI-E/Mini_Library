import React from "react";
import axios from "axios"

function NewUser() {
    
    const createNewUser = async (newUser) =>{
        await axios.post(`/api/user`, newUser)
        .then(res=>{
            console.log(res);
            console.log(res.data)
        })
    }


    const handleSubmit = (event) =>{
        event.preventDefault();
        const name = event.target.name.value;
        const password = event.target.password.value;
        createNewUser({name: name, password: password})
    }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="name" />
        <input name="password" placeholder="Password" />
        <button>Create New User</button>
      </form>
    </div>
  );
}

export default NewUser;
