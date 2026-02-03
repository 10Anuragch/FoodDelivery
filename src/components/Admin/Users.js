import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const deleteUser = (email) => {
    axios.delete(`http://localhost:5000/api/admin/user/${email}`)
      .then(() => setUsers(users.filter(u => u.email !== email)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.location}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
