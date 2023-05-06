const express = require('express')
const { addNewInvestment, getAllInvestment } = require('../controller/investController')
const protect = require('../middleware/verifyMiddleware')
const router = express.Router()

router.post('/add', protect, addNewInvestment)
router.get('/list-all', protect, getAllInvestment)
module.exports = router