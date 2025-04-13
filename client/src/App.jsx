import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);

  const getUsers = async () => {
    await axios.get("http://localhost:8000/users").then((res) => {
      console.log(res.data);
      setUsers(res.data);
      setFilterUsers(res.data);
    });
  };

  //search function
  const handleSearchChange = (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchString) ||
        user.city.toLowerCase().includes(searchString)
    );
    setFilterUsers(filteredUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <div className="container">
        <h2>CRUD Application using React and Node</h2>
        <div className="input-search">
          <input
            type="search"
            placeholder="Enter element to Search"
            onChange={handleSearchChange}
          />
          <button className="btn green">Add Record</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterUsers &&
              filterUsers.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.city}</td>
                    <td>
                      <button className="btn green">Edit</button>
                    </td>
                    <td>
                      <button className="btn red">Delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
