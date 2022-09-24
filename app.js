const express = require('express');
const app = express();
const cors = require('cors');
const productRoute = require('./routes/product.route.js');
const brandRoute = require('./routes/brand.route.js');

// middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Route is working! YaY!');
});

// route
app.use('/api/v1/product', productRoute);
app.use('/api/v1/brand', brandRoute);

module.exports = app;
