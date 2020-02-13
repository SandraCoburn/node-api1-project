import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then(res => {
        console.log("These are the users:", res.data);
        setUsers(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const deleteUser = user => {
    axios
      .delete(`http://localhost:5000/api/users/${user.id}`)
      .then(res => {
        console.log("deleted", res);
        setUsers([...users]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      {users.map(user => {
        return (
          <div key={user.id}>
            <ul>
              <li>Name: {user.name}</li>
              <li>Bio: {user.bio}</li>
              <button
                onClick={e => {
                  e.stopPropagation();
                  deleteUser(user);
                }}
              >
                delete
              </button>
            </ul>
          </div>
        );
      })}
    </div>
  );
};
export default Users;
