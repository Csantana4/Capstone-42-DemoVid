const db = require('../database')

module.exports = {
    addTrip:(req, res) =>{
        const {location, date, itinerary} = req.body
        console.log(req.body)
        db.query(`
            INSERT INTO trips(location, date, itinerary, complete)
            VALUES(
                '${location}',
                '${date}',
                '${itinerary}',
                false
            )
            RETURNING *;
        `)
        .then((dbRes)=>{
            res.status(200).send(dbRes[0])
        })
    },
    getTrips :(req, res)=>{
        db.query(`
            SELECT * FROM trips
            ORDER BY date ASC;
        `)
        .then((dbRes)=>{
            res.status(200).send(dbRes[0])
        })
    },
    deleteTrip: (req, res)=>{
        let {id} = req.params
        db.query(`DELETE FROM trips WHERE id = ${id};
                  SELECT * FROM trips;
         `)
         .then((dbRes)=>{
            res.status(200).send(dbRes[0])
         })
    },
    completeTrip: (req, res)=>{
        let {id} = req.params
        db.query(`DELETE FROM trips WHERE id = ${id};
                  SELECT * FROM trips;
         `)
         .then((dbRes)=>{
            res.status(200).send(dbRes[0])
         })
    },
    updateTrip: (req, res)=>{
        let {id, location, date, itinerary} = req.params
        db.query(`UPDATE trips 
                  SET id = ${id},
                  location = ${location},
                  date = ${date},
                  itinerary = ${itinerary},
                  
                  WHERE trip_id = ${tripId};
         `)
         .then((dbRes)=>{
            res.status(200)
         })
    }
    
}