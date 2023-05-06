const express = require('express')
const { addGlobalSetting, getGlobalSetting } = require('../controller/globalSettingController')
const protect = require('../middleware/verifyMiddleware')
const router = express.Router()

// THIS ADD GLOBAL SETTING IS NOT USABLE, BECAUSE IN PROJECT THERE IS ONLY ONE GLOBAL SETTING
router.post('/add', protect, addGlobalSetting)
router.get('/get', getGlobalSetting)

module.exports = router