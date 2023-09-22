const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');


router.post('/register', auth.register,);
router.post('/login', auth.login);
router.delete('/login', auth.delete);

module.exports = router;
