
const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// @route   POST api/messages/:matchId
// @desc    Send a message
// @access  Private
router.post('/:matchId', auth, async (req, res) => {
  try {
    const { matchId } = req.params;
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ msg: 'Message content is required' });
    }

    // Check if match exists and user is part of it
    const match = await pool.query(
      'SELECT * FROM matches WHERE id = $1 AND (user1_id = $2 OR user2_id = $2) AND status = $3',
      [matchId, req.user.id, 'matched']
    );

    if (match.rows.length === 0) {
      return res.status(404).json({ msg: 'Match not found or unauthorized' });
    }

    // Create message
    const newMessage = await pool.query(
      'INSERT INTO messages (match_id, sender_id, content) VALUES ($1, $2, $3) RETURNING *',
      [matchId, req.user.id, content]
    );

    res.json(newMessage.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/messages/:matchId
// @desc    Get all messages for a match
// @access  Private
router.get('/:matchId', auth, async (req, res) => {
  try {
    const { matchId } = req.params;
    
    // Check if match exists and user is part of it
    const match = await pool.query(
      'SELECT * FROM matches WHERE id = $1 AND (user1_id = $2 OR user2_id = $2)',
      [matchId, req.user.id]
    );

    if (match.rows.length === 0) {
      return res.status(404).json({ msg: 'Match not found or unauthorized' });
    }

    // Get messages
    const messages = await pool.query(
      `SELECT m.*, u.name as sender_name
       FROM messages m
       JOIN users u ON m.sender_id = u.id
       WHERE m.match_id = $1
       ORDER BY m.created_at ASC`,
      [matchId]
    );

    res.json(messages.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
