import React, { useState, useEffect } from 'react';
import './User.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
     const fetchUsers = async () => {
    try {
       const response = await axios.get('http://localhost:8000/api/users', {
  withCredentials: true,
});

      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="userTable">
        <Link to="/adduser"type="button" className="btn btn-primary">
        Add User
          
        </Link>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user,index) => (
              <tr>
                <td>{index+1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td className="action">
                  <Link to={`/update/`+user._id} className="btn btn-info">Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                   Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
