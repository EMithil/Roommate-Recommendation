
const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// @route   POST api/profiles
// @desc    Create or update user profile
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const {
      age,
      gender,
      occupation,
      budget,
      location,
      about,
      lifestyle,
      has_pets,
      is_smoker,
      personality,
      preferred_location,
      move_in_date,
      lease_duration
    } = req.body;

    // Check if profile exists
    const profileExists = await pool.query(
      'SELECT * FROM profiles WHERE user_id = $1',
      [req.user.id]
    );

    if (profileExists.rows.length > 0) {
      // Update existing profile
      const updatedProfile = await pool.query(
        `UPDATE profiles 
        SET age = $1, gender = $2, occupation = $3, budget = $4, 
            location = $5, about = $6, lifestyle = $7, has_pets = $8, 
            is_smoker = $9, personality = $10, preferred_location = $11,
            move_in_date = $12, lease_duration = $13
        WHERE user_id = $14
        RETURNING *`,
        [age, gender, occupation, budget, location, about, lifestyle, 
         has_pets, is_smoker, personality, preferred_location, 
         move_in_date, lease_duration, req.user.id]
      );

      return res.json(updatedProfile.rows[0]);
    }

    // Create new profile
    const newProfile = await pool.query(
      `INSERT INTO profiles 
        (user_id, age, gender, occupation, budget, location, about, lifestyle, 
         has_pets, is_smoker, personality, preferred_location, move_in_date, lease_duration)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING *`,
      [req.user.id, age, gender, occupation, budget, location, about, lifestyle, 
       has_pets, is_smoker, personality, preferred_location, move_in_date, lease_duration]
    );

    res.json(newProfile.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/profiles
// @desc    Get all profiles
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const profiles = await pool.query(
      `SELECT p.*, u.name 
       FROM profiles p
       JOIN users u ON p.user_id = u.id
       WHERE p.user_id != $1`,
      [req.user.id]
    );
    
    res.json(profiles.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/profiles/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await pool.query(
      `SELECT p.*, u.name, u.email 
       FROM profiles p
       JOIN users u ON p.user_id = u.id
       WHERE p.user_id = $1`,
      [req.user.id]
    );
    
    if (profile.rows.length === 0) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    
    res.json(profile.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/profiles/:id
// @desc    Get profile by user ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const profile = await pool.query(
      `SELECT p.*, u.name 
       FROM profiles p
       JOIN users u ON p.user_id = u.id
       WHERE p.user_id = $1`,
      [req.params.id]
    );
    
    if (profile.rows.length === 0) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    
    res.json(profile.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
