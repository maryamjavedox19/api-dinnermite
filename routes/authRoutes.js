const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/register', authController.register_get);
router.post('/register', authController.register_post);
router.post('/login', authController.login_post);
router.get('/logout/:id', authController.logout_get);

module.exports = router;
