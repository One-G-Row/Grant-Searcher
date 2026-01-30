//const API_URL = "https://grant-searcher-backend.onrender.com/api" || "http://127.0.0.1:3000/api"
const API_URL = "http://127.0.0.1:3000/api"

//import listGrants to clear grants section when you want to populate Events
const listGrants = document.querySelector(".list-grants")

//section to populate events
const listEvents = document.querySelector(".list-events")

//listens when an option is selected
let selectEvents = document.querySelector("#select-events")
selectEvents.addEventListener("change", () => {
    let selectedEvent = selectEvents.value

    listGrants.innerHTML = ""

    async function populateEventsBrite() {
        if (selectedEvent === "eventsbrite") {
            listEvents.innerHTML = ""
            try {
                const response = await fetch(`${API_URL}/eventsbrite`)

                if (!response.ok) {
                    console.error(`HTTP Server Error ${response.status}`)
                }

                const responseData = await response.json()

                const data = responseData.data

                const eventsbriteArr = []

                data.forEach((event) => {
                    const eventCard = document.createElement("div")
                    eventCard.setAttribute("class", "event-card")

                    const title = document.createElement("h4")
                    const url = document.createElement("a")
                    const date = document.createElement("span")
                    const price = document.createElement("span")

                    if (event.title !== null && event.url !== null && event.date !== null && event.price !== null) {
                        title.innerHTML = `<Label><b>Title: </b></Label>${event.title}`
                        url.innerHTML = `<Label><b>Link: </b></Label><a href=${event.url}>${event.url}</a><br/>`
                        date.innerHTML = `<Label><b>Date: </b></Label>${event.date}<br/>`
                        price.innerHTML = `<Label><b>Price: </b></Label>${event.price}<br/>`

                        const eventsbriteObj = {
                            title: event.title,
                            url: event.url,
                            date: event.date,
                            price: event.price
                        }

                        eventsbriteArr.push(eventsbriteObj)
                        localStorage.setItem("eventsbrite", JSON.stringify(eventsbriteArr))
                        //localStorage.removeItem("eventsbrite")


                        eventCard.append(title, url, date, price)
                        listEvents.appendChild(eventCard)
                    }

                })
            }
            catch (error) {
                console.error('Error', error)
            }

        }
        else {
            listEvents.innerHTML = ""
            let loadingEvent = document.createElement("p")
            loadingEvent.setAttribute("class", "loading-event")
            loadingEvent.textContent = "Loading Event ...."
            listEvents.appendChild(loadingEvent)
        }
    }

    async function populateDevEvents() {
        if (selectedEvent === "devevents") {
            listEvents.innerHTML = ""
            try {
                const response = await fetch(`${API_URL}/devevents`)

                if (!response.ok) {
                    console.error(`HTTP Server Error ${response.status}`)
                }

                const responseData = await response.json()

                const data = responseData.data

                const deveventsArr = []

                data.forEach((event) => {
                    const eventCard = document.createElement("div")
                    eventCard.setAttribute("class", "event-card")

                    const title = document.createElement("h4")
                    const url = document.createElement("a")
                    const date = document.createElement("span")
                    const content = document.createElement("p")

                    if (event.title !== null && event.url !== null && event.date !== null && event.content !== null) {
                        title.innerHTML = `<Label><b>Title: </b></Label>${event.title}`
                        url.innerHTML = `<Label><b>Link: </b></Label><a href=${event.url}>${event.url}</a><br/>`
                        date.innerHTML = `<Label><b>Date: </b></Label>${event.date}<br/>`
                        content.innerHTML = `<Label></Label>${event.content}<br/>`

                        const deveventsObj = {
                            title: event.title,
                            url: event.url,
                            date: event.date,
                            content: event.content
                        }

                        deveventsArr.push(deveventsObj)
                        localStorage.setItem("devevents", JSON.stringify(deveventsArr))
                        //localStorage.removeItem("devevents")


                        eventCard.append(title, content, date, url)
                        listEvents.appendChild(eventCard)
                    }

                })
            }
            catch (error) {
                console.error('Error', error)
            }

        }
        else {
            listEvents.innerHTML = ""
            let loadingEvent = document.createElement("p")
            loadingEvent.setAttribute("class", "loading-event")
            loadingEvent.textContent = "Loading Event ...."
            listEvents.appendChild(loadingEvent)
        }
    }

    //international conferences events
    async function populateInternationalConferences() {
        if (selectedEvent === "internationalconferences") {
            listEvents.innerHTML = ""
            try {
                const response = await fetch(`${API_URL}/internationalconferences`)

                if (!response.ok) {
                    console.error(`HTTP Server Error ${response.status}`)
                }

                const responseData = await response.json()

                const data = responseData.data

                const iconferencesArr = []

                data.forEach((event) => {
                    const eventCard = document.createElement("div")
                    eventCard.setAttribute("class", "event-card")

                    const title = document.createElement("h4")
                    const url = document.createElement("a")
                    const date = document.createElement("span")
                    const location = document.createElement("span")

                    if (event.title !== null && event.url !== null && event.date !== null) {
                        title.innerHTML = `<Label><b>Title: </b></Label>${event.title}`
                        url.innerHTML = `<Label><b>Link: </b></Label><a href=${event.url}>${event.url}</a><br/>`
                        date.innerHTML = `<Label><b>Date: </b></Label>${event.date}<br/>`
                        location.innerHTML = `<Label><b>Location: </b></Label>${event.location}<br/>`

                        const iconferencesObj = {
                            title: event.title,
                            url: event.url,
                            date: event.date,
                            location: event.location
                        }

                        iconferencesArr.push(iconferencesObj)
                        localStorage.setItem("internationalconferences", JSON.stringify(iconferencesArr))
                        //localStorage.removeItem("internationalconferences")


                        eventCard.append(title, url, date, location)
                        listEvents.appendChild(eventCard)
                    }

                })
            }
            catch (error) {
                console.error('Error', error)
            }

        }
        else {
            listEvents.innerHTML = ""
            let loadingEvent = document.createElement("p")
            loadingEvent.setAttribute("class", "loading-event")
            loadingEvent.textContent = "Loading Event ...."
            listEvents.appendChild(loadingEvent)
        }
    }

    //conference alerts events
    async function populateConferencesAlerts() {
        if (selectedEvent === "conferencealerts") {
            listEvents.innerHTML = ""
            try {
                const response = await fetch(`${API_URL}/conferencealerts`)

                if (!response.ok) {
                    console.error(`HTTP Server Error ${response.status}`)
                }

                const responseData = await response.json()

                const data = responseData.data

                const conferencesalertsArr = []

                data.forEach((event) => {
                    const eventCard = document.createElement("div")
                    eventCard.setAttribute("class", "event-card")

                    const title = document.createElement("h4")
                    const url = document.createElement("a")
                    const date = document.createElement("span")
                    const location = document.createElement("span")

                    if (event.title !== null && event.url !== null && event.date !== null) {
                        title.innerHTML = `<Label><b>Title: </b></Label>${event.title}`
                        url.innerHTML = `<Label><b>Link: </b></Label><a href=${event.url}>${event.url}</a><br/>`
                        date.innerHTML = `<Label><b>Date: </b></Label>${event.date}<br/>`
                        location.innerHTML = `<Label><b>Location: </b></Label>${event.location}<br/>`

                        const conferencesalertsObj = {
                            title: event.title,
                            url: event.url,
                            date: event.date,
                            location: event.location
                        }

                        conferencesalertsArr.push(conferencesalertsObj)
                        localStorage.setItem("conferencesalerts", JSON.stringify(conferencesalertsArr))
                        //localStorage.removeItem("conferencesalerts")


                        eventCard.append(title, url, date, location)
                        listEvents.appendChild(eventCard)
                    }

                })
            }
            catch (error) {
                console.error('Error', error)
            }

        }
        else {
            listEvents.innerHTML = ""
            let loadingEvent = document.createElement("p")
            loadingEvent.setAttribute("class", "loading-event")
            loadingEvent.textContent = "Loading Event ...."
            listEvents.appendChild(loadingEvent)
        }
    }

    async function populate10TimesEvent() {
        if (selectedEvent === "10times") {
            listEvents.innerHTML = ""
            try {
                const response = await fetch(`${API_URL}/10times`)

                if (!response.ok) {
                    console.error(`HTTP Server Error ${response.status}`)
                }

                const responseData = await response.json()

                const data = responseData.data

                const tentimesArr = []

                data.forEach((event) => {
                    const eventCard = document.createElement("div")
                    eventCard.setAttribute("class", "event-card")

                    const title = document.createElement("h4")
                    const date = document.createElement("span")
                    const venue = document.createElement("span")
                    const location = document.createElement("span")
                    const content = document.createElement("p")

                    if (event.title !== null && event.date !== null /* && event.location !== null && event.content !== null && */ ) {
                        title.innerHTML = `<Label><b>Title: </b></Label>${event.title}`
                        date.innerHTML = `<Label><b>Date: </b></Label>${event.date}<br/>`
                        location.innerHTML = `<Label><b>Location: </b></Label>${event.location}<br/>`
                        venue.innerHTML = `<Label><b>Venue: </b></Label>${event.venue}<br/>`
                        content.innerHTML = `<Label><b>Content: </b></Label>${event.content}<br/>`

                        const tentimesObj = {
                            title: event.title,
                            date: event.date,
                            location: event.location,
                            venue: event.venue,
                            content: event.content
                        }

                        tentimesArr.push(tentimesObj)


                        console.log(tentimesArr)
                        eventCard.append(title, date, content, location, venue)
                        listEvents.appendChild(eventCard)
                    }
                     localStorage.setItem("tentimes", JSON.stringify(tentimesArr))
                        //localStorage.removeItem("10times")
                })
            }
            catch (error) {
                console.error('Error', error)
            }

        }
        else {
            let loadingEvent = document.createElement("p")
            loadingEvent.setAttribute("class", "loading-event")
            loadingEvent.textContent = "Loading Event ...."
            listEvents.appendChild(loadingEvent)
        }
    }

    populateEventsBrite()
    populateDevEvents()
    populateInternationalConferences()
    populateConferencesAlerts()
    populate10TimesEvent()
})

