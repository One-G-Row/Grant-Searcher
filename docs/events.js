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
            let loadingEvent = document.createElement("p")
            loadingEvent.textContent = "Loading Event ...."
            listEvents.appendChild(loadingEvent)
        }
    }

    populateEventsBrite()
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