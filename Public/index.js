console.log("connected")
const list = document.getElementById('trip-container')
const calendar = document.getElementById('calendar')
const monthEl= document.getElementById('month')
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const days = ["Sun", "Mon", "Tue", "Wed","Thu", "Fri","Sat"]
const today = new Date()
let currentMonth= today.getMonth()
let currentYear= today.getFullYear()

const drawBlankCalendar=()=>{
    for(let i = 0; i < 35; i++){
        const day = document.createElement('div')
        day.classList.add('day')

        const dayText = document.createElement('p')
        dayText.classList.add('day-text')
        dayText.innerText = days[i % 7]

        const dayNumber = document.createElement('p')
        dayNumber.classList.add('day-number')

        const eventName = document.createElement('small')
        eventName.classList.add('event-name')

        day.appendChild(dayText)
        day.appendChild(dayNumber)
        day.appendChild(eventName)
        console.log(day)
        calendar.appendChild(day)
        
    }
}
const updateCalendar= (month, year, events)=>{
    const dayElements=document.querySelectorAll('.day')

    const theFirst= new Date()
    theFirst.setMonth(month)
    theFirst.setYear(year)

    const theFirstDayOfWeek= theFirst.getDay()
    const monthName = months[month]
    const monthWithYear = `${year} - ${monthName}`
    monthEl.innerText = monthWithYear
    const daysInMonth = new Date (year, month + 1, 0).getDate()

    let dayCounter = 1
    for(let i = 0; i < dayElements.length; i++){
        const day = dayElements[i]
        const dayNumber = day.querySelector('.day-number')
        if(i >= theFirstDayOfWeek && dayCounter <= daysInMonth){
            dayNumber.innerText = dayCounter
            dayCounter++
        }else{
            dayNumber.innerText = ''
        }
        
    }

};
const previousMonth= ()=> {
    if(currentMonth === 0){
        currentMonth = 12
        currentYear--
    }
    updateCalendar(--currentMonth, currentYear)
}
const nextMonth= () => {
    if(currentMonth === 11){
        currentMonth = -1
        currentYear++
    }
    updateCalendar(++currentMonth, currentYear)
}

drawBlankCalendar();
updateCalendar(currentMonth, currentYear);

const deleteTrip =(id)=>{
    console.log(id)
    axios.delete(`http://localhost:4000/api/deleteTrip/${id}`)
    .then((res)=>{
        list.innerHTML = ""
        res.data.forEach(createCard)
    })
    .catch((error)=>{
        console.error(error)
    })
    alert("Trip has been deleted successfully")
}
const completeTrip =(id)=>{
    console.log(id)
    axios.delete(`http://localhost:4000/api/completeTrip/${id}`)
    .then((res)=>{
        list.innerHTML = ""
        res.data.forEach(createCard)
    })
    .catch((error)=>{
        console.error(error)
    })
    alert("Trip has been completed")
}

function updateTrip(){
    let bodyObj = {
location: location.value,
date: date.value,
itinerary: itinerary.value,

    }
    axios.put(`http://localhost:4000/api/updateTrip/${bodyObj} , bodyObj`)
    .then(res => console.log(1, res))
    .catch((error)=>{
        console.error(error)
    })
}



const createCard= (trip) =>{

    let card = document.createElement('div')
    card.classList += 'trip-card'

    let cardHeader = document.createElement('div')
    cardHeader.classList += 'trip-header'

    let options = document.createElement('div')
    options.classList += 'trip-options'

    let tripName = document.createElement('h3')
    tripName.textContent = trip.location
    
    let tripDate = document.createElement('h3')
    tripDate.textContent = trip.date

    let trash = document.createElement('h3')
    trash.addEventListener('click',()=> deleteTrip(trip.id))

    let date = document.createElement('h3')
    
    let check = document.createElement('h3')
    check.addEventListener('click',()=> completeTrip(trip.id))
    
    let edit = document.createElement('h3')
    edit.addEventListener('click',()=> updateTrip(trip.body))

    trash.textContent = 'date'
    trash.textContent = '🗑️'
    check.textContent = '✅'
    // edit.textContent = '📝'
    card.appendChild(cardHeader)
    cardHeader.appendChild(tripDate)
    cardHeader.appendChild(tripName)
    cardHeader.appendChild(options)

    options.appendChild(trash)
    options.appendChild(check)
    options.appendChild(edit)
    let itinerary = document.createElement('p')
    itinerary.textContent = trip.itinerary
    card.appendChild(itinerary)
    list.appendChild(card)

}

const getTrips = ()=>{
    axios.get('http://localhost:4000/api/getTrips')
    .then((res)=>{
        console.log(res.data)
        res.data.forEach(createCard)
    })
    .catch((error)=>{
        console.error(error)
    })
}

getTrips()