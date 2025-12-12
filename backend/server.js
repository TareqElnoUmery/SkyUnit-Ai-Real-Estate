const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('SkyUnit Backend is running.');
});

app.post('/api/assistant', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    return res.status(400).json({ error: 'Request body must contain a non-empty "prompt" field.' });
  }

  // Gemini AI connection is disabled. Returning a static message.
  res.json({ reply: 'عفوًا، المساعد الذكي غير متاح حاليًا. يرجى المحاولة في وقت لاحق.' });
});

app.post('/api/contact', (req, res) => {
    const { name, phone, message } = req.body;

    if (!name || !phone) {
        return res.status(400).json({ success: false, error: 'Name and phone are required.' });
    }

    // In a real application, you would save this to a database.
    // For this demo, we'll just log it to the console.
    console.log('New contact form submission:');
    console.log(`- Name: ${name}`);
    console.log(`- Phone: ${phone}`);
    console.log(`- Message: ${message}`);

    res.status(200).json({ success: true, message: 'Message received successfully!' });
});


// Projects API
app.get('/projects', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  const projectsDir = path.join(__dirname, '../public/projects');
  try {
    const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.json'));
    const projects = files.map(file => {
      const filePath = path.join(projectsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    });
    res.json(projects);
  } catch (error) {
    console.error('Error reading projects:', error);
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
