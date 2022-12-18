const express = require('express');
const path = require('path');

const PORT = 5000;

const app = express();

//Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/fire', require('./routes/fireRoutes'));

app.listen(PORT, () => {
  console.log(`App listen in port ${PORT}`);
});
