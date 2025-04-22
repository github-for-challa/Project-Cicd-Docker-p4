// app.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('✅ CI/CD Pipeline Working Successfully! 🎉\4: CI/CD Pipeline with GitHub Actions & Docker is complete.');
});

app.listen(port, () => {
  console.log(`🚀 App running on port ${port}`);
});

