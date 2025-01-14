
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    const name = from.name.value
    const email = from.email.value
    const newUser = {name,email};

    fetch('http://localhost:5000/users',{
      method:"POST",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(result => {
      if(result.result.insertedId){
        alert("New user Added");
        const newData = [...users,result.data];
        setUsers(newData);
        from.reset();
      };    
    });

  };


  const handleDelete = (id) => {
    fetch(`http://localhost:5000/user-delete/${id}`,{
      method:"DELETE"
    })
    .then(res => res.json())
    .then(result => {
      if(result.deletedCount>0){
        alert("User Deleted!!");
        const filter = users.filter(singleUser => singleUser._id !== id);
        setUsers(filter);
      };

    });
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
        users.map(singleUser => <p key={singleUser._id}>Name : {singleUser.name}, Email : {singleUser.email} <button onClick={()=>handleDelete(singleUser._id)}>X</button><Link to={`/user-details/${singleUser._id}`}><button>details</button></Link><Link to={`/update/${singleUser._id}`}><button>update</button></Link></p>)
      }
    </>
  )
}

export default App
