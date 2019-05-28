const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'List of all the order data!'
    });
});

router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Single order!',
        orderId: req.params.id
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Successfully created an order!'
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'Successfully order is Deleted'
    });
});

module.exports = router;

