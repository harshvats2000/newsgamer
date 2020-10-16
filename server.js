const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

//Init middleware
app.use(express.json({ extended: false }));

app.use(cors());

app.use('/api/sendmail', require('./routes/api/sendMail'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
