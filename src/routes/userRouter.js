const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/login', userController.getLogin);
router.get('/register', userController.getRegister);
router.post('/login', userController.loginUserService);
router.post('/register', userController.registerUserService);

module.exports = router;