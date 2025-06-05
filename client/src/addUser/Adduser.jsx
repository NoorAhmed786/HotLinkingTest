import React from 'react';
import './Adduser.css';     
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';


const Adduser = () => {
    const users={
       name:'',
         email:'',
            address:''
    };
    const[user,setUser]=React.useState(users);
    
    const navigate = useNavigate();
    const handleChange=(e)=>{
        const { name, value } = e.target;  
        console.log(name, value);
         
        setUser({...user, [name]: value });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user', user, {
            withCredentials: true,
    }).then((response) => {
            toast.success(response.data.message,{position:"top-right"}); 
            console.log('User added:', response.data);
           
            setUser(users); 
            navigate('/');         
        }).catch((error) => {
            console.error('Error adding user:', error);     
        });
    };

  return (
    <div className="addUser">
        <Link  to="/"type="button" class="btn btn-secondary">  Back 
        </Link>
      <h3>Add New User</h3>
      <form className="addUserForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            autoComplete="off"
            placeholder="Enter your Name"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
             onChange={handleChange}
            name="email"
            autoComplete="off"
            placeholder="Enter your Email"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
             onChange={handleChange}
            name="address"
            autoComplete="off"
            placeholder="Enter your Address"
          />
        </div>
        <div className="inputGroup">
            <button type="submit" className="btn btn-primary">
          Submit
        </button>
        </div>

      
      </form>
    </div>
  );
};

export default Adduser;
