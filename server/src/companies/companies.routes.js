// Companies routes.

const express = require('express');
const router = express.Router();
const controller = require('./companies.controller');
const { authenticate } = require('../auth/auth.middleware');

router.get('/', authenticate, controller.getAll);
router.get('/:id', authenticate, controller.getById);
router.post('/', authenticate, controller.create);
router.put('/:id', authenticate, controller.update);
router.delete('/:id', authenticate, controller.remove);

module.exports = router;