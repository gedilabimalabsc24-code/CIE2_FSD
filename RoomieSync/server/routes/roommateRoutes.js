const express = require('express');
const router = express.Router();
let roommates = require('../data/roommates');

// GET /api/roommates - Return all roommates
router.get('/', (req, res) => {
  res.json(roommates);
});

// GET /api/roommates/:id - Return a single roommate by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const roommate = roommates.find(r => r.id === id);

  if (!roommate) {
    return res.status(404).json({ message: 'Roommate not found' });
  }

  res.json(roommate);
});

// POST /api/roommates - Add a new roommate profile (in-memory)
router.post('/', (req, res) => {
  const {
    name, age, location, budget,
    sleepSchedule, foodPreference, smoking, pets, bio
  } = req.body;

  // Basic validation
  if (!name || !location || !budget) {
    return res.status(400).json({ message: 'Name, location and budget are required' });
  }

  // Calculate compatibility score against default profile
  const defaultProfile = {
    budget: 8000,
    location: 'Bangalore',
    sleepSchedule: 'Night Owl',
    foodPreference: 'Vegetarian',
    smoking: 'No',
    pets: 'No'
  };

  let score = 0;
  const budgetDiff = Math.abs(Number(budget) - defaultProfile.budget);
  if (budgetDiff === 0) score += 20;
  else if (budgetDiff <= 1000) score += 15;
  else if (budgetDiff <= 2000) score += 10;
  else if (budgetDiff <= 3000) score += 5;

  if (location === defaultProfile.location) score += 20;
  if (sleepSchedule === defaultProfile.sleepSchedule) score += 15;
  if (foodPreference === defaultProfile.foodPreference) score += 15;
  if (smoking === defaultProfile.smoking) score += 15;
  if (pets === defaultProfile.pets) score += 15;

  const newRoommate = {
    id: roommates.length + 1,
    name,
    age: Number(age) || 18,
    location,
    budget: Number(budget),
    occupation: req.body.occupation || 'Student',
    sleepSchedule: sleepSchedule || 'Night Owl',
    foodPreference: foodPreference || 'Vegetarian',
    smoking: smoking || 'No',
    pets: pets || 'No',
    bio: bio || '',
    image: null,
    compatibility: score
  };

  roommates.push(newRoommate);
  res.status(201).json(newRoommate);
});

module.exports = router;
