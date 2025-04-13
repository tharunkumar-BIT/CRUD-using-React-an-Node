const express = require("express")
const cors = require("cors")
const users = require("./sample.json")
const app = express();
const port = 8000;

app.use(cors());

app.get("/",(req,res)=>{
    res.send("You are in TK's Server page")
})

app.get("/users", (req,res)=>{
    return res.json(users)
});

app.listen(port, (err) => {
    if (err) console.error(err)
    console.log("App is running in " + port)
});

