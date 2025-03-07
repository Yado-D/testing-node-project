const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());

// Supabase setup
const supabaseUrl = 'https://lgdabnwbjlgtkyurglrb.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnZGFibndiamxndGt5dXJnbHJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNjM5NzMsImV4cCI6MjA1NjkzOTk3M30.uQ2TX8IE8ES36RrPo66aOUxEo3Vq5j3YpfFsLHMnpA0'; // Replace with your Supabase public API key
const supabase = createClient(supabaseUrl, supabaseKey);

// POST request to insert data
app.post('/add-todo', async (req, res) => {
  const { task, is_completed } = req.body;

  const { data, error } = await supabase
    .from('todos') // Replace with your table name
    .insert([{ task, is_completed }]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ data });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));