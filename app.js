const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();

app.use(express.json());

// Import Routes
const postsRoute = require('./routes/post')

//MIDDLEWARES
app.use('/posts', postsRoute);

// ROUTES
app.get('/', (req, res) => {
    res.send('we are on home');
});

// CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB CONNECTED!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`)
    })

app.listen(3000);