

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// serve static images from /public/images to use imageURL paths
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// route registration
app.use('/api/products', require('./routes/products'));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
