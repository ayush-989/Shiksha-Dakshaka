const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

// AI Chat endpoint
router.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Check if OpenAI API key is available
  if (process.env.OPENAI_API_KEY) {
    try {
      // Using OpenAI API
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an AI study assistant for programming and aptitude questions. Help students with Java, Python, HTML, CSS, JavaScript, C, C++, Aptitude, and general study guidance. Provide clear, educational responses.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const aiResponse = response.data.choices[0].message.content;
      return res.json({ response: aiResponse });
    } catch (error) {
      console.error('OpenAI API Error:', error.response?.data || error.message);
    }
  }

  // Fallback to mock responses if no API key
  const mockResponses = {
    'hello': 'Hello! How can I help you with your studies today?',
    'html': 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. It uses tags to structure content like headings, paragraphs, and links.',
    'css': 'CSS (Cascading Style Sheets) is used to describe the presentation of a document written in HTML. It controls layout, colors, fonts, and responsiveness.',
    'javascript': 'JavaScript is a programming language that enables interactive web pages. It can update content dynamically, handle events, and communicate with servers.',
    'python': 'Python is a high-level programming language known for its simplicity and readability. It\'s widely used for web development, data science, AI, and automation.',
    'java': 'Java is an object-oriented programming language known for its "Write Once, Run Anywhere" capability. It\'s used for enterprise applications, Android apps, and large systems.',
    'aptitude': 'Aptitude refers to the natural ability to learn and solve problems. It includes logical reasoning, numerical skills, and analytical thinking.',
    'default': 'I\'m here to help with programming questions, aptitude problems, and study guidance. What would you like to know?'
  };

  // Simple keyword matching for mock responses
  const lowerMessage = message.toLowerCase();
  let response = mockResponses.default;

  for (const [key, value] of Object.entries(mockResponses)) {
    if (key !== 'default' && lowerMessage.includes(key)) {
      response = value;
      break;
    }
  }

  res.json({ response });
});

module.exports = router;