const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

const db = require('./dbConfig')

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
    res.send("welome to the Todo app server!");
});

server.get("/todos", async (req, res) => {
    const todos = db('todos')
    try {
        const todos = await db('todos');
        res.json(todos);
    } catch(err) {
        console.log(err)
    }    
});

server.post("/todos", async (req, res) => {
    const { message } = req.body
    if (!message) {
        return res.status(400).json({ message: "You must include a message in your request."})
    }
    try {
        await db('todos').insert({ message })
        res.status(201).json({ message})
    } catch(err) {
        console.log(err);
    }

});

server.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ message: "You must include a message in your request."});
    }
    try {
        await db('todos').where({ id }).update({ message });
        res.status(200).json({message: 'Update Successful!'});
    } catch(err) {
        console.log(err);
    }
});

server.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db('todos').where({ id }).del();
        res.status(200).json({message: 'Delete Successful!'});
    } catch(err) {
        console.log(err);
    }
});

module.exports = server;