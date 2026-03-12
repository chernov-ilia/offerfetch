// Applications routes.
// All routes are protected by the auth middleware.

const express = require('express');
const router = express.Router();
const controller = require('./applications.controller');
const { authenticate } = require('../auth/auth.middleware');

router.get('/', authenticate, controller.getAll);
router.get('/:id', authenticate, controller.getById);
router.post('/', authenticate, controller.create);
router.put('/:id', authenticate, controller.update);
router.patch('/:id/archive', authenticate, controller.archive);

module.exports = router;