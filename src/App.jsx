
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {

  const [users,setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => {
          setUsers(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
  },[]);

   
  const handleAddUser = (e) => {
    e.preventDefault();
    const from = e.target 
    const id = users.length + 1
    const name = from.name.value
    const email = from.email.value
    const newUser = {id,name,email};

    fetch('http://localhost:5000/users',{
      method:"POST",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(result => {
      console.log("success");
      const newArry = [...users,result];
      setUsers(newArry);
      from.reset(); 
    })

  };

  return (
    <>
      <h1>User Management System</h1>
      <form onSubmit={handleAddUser}>
        <label htmlFor="">Name : </label>
        <input name='name' type="text" /> <br />
        <label htmlFor="">Email : </label>
        <input name='email' type="email" /> <br />
        <input type="submit" />
      </form>
      <h3>Number of Users : {users.length}</h3>
      {
        users.map(singleUser => <p key={singleUser.id}>Name : {singleUser.name}, Email : {singleUser.email}</p>)
      }
    </>
  )
}

export default App
