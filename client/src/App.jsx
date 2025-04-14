import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "", age: "", city: "" });

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

  //delete function
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      `Are you sure!! Do you want to delete ${users.id}`
    );
    if (isConfirmed) {
      await axios.delete(`http://localhost:8000/users/${id}`).then((res) => {
        setUsers(res.data);
        setFilterUsers(res.data);
      });
    }
  };

  //add user function
  const handleAddRecord = () => {
    setUserData({ name: "", age: "", city: "" });
    setIsModelOpen(true);
  };

  const handleData = (e) => {
    setUserData({...userData,[e.target.name] : e.target.value});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/users",userData).then((res)=>{
      console.log(res);
    })
  }

  //close model
  const closeModel = () => {
    setIsModelOpen(false);
    getUsers();
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
          <button className="btn green" onClick={handleAddRecord}>
            Add Record
          </button>
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
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.city}</td>
                    <td>
                      <button className="btn green">Edit</button>
                    </td>
                    <td>
                      <button
                        className="btn red"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isModelOpen && (
          <div className="model">
            <div className="model-content">
              <span className="close" onClick={closeModel}>
                &times;
              </span>
              <h3>User Record</h3>

              <div className="input-group">
                <label htmlFor="name">Full name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={userData.name}
                  onChange={handleData}
                  placeholder="Enter name"
                />
              </div>
              <div className="input-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={userData.age}
                  onChange={handleData}
                  placeholder="Enter age"
                />
              </div>
              <div className="input-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={userData.city}
                  onChange={handleData}
                  placeholder="Enter city"
                />
              </div>
              <button className="btn green" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
