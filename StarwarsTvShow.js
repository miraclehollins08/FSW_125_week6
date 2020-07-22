const express = require('express')
const StarwarsTvShow = express.Router()
const uuid = require("uuid/v4")

// middleware //
StarwarsTvShow.use(express.json())

// fake database //
const StarWaries = [
    { title:"Darth Vader", Living:"False", Bounty_Amount:"$100,000,000", Type:"Sith", _id: uuid() },
    { title:"Luke Skywaler", Living:"True", Bounty_Amount:"$900,000.000", Type:"Jedi", _id: uuid()},
    { title:"Master Yoda", Living:"True", Bounty_Amount:"$800,000.000", Type:"Jedi", _id: uuid() }
]


// Get All 
StarwarsTvShow.get("/", (req, res) => {
    res.status(200)
    res.send(StarWaries)
})

// Get One
StarwarsTvShow.get("/:StarWariesId", (req, res) => {
    const StarWariesId = req.params.StarWariesId
    const foundStarWaries = StarWaries.find(starwaries => starwaries._id === StarWariesId)
    if(!foundStarWaries){
        const err = new Error(`The item with id ${StarWariesId} was not found. `)
        res.status(500)
        return next(error)
    }
    res.status(200).send(foundStarWaries)
})

// Get by Type
StarwarsTvShow.get("/search/Type", (req, res) => {
    const Type = req.query.Type
    if(!Type){
        const error = new Error("You must provide a Type")
        res.status(500)
        return next(error)
    }
    const filteredStarWaries = StarWaries.filter(starwaries => starwaries.Type === Type)
    res.status(200).send(filteredStarWaries)
})

// Post One 
StarwarsTvShow.post("/", (req, res) => {
    const newStarWaries = req.body
    newStarWaries._id = uuid()
    StarWaries.push(newStarWaries)
    res.status(201).send(newStarWaries)
})

// Delete
StarwarsTvShow.delete("/:StarWariesId", (req,res) => {
    const StarWariesId = req.params.StarWariesId
    const StarWariesIndex = StarWaries.findIndex(starwaries => starwaries._id === StarWariesId)
    StarWaries.splice(StarWariesIndex, 1)
    res.send("Successfully delete starwaries!")
})

// Update one
StarwarsTvShow.put("/:StarWariesId", (req, res) => {
const StarWariesId = req.params.StarWariesId
const StarWariesIndex = StarWaries.findIndex(starwaries => starwaries._id === StarWariesId)
const updatedstarwaries = Object.assign(StarWaries[StarWariesIndex], req.body)
res.status(201).send(updatedstarwaries)
})

module.exports = StarwarsTvShow