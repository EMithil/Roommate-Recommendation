
const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// @route   POST api/matches/:profileId
// @desc    Like a profile (create a match request)
// @access  Private
router.post('/:profileId', auth, async (req, res) => {
  try {
    const { profileId } = req.params;
    
    // Check if profiles exist
    const profileExists = await pool.query(
      'SELECT user_id FROM profiles WHERE user_id = $1',
      [profileId]
    );
    
    if (profileExists.rows.length === 0) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    // Check if match already exists
    const matchExists = await pool.query(
      'SELECT * FROM matches WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)',
      [req.user.id, profileId]
    );

    if (matchExists.rows.length > 0) {
      return res.status(400).json({ msg: 'Match already exists' });
    }

    // Create match request
    const newMatch = await pool.query(
      'INSERT INTO matches (user1_id, user2_id, status) VALUES ($1, $2, $3) RETURNING *',
      [req.user.id, profileId, 'pending']
    );

    // Check if other user also liked current user
    const mutualMatch = await pool.query(
      'SELECT * FROM matches WHERE user1_id = $1 AND user2_id = $2 AND status = $3',
      [profileId, req.user.id, 'pending']
    );

    if (mutualMatch.rows.length > 0) {
      // Update both matches to 'matched'
      await pool.query(
        'UPDATE matches SET status = $1 WHERE id = $2',
        ['matched', mutualMatch.rows[0].id]
      );
      
      await pool.query(
        'UPDATE matches SET status = $1 WHERE id = $2',
        ['matched', newMatch.rows[0].id]
      );

      return res.json({ 
        match: newMatch.rows[0],
        isMatched: true,
        msg: 'It\'s a match!'
      });
    }

    res.json({ 
      match: newMatch.rows[0],
      isMatched: false
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/matches
// @desc    Get all matches for current user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const matches = await pool.query(
      `SELECT m.*, 
              u.name AS matched_name,
              p.age, p.gender, p.occupation, p.location, p.about
       FROM matches m
       JOIN users u ON (CASE 
                          WHEN m.user1_id = $1 THEN m.user2_id 
                          ELSE m.user1_id 
                        END) = u.id
       JOIN profiles p ON (CASE 
                            WHEN m.user1_id = $1 THEN m.user2_id 
                            ELSE m.user1_id 
                          END) = p.user_id
       WHERE (m.user1_id = $1 OR m.user2_id = $1) AND m.status = $2`,
      [req.user.id, 'matched']
    );
    
    res.json(matches.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
