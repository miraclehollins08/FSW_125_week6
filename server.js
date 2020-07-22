const express = require("express")
const app = express()
const uuid = require("uuid/v4")

// middleware (for every request) //

app.use(express.json())

// fake data //

const starwars = [
    { title:"Luke Skywalker", Living: "True", Bounty_Amount: "$900,000.000", Type: "Jedi", _id: uuid() },
    { title:"Darth Vader", Living: "False", Bounty_Amount: "$100,000.000", TYpe: "Sith", _id: uuid() },
    { title:"Master Yoda", Living: "True", Bounty_Amount: "$800,000.000", Type: "Jedi", _id: uuid() },
    { title:"Darth Sidious", Living: "False", Bounty_Amount: "$500,000.000", TYpe: "Sith", _id: uuid() }
]

// Routes //

app.use("/bounties", require("./routes/bountyRouter.js"))
app.use("/StarWaries", require("./routes/StarwarsTvShow.js"))
app.use("/ToDo", require("./routes/ToDo.js"))

app.get("/starwars", (req, res)=> {
    res.send(StarWaries)
})

app.post("/starwars", (req,res) => {
    const newStarwars = req.body
    newStarwars._id = uuid()
    starwars.push(newStarwars)
    res.send("Succesccfully added ${newStarwars.title} to the database!")
})

// Error handler

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

// Server Listen //
app.listen(9000, () => {
    console.log("The server is running on Port 9000")
})