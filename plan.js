const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const router = express.Router();

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

router.post('/', async (req, res) => {
  const chatHistory = req.body.chatHistory;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: chatHistory,
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to generate plan' });
  }
});

module.exports = router;
