const viewController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const express = require('express');

const router = express.Router();
router.get('/',viewController.getOverview);
router.get('/tour/:slug',authController.protect,viewController.getTour);
router.get('/login',viewController.getLoginForm);

module.exports = router;