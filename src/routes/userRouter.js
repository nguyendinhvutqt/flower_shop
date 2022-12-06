const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

// Router get
router.get('/login', userController.getLogin);
router.get('/register', userController.getRegister);

// Router post
router.post('/login', userController.loginUserService);
router.post('/register', userController.registerUserService);

// Router put
router.put('/update-user/:id', userController.updateUserService)

// Router delete
router.delete('/delete-user/:id', authMiddleware, userController.deleteUserService)

module.exports = router;