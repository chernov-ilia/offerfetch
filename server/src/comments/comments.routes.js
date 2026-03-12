// Comments routes.

const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('./comments.controller');
const { authenticate } = require('../auth/auth.middleware');

router.get('/', authenticate, controller.getByApplication);
router.post('/', authenticate, controller.create);
router.delete('/:commentId', authenticate, controller.remove);

module.exports = router;