
require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Supabase setup
const supabaseUrl = process.env.SUPABASE_URL; // Use environment variable
const supabaseKey = process.env.SUPABASE_KEY; // Use environment variable
const supabase = createClient(supabaseUrl, supabaseKey);

// POST request to insert data
app.post('/add-todo', async (req, res) => {
  const { task, is_completed } = req.body;

  try {
    const { data, error } = await supabase
      .from('todos') // Replace with your table name
      .insert([{ task, is_completed }])
      .select();
   
    if (error) throw error;
    res.status(201).json({ data });
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).json({ error: err.message });
  }
});

// Error handling for uncaught exceptions and rejections
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Start server
const PORT = process.env.PORT || 3000; // Use Render's PORT or fallback to 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));