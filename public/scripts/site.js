
(async () => {

const menuContainer = document.querySelector('#menu-item')
const eventContainer = document.querySelector('#event-name')
const specificEventContainter = document.querySelector('#specific-event')

if (menuContainer) {

    const menuResult = await fetch('/api/v1/menu')
    const menu = await menuResult.json()

    menu.forEach(item => {

        menuContainer.innerHTML +=
            "<p>" + "<img src='" + item.photo + "' width='200'><br>" +
                "<strong>" + item.name + "</strong><br>" +
                item.description + "<br>" +
                "<strong>$" + item.price + "</strong>" +
            "</p>"

    })
}

// Events on Home page

if (eventContainer) {

    const eventResult = await fetch('/api/v1/events')
    const events = await eventResult.json()

    events.forEach(event => {

        eventContainer.innerHTML += `
            <p><strong>
            <a href="events.html?id=${event._id}">${event.event}</a>
            </strong><br>
            ${event.date}</p>
            `
    })
}

// Event detail page

if (specificEventContainter) {


    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")

    const res = await fetch(`/api/v1/events/${id}`)
    const event = await res.json()


    specificEventContainter.innerHTML = `
        <h2 id="event-title">${event.event}</h2>
        <p class="event-details"><strong>Date:</strong> ${event.date}</p>
        <p class="event-details"><strong>Time:</strong> ${event.time}</p>
        <p class="event-details"><strong>Venue:</strong> ${event.venue}</p>
        <p class="event-details"><strong>Location:</strong> ${event.location}</p>
    `
}



const menuForm = document.querySelector('#menu-form')

if (menuForm) {

    menuForm.addEventListener('submit', async (event) => {

        event.preventDefault()

        const data = {
            name: document.querySelector('#menuname-input').value,
            description: document.querySelector('#menudescription-input').value,
            price: document.querySelector('#menuprice-input').value,
            photo: document.querySelector('#menuphoto-input').value
        }

        await fetch('/api/v1/menu', {
            method: 'POST',
            headers: {  'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

    alert('Menu item added successfully!')

    menuForm.reset()

    })
}


const eventForm = document.querySelector('#event-form')

if (eventForm) {

    eventForm.addEventListener('submit', async (event) => {

        event.preventDefault()

        const data = {
            event: document.querySelector('#eventname-input').value,
            date: document.querySelector('#eventdate-input').value,
            time: document.querySelector('#eventtime-input').value,
            venue: document.querySelector('#eventvenue-input').value,
            location: document.querySelector('#eventlocation-input').value
        }

        await fetch('/api/v1/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

    alert('Event added successfully!')

    eventForm.reset()

    })
}


})()