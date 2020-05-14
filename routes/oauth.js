const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('google', { scope: ['email', 'profile'] }), (req, res) => {});

router.get('/callback', passport.authenticate('google', { scope: ['email', 'profile'] }), (req, res) => {
    return res.send('congrats');
});