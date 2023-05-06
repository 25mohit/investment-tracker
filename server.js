const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const cors = require('cors')
const userRoute = require('./routes/userRoutes')
const investRouter = require('./routes/investRoute')
const globalSettingRout = require('./routes/globalSettingRoute')
const detailSettingRoute = require('./routes/detailSettingRoute')
const activityRoute = require('./routes/activityRouter')
const SystemInfo = require('./extras/SystemInfoGet')

// console.log(SystemInfo());
dotenv.config()
const PORT = 6767
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors('http://127.0.0.1:5173/'))

app.use('/user', userRoute)
app.use('/activity', activityRoute)
app.use('/investment', investRouter)
app.use('/global-settings', globalSettingRout)
app.use('/global-settings/detail', detailSettingRoute)

app.use('/', (req, res) => {
    res.send('This is Home Route')
})

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is Running on PORT ${PORT} with MongoDB`);
    })
}).catch(err => console.log(err))