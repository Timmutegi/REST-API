const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');


app.use(express.json());
app.use(cors());

// Import Routes
const postsRoute = require('./routes/post');
const authRoute = require('./routes/auth');
const storeRoute = require('./routes/business');
const bookingRoute = require('./routes/booking')

// ROUTE MIDDLEWARES
app.use('/api/posts', postsRoute);
app.use('/api/user', authRoute);
app.use('/api/business', storeRoute);
app.use('/api/booking', bookingRoute)

// CONNECT TO DB
mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB CONNECTED!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`)
    })

app.listen(process.env.PORT || 3000);