let searchInput = document.querySelector(".search-input")


async function searchEvents() {
    listGrants.innerHTML = ""
    listEvents.innerHTML = ""

    let inputValue = searchInput.value.toLowerCase().trim()
    console.log(inputValue)

    //search for eventsbrite events
    let eventsbriteEvents = JSON.parse(localStorage.getItem("eventsbrite"))
    //console.log(eventsbriteEvents)

    let eventbriteArr = []

    for (let event of eventsbriteEvents) {
        eventbriteArr.push(event)
    }

    eventbriteArr.forEach((event) => {
        let modifiedEventTitle = event.title.toLowerCase()
        //modifiedEventTitle.toLowerCase()

        const eventCard = document.createElement("div")
        eventCard.setAttribute("class", "event-card")

        if (modifiedEventTitle.includes(inputValue) || event.date.toLowerCase().includes(inputValue)) {
            const title = document.createElement("h4")
            const url = document.createElement("a")
            const date = document.createElement("span")
            const price = document.createElement("span")

            title.innerHTML = `<Label><b>Title: </b></Label>${event.title}`
            url.innerHTML = `<Label><b>Link: </b></Label><a href=${event.url}>${event.url}</a><br/>`
            date.innerHTML = `<Label><b>Date: </b></Label>${event.date}<br/>`
            price.innerHTML = `<Label><b>Price: </b></Label>${event.price}<br/>`

            console.log(title, url, date, price)

            eventCard.append(title, url, date, price)
            listEvents.appendChild(eventCard)
        }

    })

    //search for devevents
    let devEvents = JSON.parse(localStorage.getItem("devevents"))
    //console.log(devevents)

    let deveventsArr = []

    for (let event of devEvents) {
        deveventsArr.push(event)
    }

    deveventsArr.forEach((event) => {
        let modifiedEventTitle = event.title.toLowerCase()
        //modifiedEventTitle.toLowerCase()

        const eventCard = document.createElement("div")
        eventCard.setAttribute("class", "event-card")

        if (modifiedEventTitle.includes(inputValue) || event.date.toLowerCase().includes(inputValue)) {
            const title = document.createElement("h4")
            const url = document.createElement("a")
            const date = document.createElement("span")
            const content = document.createElement("p")

            title.innerHTML = `<Label><b>Title: </b></Label>${event.title}`
            url.innerHTML = `<Label><b>Link: </b></Label><a href=${event.url}>${event.url}</a><br/>`
            date.innerHTML = `<Label><b>Date: </b></Label>${event.date}<br/>`
            content.innerHTML = `<Label></Label>${event.content}<br/>`

            console.log(title, url, date, content)

            eventCard.append(title, content, url, date)
            listEvents.appendChild(eventCard)
        }

    })

    //search for international conferences
    let icEvents = JSON.parse(localStorage.getItem("internationalconferences"))
    //console.log(icEvents)

    let icEventsArr = []

    for (let event of icEvents) {
        icEventsArr.push(event)
    }

    icEvents.forEach((event) => {
        let modifiedEventTitle = event.title.toLowerCase()
        //modifiedEventTitle.toLowerCase()

        const eventCard = document.createElement("div")
        eventCard.setAttribute("class", "event-card")

        if (modifiedEventTitle.includes(inputValue) || event.date.toLowerCase().includes(inputValue) || event.location.toLowerCase().includes(inputValue)) {
            const title = document.createElement("h4")
            const url = document.createElement("a")
            const date = document.createElement("span")
            const location = document.createElement("span")

            title.innerHTML = `<Label><b>Title: </b></Label>${event.title}`
            url.innerHTML = `<Label><b>Link: </b></Label><a href=${event.url} target="_blank">${event.url}</a><br/>`
            date.innerHTML = `<Label><b>Date: </b></Label>${event.date}<br/>`
            location.innerHTML = `<Label<b>Location: </b></Label>${event.location}<br/>`

            eventCard.append(title, url, date, location)
            listEvents.appendChild(eventCard)
        }

    })

    //search for conference alerts
    let conferenceAlertEvents = JSON.parse(localStorage.getItem("conferencesalerts"))
    //console.log(coonferenceAlertEvents)

    let conferenceAlertEventsArr = []

    for (let event of conferenceAlertEvents) {
        conferenceAlertEventsArr.push(event)
    }

    conferenceAlertEventsArr.forEach((event) => {
        let modifiedEventTitle = event.title.toLowerCase()
        //modifiedEventTitle.toLowerCase()

        const eventCard = document.createElement("div")
        eventCard.setAttribute("class", "event-card")

        if (modifiedEventTitle.includes(inputValue) || event.date.toLowerCase().includes(inputValue) || event.location.toLowerCase().includes(inputValue)) {
            const title = document.createElement("h4")
            const url = document.createElement("a")
            const date = document.createElement("span")
            const location = document.createElement("span")

            title.innerHTML = `<Label><b>Title: </b></Label>${event.title}`
            url.innerHTML = `<Label><b>Link: </b></Label><a href=${event.url} target="_blank">${event.url}</a><br/>`
            date.innerHTML = `<Label><b>Date: </b></Label>${event.date}<br/>`
            location.innerHTML = `<Label<b>Location: </b></Label>${event.location}<br/>`

            eventCard.append(title, url, date, location)
            listEvents.appendChild(eventCard)
        }

    })
}

//use event click and keypress to search for events
let searchButton = document.querySelector(".search-button-events")
searchButton.addEventListener("click", searchEvents)

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchEvents()
    }
})

// module.exports = {
// searchEvents: searchEvents
// }