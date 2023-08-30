console.log("connected to addTrip")
const form= document.getElementById("trip-form")
const tripLocation= document.getElementById("trip-location")
const tripDate= document.getElementById("trip-date")
const tripItin= document.getElementById("trip-itin")

const addTrip=(event)=>{
    event.preventDefault()
    let newTrip = {
        location: tripLocation.value,
        date: tripDate.value,
        itinerary: tripItin.value
        
    }
    console.log(newTrip)
    axios.post('http://localhost:4000/api/addTrip', newTrip)
    .then((res)=>{
        console.log(res.data)
    })
    .catch((error)=>{
        console.error(error)
    })
    alert("Trip has been submitted successfully")
}




form.addEventListener('submit', addTrip)
