import React, { useEffect } from 'react';
import './update.css';     
import { Link,useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Import toast for notifications

const Update = () => {
    const users={
       name:'',
         email:'',
            address:''
    };
    const[user,setUser]=React.useState(users);
    // const [name, setName] = React.useState('');
    const navigate = useNavigate();

    const { id } = useParams(); // Get the user ID from the URL parameters  

    const handleChange=(e)=>{
        const { name, value } = e.target;  
        console.log(name, value);
         
        setUser({...user, [name]: value });
    }
    
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${id}`)
        .then((response)=>{
            setUser(response.data); // Set the user data to the state
            console.log('User data fetched:', response.data);
        }).catch((error) => { 
            console.error('Error fetching user data:', error);
            toast.error('Failed to fetch user data',{position:"top-right"}); // Show error message         
    });
    },[id]); // Fetch user data when the component mounts or when the ID changes

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/update/user/${id}`, user, {
            withCredentials: true,
    }).then((response) => {
            toast.success(response.data.message,{position:"top-right"}); // Show success message
            console.log('User added:', response.data);
            // Optionally, you can reset the form or redirect the user
            setUser(users); // Reset the form
            navigate('/'); // Redirect to the user list page        
        }).catch((error) => {
            console.error('Error adding user:', error);     
        });
    };

  return (
    <div className="addUser">
        <Link  to="/"type="button" class="btn btn-secondary"><i class="fa-solid fa-backward"></i>  Back 
        </Link>
      <h3>Update User</h3>
      <form className="addUserForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={user.name} // Set the value from the state
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
            value={user.email}
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
            value={user.address} // Set the value from the state
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

export default Update;
