const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/users.json');

// Helper function to read data from the JSON file
const readData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

// Helper function to write data to the JSON file
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET all users
router.get('/', (req, res) => {
  const users = readData();
  res.json(users);
});

// GET a user by ID
router.get('/:id', (req, res) => {
  const users = readData();
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// CREATE a new user
router.post('/', (req, res) => {
  const users = readData();
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  };
  users.push(newUser);
  writeData(users);
  res.status(201).json(newUser);
});

// UPDATE a user by ID
router.put('/:id', (req, res) => {
  const users = readData();
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    users[userIndex] = {
      id: users[userIndex].id,
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    };
    writeData(users);
    res.json(users[userIndex]);
  } else {
    res.status(404).send('User not found');
  }
});

// DELETE a user by ID
router.delete('/:id', (req, res) => {
  const users = readData();
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    writeData(users);
    res.json(deletedUser);
  } else {
    res.status(404).send('User not found');
  }
});

module.exports = router;
