var express = require('express');
var router = express.Router();
const pool = require('../main');

// GET all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/readyToMarry', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE age > 24 AND age <30');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/hr', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE department = \'HR\' AND age < 25');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/age', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE age BETWEEN 25 AND 30');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST (Create a new user)
router.post('/', async (req, res) => {
  try {
    const { id, age, name, department } = req.body;

    if (!id || !age || !name || !department) {
      return res.status(400).json({ error: 'All fields (id, age, name, department) are required' });
    }

    const result = await pool.query(
      'INSERT INTO users (id, age, name, department) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, age, name, department]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating user:', err.message);
    if (err.code === '23505') {
      return res.status(409).json({ error: 'User with this ID already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT (Update an entire user)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { age, name, department } = req.body;

    if (!age || !name || !department) {
      return res.status(400).json({ error: 'All fields (age, name, department) are required for updating' });
    }

    const result = await pool.query(
      'UPDATE users SET age = $1, name = $2, department = $3 WHERE id = $4 RETURNING *',
      [age, name, department, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH (Update specific fields of a user)
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const fields = req.body;

    const validFields = ['age', 'name', 'department'];
    const updates = Object.keys(fields).filter(field => validFields.includes(field));

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const query = `
      UPDATE users SET ${updates.map((field, i) => `${field} = $${i + 1}`).join(', ')}
      WHERE id = $${updates.length + 1} RETURNING *`;
    
    const values = [...updates.map(field => fields[field]), id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE (Remove a user by ID)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', user: result.rows[0] });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
