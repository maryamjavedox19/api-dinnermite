const { Router } = require('express');
const authController = require('../controllers/authController');
const authAdminController = require('../controllers/adminPanelAuth');

const router = Router();



router.get('/users', authController.getAllUsers);
router.post('/register', authController.register_post);
router.post('/login', authController.login_post);
router.get('/logout/:id', authController.logout_get);
router.put('/update/:id', authController.updateUser);
router.delete('/delete/:id', authController.deleteUser);



// admin routes

router.post('/admin/register', authAdminController.admin_register);
router.post('/admin/login', authAdminController.admin_login);
router.put('/admin/update/:id', authAdminController.updateAdmin);
router.delete('/admin/delete/:id', authAdminController.admin_delete_user);
router.get('/admin/logout/:id', authAdminController.admin_logout);

module.exports = router;
