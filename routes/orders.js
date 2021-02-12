var express = require('express');
var router = express.Router();

var moment = require('moment');

var authenticationMiddleware = require('../app/helper/authentication');
var Order = require('../app/models/order');

/* Async Helper*/
const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };

router.get('/', authenticationMiddleware.verifyToken, asyncMiddleware(async (req, res, next) => {
    const orders = await Order.find().sort({ deliveryDate: 1 })
    return res.status(200).send({ success: true, message: 'Orders successfully queried!', data: orders })
}))

router.get('/user/:userID/', authenticationMiddleware.verifyToken, asyncMiddleware(async (req, res, next) => {
    const orders = await Order.find({ userID: req.params.userID }).sort({ deliveryDate: 1 })
    return res.status(200).send({ success: true, message: 'Orders successfully queried!', data: orders })
}))

router.get('/user/:userID/filter/:startDate/:endDate/state/:state?', authenticationMiddleware.verifyToken, asyncMiddleware(async (req, res, next) => {
    if (req.params.state) {
        const orders = await Order.find({ userID: req.params.userID, state: req.params.state, deliveryDate: { "$gte": req.params.startDate, "$lte": req.params.endDate } }).sort({ deliveryDate: 1 });
        return res.status(200).send({ success: true, message: 'Orders successfully queried!', data: orders })
    } else {
        const orders = await Order.find({ userID: req.params.userID, deliveryDate: { "$gte": req.params.startDate, "$lte": req.params.endDate } }).sort({ deliveryDate: 1 })
        return res.status(200).send({ success: true, message: 'Orders successfully queried!', data: orders })
    }
}))

router.post('/create', authenticationMiddleware.verifyToken, asyncMiddleware(async (req, res, next) => {
    let order = req.body;
    order.state = "open";
    let doc;
    try {
        doc = await Order.create(order);
    } catch (err) {
        return res.status(400).send({ succes: false, message: 'Error while creating order' })
    }
    return res.status(201).send({ success: true, message: 'Order successfully created', data: doc.id })
}))

module.exports = router;