//const API_URL = "https://grant-searcher-backend.onrender.com/api" || "http://127.0.0.1:3000/api"
const API_URL = "http://127.0.0.1:3000/api"

//import listGrants to clear grants section when you want to populate Events
const listGrants = document.querySelector(".list-grants")

//section to populate events
const listEvents = document.querySelector(".list-events")

const calendarIcon = '📅'
const locationIcon = '📍'
const moneyIcon = '💰'

//listens when an option is selected
let selectEvents = document.querySelector("#select-events")


selectEvents.addEventListener("change", () => {
    let selectedEvent = selectEvents.value

    listGrants.innerHTML = ""


    //async function populateEventsBrite() {
    //     if (selectedEvent === "eventsbrite") {
    //         listEvents.innerHTML = ""
    //         try {
    //             let loaded = false

    //             console.log(loaded)

    //             if (loaded === false) {
    //                 listEvents.innerHTML = ""
    //                 let loadingEvent = document.createElement("p")
    //                 loadingEvent.setAttribute("class", "loading-event")
    //                 loadingEvent.textContent = "Loading Event ...."
    //                 listEvents.appendChild(loadingEvent)
    //             }

    //             const response = await fetch(`${API_URL}/eventsbrite`)

    //             if (!response.ok) {
    //                 console.error(`HTTP Server Error ${response.status}`)
    //             }

    //             const responseData = await response.json()

    //             const data = responseData.data

    //             const eventsbriteArr = []

    //             listEvents.innerHTML = ""

    //             data.forEach((event) => {
    //                 const eventCard = document.createElement("div")
    //                 eventCard.setAttribute("class", "event-card")

    //                 const title = document.createElement("h4")
    //                 const url = document.createElement("a")
    //                 const date = document.createElement("span")
    //                 const price = document.createElement("span")

    //                 if (event.title !== null && event.url !== null && event.date !== null && event.price !== null) {
    //                     title.innerHTML = `<a href=${event.url} target="_blank">${event.title}</a>`
    //                     // url.innerHTML = `<Label><b>Link: </b></Label><a href=${event.url} target="_blank">${event.url}</a><br/>`
    //                     date.innerHTML = `${calendarIcon} ${event.date}<br/>`
    //                     price.innerHTML = `${moneyIcon} ${event.price}<br/>`

    //                     const eventsbriteObj = {
    //                         title: event.title,
    //                         url: event.url,
    //                         date: event.date,
    //                         price: event.price
    //                     }

    //                     eventsbriteArr.push(eventsbriteObj)
    //                     localStorage.setItem("eventsbrite", JSON.stringify(eventsbriteArr))
    //                     //localStorage.removeItem("eventsbrite")


    //                     eventCard.append(title, url, date, price)
    //                     listEvents.appendChild(eventCard)
    //                 }

    //             })
    //         }
    //         catch (error) {
    //             console.error('Error', error)
    //             listEvents.innerHTML = ""
    //             let noEvent = document.createElement("p")
    //             noEvent.setAttribute("class", "no-event")
    //             noEvent.textContent = "The event scraper is not available at the moment."
    //             listEvents.appendChild(noEvent)
    //         }

    //     }
    //     else {
    //         listEvents.innerHTML = ""
    //         let loadingEvent = document.createElement("p")
    //         loadingEvent.setAttribute("class", "loading-event")
    //         loadingEvent.textContent = "Loading Event ...."
    //         listEvents.appendChild(loadingEvent)
    //     }
    // }

    async function populateDevEvents() {
        if (selectedEvent === "devevents") {
            listEvents.innerHTML = ""

            try {
                let loaded = false

                console.log(loaded)

                if (loaded === false) {
                    listEvents.innerHTML = ""
                    let loadingEvent = document.createElement("p")
                    loadingEvent.setAttribute("class", "loading-event")
                    loadingEvent.textContent = "Loading Event ...."
                    listEvents.appendChild(loadingEvent)
                }

                const response = await fetch(`${API_URL}/devevents`)

                if (!response.ok) {
                    console.error(`HTTP Server Error ${response.status}`)
                }

                const responseData = await response.json()

                const data = responseData.data

                const deveventsArr = []

                listEvents.innerHTML = ""

                data.forEach((event) => {
                    const eventCard = document.createElement("div")
                    eventCard.setAttribute("class", "event-card")

                    const title = document.createElement("h4")
                    const url = document.createElement("a")
                    const date = document.createElement("span")
                    const content = document.createElement("p")

                    if (event.title !== null && event.url !== null && event.date !== null && event.content !== null) {
                        title.innerHTML = `<a href=${event.url} target="_blank"> ${event.title}</a>`
                        // url.innerHTML = `<Label><b>Link: </b></Label><a href=${event.url} target="_blank">${event.url}</a><br/>`
                        date.innerHTML = `${calendarIcon} ${event.date}<br/>`
                        content.innerHTML = `${event.content}<br/>`

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
                listEvents.innerHTML = ""
                let noEvent = document.createElement("p")
                noEvent.setAttribute("class", "no-event")
                noEvent.textContent = "The event scraper is not available at the moment."
                listEvents.appendChild(noEvent)
            }

        }

    }

    //international conferences events
    async function populateInternationalConferences() {
        if (selectedEvent === "internationalconferences") {
            listEvents.innerHTML = ""
            try {
                let loaded = false

                console.log(loaded)

                if (loaded === false) {
                    listEvents.innerHTML = ""
                    let loadingEvent = document.createElement("p")
                    loadingEvent.setAttribute("class", "loading-event")
                    loadingEvent.textContent = "Loading Event ...."
                    listEvents.appendChild(loadingEvent)
                }

                const response = await fetch(`${API_URL}/internationalconferences`)

                if (!response.ok) {
                    console.error(`HTTP Server Error ${response.status}`)
                }

                const responseData = await response.json()

                const data = responseData.data

                const iconferencesArr = []

                listEvents.innerHTML = ""

                data.forEach((event) => {
                    const eventCard = document.createElement("div")
                    eventCard.setAttribute("class", "event-card")

                    const title = document.createElement("h4")
                    const url = document.createElement("a")
                    const date = document.createElement("span")
                    const location = document.createElement("span")

                    if (event.title !== null && event.url !== null && event.date !== null) {
                        title.innerHTML = `<a href=${event.url}>${event.title}</a>`
                        // url.innerHTML = `<Label><b>Link: </b></Label><a href=${event.url}>${event.url}</a><br/>`
                        date.innerHTML = `${calendarIcon} ${event.date}<br/>`
                        location.innerHTML = `${locationIcon} ${event.location}<br/>`

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
                listEvents.innerHTML = ""
                let noEvent = document.createElement("p")
                noEvent.setAttribute("class", "no-event")
                noEvent.textContent = "The event scraper is not available at the moment."
                listEvents.appendChild(noEvent)
            }

        }
    }

    //conference alerts events
    async function populateConferencesAlerts() {
        if (selectedEvent === "conferencealerts") {
            listEvents.innerHTML = ""
            try {
                let loaded = false

                console.log(loaded)

                if (loaded === false) {
                    listEvents.innerHTML = ""
                    let loadingEvent = document.createElement("p")
                    loadingEvent.setAttribute("class", "loading-event")
                    loadingEvent.textContent = "Loading Event ...."
                    listEvents.appendChild(loadingEvent)
                }


                const response = await fetch(`${API_URL}/conferencealerts`)

                if (!response.ok) {
                    console.error(`HTTP Server Error ${response.status}`)
                }

                const responseData = await response.json()

                const data = responseData.data

                const conferencesalertsArr = []

                listEvents.innerHTML = ""
                data.forEach((event) => {

                    const eventCard = document.createElement("div")
                    eventCard.setAttribute("class", "event-card")

                    const title = document.createElement("h4")
                    const url = document.createElement("a")
                    const date = document.createElement("span")
                    const location = document.createElement("span")

                    if (event.title !== null && event.url !== null && event.date !== null) {
                        title.innerHTML = `<a href=${event.url} target="_blank"> ${event.title}</a>`
                        // url.innerHTML = `<Label><b>Link: </b></Label><a href=${event.url} target="_blank">${event.url}</a><br/>`
                        date.innerHTML = `${calendarIcon} ${event.date}<br/>`
                        location.innerHTML = `${locationIcon} ${event.location}<br/>`

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
                        loaded = true
                    }



                })


            }
            catch (error) {
                console.error('Error', error)
                listEvents.innerHTML = ""
                let noEvent = document.createElement("p")
                noEvent.setAttribute("class", "no-event")
                noEvent.textContent = "The event scraper is not available at the moment."
                listEvents.appendChild(noEvent)
            }

        }

    }

    async function populate10TimesEvent() {
        if (selectedEvent === "10times") {
            listEvents.innerHTML = ""
            try {
                let loaded = false

                console.log(loaded)

                if (loaded === false) {
                    listEvents.innerHTML = ""
                    let loadingEvent = document.createElement("p")
                    loadingEvent.setAttribute("class", "loading-event")
                    loadingEvent.textContent = "Loading Event ...."
                    listEvents.appendChild(loadingEvent)
                }

                const response = await fetch(`${API_URL}/tentimes`)

                if (!response.ok) {
                    console.error(`HTTP Server Error ${response.status}`)
                }

                const responseData = await response.json()

                const data = responseData.data
                console.log(data)

                const tentimesArr = []

                listEvents.innerHTML = ""

                data.forEach((event) => {
                    const eventCard = document.createElement("div")
                    eventCard.setAttribute("class", "event-card")

                    const title = document.createElement("h4")
                    const date = document.createElement("span")
                    const venue = document.createElement("span")
                    const location = document.createElement("span")
                    const content = document.createElement("p")



                    if (event.title !== null && event.date !== null /* && event.location !== null && event.content !== null && */) {
                        title.innerHTML = `<a href=${event.link} target="_blank">${event.title}</a>`
                        date.innerHTML = `${calendarIcon} ${event.date}<br/>`
                        location.innerHTML = `${locationIcon} ${event.location}<br/>`
                        venue.innerHTML = event.venue === 'Not informed' ? "" : `<Label><b>Venue / Timeline: </b></Label>${event.venue}<br/>`
                        content.innerHTML = `</Label>${event.content}<br/>`

                        const tentimesObj = {
                            title: event.title,
                            date: event.date,
                            location: event.location,
                            venue: event.venue,
                            content: event.content,
                            link: event.link
                        }

                        tentimesArr.push(tentimesObj)


                        console.log(tentimesArr)
                        eventCard.append(title, content, date, location, venue)
                        listEvents.appendChild(eventCard)
                    }
                    localStorage.setItem("tentimes", JSON.stringify(tentimesArr))
                    //localStorage.removeItem("tentimes")
                })
            }
            catch (error) {
                console.error('Error', error)
                listEvents.innerHTML = ""
                let noEvent = document.createElement("p")
                noEvent.setAttribute("class", "no-event")
                noEvent.textContent = "The event scraper is not available at the moment."
                listEvents.appendChild(noEvent)
            }

        }

    }

    //populateEventsBrite()
    populateDevEvents()
    populateInternationalConferences()
    populateConferencesAlerts()
    populate10TimesEvent()
})

let searchInput = document.querySelector(".search-input")

//devEvents
let devEvents = JSON.parse(localStorage.getItem("devevents"))

//tentimesEvents
let tentimesEvents = JSON.parse(localStorage.getItem("tentimes"))

//international conferences
let icEvents = JSON.parse(localStorage.getItem("internationalconferences"))

//conference Alert events
let conferenceAlertEvents = JSON.parse(localStorage.getItem("conferencesalerts"))

async function searchEvents() {
    listGrants.innerHTML = ""
    listEvents.innerHTML = ""

    let eventsFound = false

    let inputValue = searchInput.value.toLowerCase().trim()
    console.log(inputValue)

    //search for eventsbrite events
    // let eventsbriteEvents = JSON.parse(localStorage.getItem("eventsbrite"))
    // //console.log(eventsbriteEvents)

    // let eventbriteArr = []

    // for (let event of eventsbriteEvents) {
    //     eventbriteArr.push(event)
    // }

    // eventbriteArr.forEach((event) => {
    //     let modifiedEventTitle = event.title.toLowerCase()
    //     //modifiedEventTitle.toLowerCase()

    //     const eventCard = document.createElement("div")
    //     eventCard.setAttribute("class", "event-card")

    //     if (modifiedEventTitle.includes(inputValue) || event.date.toLowerCase().includes(inputValue)) {
    //         const title = document.createElement("h4")
    //         const url = document.createElement("a")
    //         const date = document.createElement("span")
    //         const price = document.createElement("span")

    //         title.innerHTML = `<a href=${event.url} target="_blank">${event.title}</a>`
    //         // url.innerHTML = `<Label><b>Link: </b></Label><a href=${event.url} target="_blank">${event.url}</a><br/>`
    //         date.innerHTML = `${calendarIcon} ${event.date}<br/>`
    //         price.innerHTML = `${moneyIcon} ${event.price}<br/>`

    //         console.log(title, url, date, price)

    //         eventCard.append(title, url, date, price)
    //         listEvents.appendChild(eventCard)
    //         eventsFound = true
    //     }

    // })


    //search for devevents

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

            title.innerHTML = `<a href=${event.url} target="_blank">${event.title}</a>`
            content.innerHTML = `${event.content}<br/>`
            // url.innerHTML = `<Label><b>Link: </b></Label><a href=${event.url} target="_blank">${event.url}</a><br/>`
            date.innerHTML = `${calendarIcon}${event.date}<br/>`

            console.log(title, url, date, content)

            eventCard.append(title, content, url, date)
            listEvents.appendChild(eventCard)
            eventsFound = true
        }

    })

    //search afor tentimes events

    console.log(tentimesEvents)

    let tentimesArr = []

    for (let event of tentimesEvents) {
        tentimesArr.push(event)
    }

    tentimesArr.forEach((event) => {
        let modifiedEventTitle = event.title.toLowerCase()
        //modifiedEventTitle.toLowerCase()

        const eventCard = document.createElement("div")
        eventCard.setAttribute("class", "event-card")

        if (modifiedEventTitle.includes(inputValue) || event.date.toLowerCase().includes(inputValue) || event.location.toLowerCase().includes(inputValue)) {
            const title = document.createElement("h4")
            const content = document.createElement("p")
            const date = document.createElement("span")
            const location = document.createElement("span")
            const venue = document.createElement("span")

            title.innerHTML = `<a href=${event.link} target="_blank">${event.title}</a>`
            date.innerHTML = `${calendarIcon} ${event.date}<br/>`
            location.innerHTML = `${locationIcon} ${event.location}<br/>`
            venue.innerHTML = event.venue === 'Not informed' ? "" : `<Label><b>Venue / Timeline: </b></Label>${event.venue}<br/>`
            content.innerHTML = `</Label>${event.content}<br/>`


            eventCard.append(title, content, date, location, venue)
            listEvents.appendChild(eventCard)
            eventsFound = true
        }

    })

    //search for international conferences

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

            title.innerHTML = `<a href=${event.url} target="_blank">${event.title}</a>`
            // url.innerHTML = `<Label><b>Link: </b></Label><a href=${event.url} target="_blank">${event.url}</a><br/>`
            date.innerHTML = `${calendarIcon} ${event.date}<br/>`
            location.innerHTML = `${locationIcon} ${event.location}<br/>`

            eventCard.append(title, url, date, location)
            listEvents.appendChild(eventCard)
            eventsFound = true
        }

    })

    //search for conference alerts

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

            title.innerHTML = `<Label></Label><a href=${event.url} target="_blank">${event.title}</a>`
            // url.innerHTML = `<Label><b>Link: </b></Label><a href=${event.url} target="_blank">${event.url}</a><br/>`
            date.innerHTML = `${calendarIcon} ${event.date}<br/>`
            location.innerHTML = `${locationIcon} ${event.location}<br/>`

            eventCard.append(title, url, date, location)
            listEvents.appendChild(eventCard)
            eventsFound = true
        }

    })
    //if no grants are found display message that no grants are found
    if (eventsFound === false) {
        listEvents.innerHTML = ""
        let noEvent = document.createElement("p")
        noEvent.setAttribute("class", "no-event")
        noEvent.textContent = "The search entry value is not present in the listed events."
        listEvents.appendChild(noEvent)
    }
}


