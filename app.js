const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// const passport = require('passport');
// const googleStrategy = require('./googleStrategy');

require('dotenv/config');
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Morbags API',
            version: '1.0.0',
            description: 'API for Morbags Web Application',
            contact: {
                name: 'Timothy Mutegi',
                email: 'mutegi.timothy538@gmail.com'
            },
            url: 'https://obscure-beyond-81246.herokuapp.com/api',
        }
    },
    apis: ['./routes/*.js', './models/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(cors());
// app.use(passport.initialize());
// app.use(googleStrategy);


// Import Routes
const postsRoute = require('./routes/post');
const authRoute = require('./routes/auth');
const storeRoute = require('./routes/business');
const bookingRoute = require('./routes/booking');
const hoursRoute = require('./routes/hours');
const formRoute = require('./routes/test');
const subscribeRoute = require('./routes/subscribers');
const usersRoute = require('./routes/users');
// const oauth = require('./routes/oauth');

// ROUTE MIDDLEWARES
app.use('/api/posts', postsRoute);
app.use('/api/user', authRoute);
app.use('/api/business', storeRoute);
app.use('/api/booking', bookingRoute);
app.use('/api/workhours', hoursRoute);
app.use('/api/multi-step-form', formRoute);
app.use('/api/subscribe', subscribeRoute);
app.use('/api/users', usersRoute);
// app.use('api/auth', oauth);

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