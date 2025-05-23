const express = require("express");
const cors = require("cors");
const fs = require("fs");
const users = require("./sample.json");
const app = express();
const port = 8000;

// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("You are in TK's Server page");
});

// fetch all users
// We are using fs.readFile here because once the users are fetched using require("./sample.json"),
// it is cached, means stored in a local storage and whenever we use users it gives the old data which is stored in the cache memory.
// if server is shutdown and again started, it gives the correct users, because the users data is cached newly.
// if fs.readFile() is used it reads the current file after updations and then gives the correct data.
app.get("/users", (req, res) => {
  fs.readFile("./sample.json", "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read users" });
    return res.json(JSON.parse(data));
  });
});

//deleting users
app.delete("/users/:id", (req, res) => {
  let id = Number(req.params.id);

  fs.readFile("./sample.json", "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read users" });

    let users = JSON.parse(data);
    let filteredUsers = users.filter((user) => user.id !== id);

    fs.writeFile("./sample.json", JSON.stringify(filteredUsers,null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to delete user" });
      return res.json(filteredUsers);
    });
  });
});

//add new user
app.post("/users", (req, res) =>{
  let {name, age, city} = req.body;
  if(!name || !age || !city){
    res.status(400).send({message: "All fields required"})
  }
  let id = Date.now();
  users.push({id,name,age,city});
  fs.writeFile("./sample.json", JSON.stringify(users,null, 2), (err) => {
    if (err) return res.status(500).json({ error: "Failed to add user" });
    return res.status(201).json({message: "User detail added successfully"});
  });
}); 

//updating user
app.patch("/users/:id", (req, res) =>{
  let id = Number(req.params.id);
  let {name, age, city} = req.body;
  if(!name || !age || !city){
    res.status(400).send({message: "All fields required"})
  }
  let index = users.findIndex((user)=> user.id == id);
  users.splice(index, 1, {...req.body});
  fs.writeFile("./sample.json", JSON.stringify(users,null, 2), (err) => {
    if (err) return res.status(500).json({ error: "Failed to update user" });
    return res.status(201).json({message: "User detail updated successfully"});
  });
});

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log("App is running in " + port);
});
