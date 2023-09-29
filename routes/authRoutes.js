const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/users', authController.getAllUsers);
router.post('/register', authController.register_post);
router.post('/login', authController.login_post);
router.get('/logout/:id', authController.logout_get);
router.put('/update/:id', authController.updateUser);
router.delete('/delete/:id', authController.deleteUser);

module.exports = router;
