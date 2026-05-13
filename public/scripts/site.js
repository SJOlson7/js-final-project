
(async () => {

    const menuContainer = document.querySelector('#menu-item')
    const eventContainer = document.querySelector('#event-name')

    const menuResult = await fetch('/api/v1/menu')
    const menu = await menuResult.json()

    menu.forEach(item => {

        menuContainer.innerHTML +=
            "<p>" + "<img src='" + item.photo + "' width='200'><br>" +
                "<strong>" + item.name + "</strong><br>" +
                item.description + "<br>" +
                "<strong>$" + item.price + "</strong>"
            "</p>"

    })

    const eventResult = await fetch('/api/v1/events')
    const events = await eventResult.json()

    events.forEach(event => {

        eventContainer.innerHTML +=
            "<p>" + "<strong>" + event.event + "</strong><br>" +
                event.date + "<br>" +
                event.time + "<br>" +
                event.location +
            "</p>"

    })

})()