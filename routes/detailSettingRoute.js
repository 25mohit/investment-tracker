const express = require('express')
const { detailSettingAdd, getDetailSetting } = require('../controller/detailSettingController')
const protect = require('../middleware/verifyMiddleware')
const router = express.Router()

router.post('/:glID', protect , detailSettingAdd)
router.get('/get-all/:parentID', protect, getDetailSetting)

module.exports = router