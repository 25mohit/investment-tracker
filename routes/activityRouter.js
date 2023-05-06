const express = require('express')
const { activityController, getAccountActivity } = require('../controller/activityController')
const protect = require('../middleware/verifyMiddleware')
const router = express.Router()

router.post('/update', protect , activityController)
router.get('/', protect , getAccountActivity)
module.exports = router