//populate all events when events option is selected

async function populateAllEvents() {
    listGrants.innerHTML = ""
    //if (selectedEvent === "events") {
    if (devEvents) {
        try {
            devEvents.forEach((event) => {
                const eventCard = document.createElement("div")
                eventCard.setAttribute("class", "event-card")

                const title = document.createElement("h4")
                const url = document.createElement("a")
                const date = document.createElement("span")
                const content = document.createElement("p")

                title.innerHTML = `<a href=${event.url} target="_blank">${event.title}</a>`
                content.innerHTML = `${event.content}<br/>`
                date.innerHTML = `${calendarIcon}${event.date}<br/>`

                console.log(title, url, date, content)

                eventCard.append(title, content, url, date)
                listEvents.appendChild(eventCard)
            })

        } catch (error) {
            console.log("Error", error)
        }
    }

    if (tentimesEvents) {
        try {
            tentimesEvents.forEach((event) => {
                const eventCard = document.createElement("div")
                eventCard.setAttribute("class", "event-card")

                const title = document.createElement("h4")
                const content = document.createElement("p")
                const date = document.createElement("span")
                const location = document.createElement("span")
                const venue = document.createElement("span")

                title.innerHTML = `<a href=${event.link} target="_blank">${event.title}</a>`
                date.innerHTML = `${calendarIcon} ${event.date}<br/>`
                location.innerHTML = `${locationIcon} ${event.location}<br/>`
                venue.innerHTML = event.venue === 'Not informed' ? "" : `<Label><b>Venue / Timeline: </b></Label>${event.venue}<br/>`
                content.innerHTML = `</Label>${event.content}<br/>`


                eventCard.append(title, content, date, location, venue)
                listEvents.appendChild(eventCard)
            })

        } catch (error) {
            console.log("Error", error)
        }
    }

    if (icEvents) {
        try {
            icEvents.forEach((event) => {
                const eventCard = document.createElement("div")
                eventCard.setAttribute("class", "event-card")

                const title = document.createElement("h4")
                const url = document.createElement("a")
                const date = document.createElement("span")
                const location = document.createElement("span")

                title.innerHTML = `<a href=${event.url} target="_blank">${event.title}</a>`
                // url.innerHTML = `<Label><b>Link: </b></Label><a href=${event.url} target="_blank">${event.url}</a><br/>`
                date.innerHTML = `${calendarIcon} ${event.date}<br/>`
                location.innerHTML = `${locationIcon} ${event.location}<br/>`

                eventCard.append(title, url, date, location)
                listEvents.appendChild(eventCard)
            })

        } catch (error) {
            console.log("Error", error)
        }
    }

    if (conferenceAlertEvents) {
        try {
            conferenceAlertEvents.forEach((event) => {
                const eventCard = document.createElement("div")
                eventCard.setAttribute("class", "event-card")

                const title = document.createElement("h4")
                const url = document.createElement("a")
                const date = document.createElement("span")
                const location = document.createElement("span")

                title.innerHTML = `<Label></Label><a href=${event.url} target="_blank">${event.title}</a>`
                date.innerHTML = `${calendarIcon} ${event.date}<br/>`
                location.innerHTML = `${locationIcon} ${event.location}<br/>`

                eventCard.append(title, url, date, location)
                listEvents.appendChild(eventCard)
            })

        } catch (error) {
            console.log("Error", error)
        }
    }
}

//}
//populateAllEvents()
selectEvents.addEventListener("click", () => {
    let selectedEvent = selectEvents.value
    if (selectedEvent === "events") {
        listEvents.innerHTML = ""
        populateAllEvents()
    }
})

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