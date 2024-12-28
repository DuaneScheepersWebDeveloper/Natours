const viewController = require('../controllers/viewsController');
const express = require('express');

const router = express.Router();
router.get('/',viewController.getOverview);
router.get('/tour/:slug',viewController.getTour);
module.exports = router;