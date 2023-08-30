const express = require('express')
const cors = require('cors')
const db = require('./database')
const seed = require('./seed')
const {addTrip, getTrips, deleteTrip, completeTrip, updateTrip} = require('./controllers/trips')


const app = express()
app.use(express.json())
app.use(cors())

app.post('/api/seed', seed)
app.post('/api/addTrip', addTrip)
app.get('/api/getTrips', getTrips)
app.delete('/api/deleteTrip/:id', deleteTrip)
app.delete('/api/completeTrip/:id', completeTrip)
app.put('/api/updateTrip/:bodyObj', updateTrip)

db.sync()

app.listen(4000, () => console.log('Nothin but a G thang on 4000'))
