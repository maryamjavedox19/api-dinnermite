const express = require('express');
const { addOrder, getOrder, getOrderById, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router();

router.get('/', getOrder);
router.get('/:id', getOrderById);
router.put('/update/:id', updateOrder);
router.post('/', addOrder);
router.delete('/delete/:id', deleteOrder);


module.exports = router;
