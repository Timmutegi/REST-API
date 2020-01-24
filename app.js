const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');


app.use(express.json());

// Import Routes
const postsRoute = require('./routes/post')
const authRoute = require('./routes/auth')

// ROUTE MIDDLEWARES
app.use('/api/posts', postsRoute);
app.use('/api/user', authRoute);

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