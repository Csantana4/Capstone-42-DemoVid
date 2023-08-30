const db = require('./database')

const seed = () =>{
    db.query(`
        CREATE TABLE trips(
            id SERIAL PRIMARY KEY,
            location VARCHAR(40),
            date DATE,
            itinerary VARCHAR(500),
            complete BOOLEAN
        );
    `).then(()=>{
        console.log("Seeded")
    })
}

module.exports = seed