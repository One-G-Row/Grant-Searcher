const listGrants = document.querySelector(".list-grants")
console.log(listGrants)

const API_URL = "https://grant-searcher-backend.onrender.com/api" || "http://127.0.0.1:3000/api"
//const API_URL = "http://127.0.0.1:3000/api"

//get grants button to trigger listing grants
const grantsGovButton = document.querySelector(".gov-grants-button")

let requestBody = {
    "rows": 100,
    "keyword": "Africa digital literacy",
    "oppStatuses": "forecasted|posted"
}


async function postGrants() {
    let response = await fetch(`${API_URL}/grants/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })


    if (!response.ok) {
        console.log(`HTTP Server Error, ${response.status}`)
    }

    let responseData = await response.json()
    console.log(responseData)


    return responseData
}


grantsGovButton.addEventListener("click", async () => {
    listGrants.innerHTML = ""

    const responseData = await postGrants()

    console.log(responseData)


    //responseData.forEach(grant => {


    let grants = responseData.data.oppHits

    //create an array for storing gtants gov obj
    let grantsGovArr = []

    grants.forEach(grant => {
        //create card to hold grant info
        let grantCard = document.createElement("div")
        grantCard.setAttribute("class", "grant-card")

        let ul = document.createElement("ul")
        ul.setAttribute("class", "grant-ul")

        let titleLabel = document.createElement("label")
        titleLabel.textContent = "Grant Title: "
        let title = document.createElement("li")
        title.setAttribute("class", "title")
        title.textContent = `${grant.title}`
        let titleContainer = document.createElement("div")
        titleContainer.setAttribute("class", "title-container")
        titleContainer.append(titleLabel, title)

        let openDateLabel = document.createElement("label")
        openDateLabel.textContent = "Open Date: "
        let openDate = document.createElement("li")
        openDate.textContent = `${grant.openDate}`
        let openDateContainer = document.createElement("div")
        openDateContainer.setAttribute("class", "opendate-container")
        openDateContainer.append(openDateLabel, openDate)

        let closeDateLabel = document.createElement("label")
        closeDateLabel.textContent = "Close Date: "
        let closeDate = document.createElement("li")
        closeDate.textContent = `${grant.closeDate}`
        let closeDateContainer = document.createElement("div")
        closeDateContainer.setAttribute("class", "closedate-container")
        closeDateContainer.append(closeDateLabel, closeDate)

        let agencyContainer = document.createElement("div")
        let agencyLabel = document.createElement("label")
        agencyLabel.textContent = "Agency: "
        let agency = document.createElement("li")
        agency.textContent = `${grant.agency}`
        agencyContainer.setAttribute("class", "agency-container")
        agencyContainer.append(agencyLabel, agency)

        let grantsGovObj = {
            title: grant.title,
            openData: grant.openDate,
            closeDate: grant.closeDate,
            agency: grant.agency
        }

        grantsGovArr.push(grantsGovObj)

        localStorage.setItem("grantsGov", JSON.stringify(grantsGovArr))

        ul.append(titleContainer, agencyContainer, openDateContainer, closeDateContainer)
        grantCard.appendChild(ul)
        listGrants.appendChild(grantCard)
    })
    //})

})

//render scraped funds for ngos grants
const fundsForNgosButton = document.querySelector('.funds-for-ngos-button')

fundsForNgosButton.addEventListener("click", async () => {
    listGrants.innerHTML = ""

    let grantCard = document.createElement("div")
    grantCard.setAttribute("class", "grant-card")

    const response = await fetch(`${API_URL}/funds-for-ngos`)

    if (!response.ok) {
        console.log(`HTTP SERVER ERROR, ${response.status}`)
    }

    const responseData = await response.json()


    let data = responseData.data
    let content = data.content

    //let links = responseData.links

    let fundsNgosArr = []

    data.forEach((grant) => {
        let fundsTitle = document.createElement("li")
        fundsTitle.innerHTML = `<label><b>Grant Title:</b> </label>${grant.title}`
        let fundsUrl = document.createElement("li")
        fundsUrl.innerHTML = `<label><b>Grant URL:</b> </label><a href=${grant.url} target="_blank">${grant.url}</a>`
        let fundsDate = document.createElement("li")
        fundsDate.innerHTML = `<span>${grant.content.slice(0, 21)}</span>`

        let ul = document.createElement("ul")

        let fundsNgosObj = {
            title: grant.title,
            url: grant.url,
            date: grant.content.slice(0, 21)
        }

        fundsNgosArr.push(fundsNgosObj)

        localStorage.setItem("fundsForNgos", JSON.stringify(fundsNgosArr))

        ul.append(fundsTitle, fundsUrl, fundsDate)
        grantCard.appendChild(ul)
        listGrants.appendChild(grantCard)
    })

    console.log(data)
    return data
})

///api/africanngos
//african-ngos-button
const africanNgosButton = document.querySelector('.african-ngos-button')
africanNgosButton.addEventListener("click", async () => {
    listGrants.innerHTML = ""

    let grantCard = document.createElement("div")
    grantCard.setAttribute("class", "grant-card")

    const response = await fetch(`${API_URL}/africanngos`)

    if (!response.ok) {
        console.log(`HTTP SERVER ERROR, ${response.status}`)
    }

    const responseData = await response.json()

    let data = responseData.data

    let africanNgosArr = []

    data.forEach((grant) => {
        let africanNgoTitle = document.createElement("li")
        let africanNgoUrl = document.createElement("li")
        let africanNgoContent = document.createElement("div")

        //console.log(grant.title)

        let title = []

        if (grant.title !== null || grant.url !== null) {
            title.push(grant.title)
            africanNgoTitle.innerHTML = `<label><b>Grant Title:</b> </label> ${title}`
            africanNgoUrl.innerHTML = `<label><b>Grant URL:</b> </label><a href=${grant.url} target="_blank">${grant.url}</a>`
            africanNgoContent.innerHTML = `<p style="white-space: pre-line">${grant.content}</p><br>`
        }

        let ul = document.createElement("ul")

        let africanNgosObj = {
            title: grant.title,
            url: grant.url,
            content: grant.content
        }

        africanNgosArr.push(africanNgosObj)

        localStorage.setItem("africanNgos", JSON.stringify(africanNgosArr))

        ul.append(africanNgoTitle, africanNgoUrl, africanNgoContent)
        grantCard.appendChild(ul)
        listGrants.appendChild(grantCard)
    })

    console.log(data)
    return data
})

//instrumenl grants
let instrumentlButton = document.querySelector(".instrumentl-button")
instrumentlButton.addEventListener("click", async () => {
    try {
        listGrants.innerHTML = ""
        const response = await fetch(`${API_URL}/instrumentl`)

        if (!response.ok) {
            console.log(`HTTP SERVER ERROR, ${response.status}`)
        }

        const responseData = await response.json()
        const data = responseData.data
        const body = responseData.body

        const instrumenlArr = []

        data.forEach((grant) => {
            let instrumenlTitle = document.createElement("li")
            instrumenlTitle.innerHTML = `<label><b>Grant Title:</b> </label> ${grant.title}`
            let instrumenlContent = document.createElement("p")
            instrumenlContent.textContent = `${body}`
            let instrumenlLink = document.createElement("li")
            instrumenlLink.innerHTML = `<label><b>Grant URL:</b> </label><a href=${grant.url} target="_blank">${grant.url}</a>`
            let instrumenlDate = document.createElement("li")

            let grantDeadline = grant.deadline === null ? "Rolling Deadline" : `${grant.deadline}` 
            instrumenlDate.innerHTML = `<label><b>Deadline:</b> </label><span>${grantDeadline}</span>`
            
            let ul = document.createElement("ul")

            let instrumenlObj = {
                title: grant.title,
                url: grant.url,
                deadline: grantDeadline
            }

            instrumenlArr.push(instrumenlObj)

            localStorage.setItem("instrumentl", JSON.stringify(instrumenlArr))

            if (grant.url !== null && grant.title !== null) {
                ul.append(instrumenlTitle, instrumenlLink, instrumenlDate)
                listGrants.appendChild(ul)
            }

        })

    } catch (error) {
        console.log('Error', error)
    }
})

//open africa grants
let openAfricaButton = document.querySelector(".open-africa-button")
openAfricaButton.addEventListener("click", async () => {
    try {
        listGrants.innerHTML = ""
        const response = await fetch(`${API_URL}/openafrica`)

        if (!response.ok) {
            console.log(`HTTP SERVER ERROR, ${response.status}`)
        }

        const responseData = await response.json()
        console.log(responseData)

        let data = responseData.data

        let date = responseData.date
        console.log(date)

        let openAfricaArr = []

        data.forEach((grant) => {
            //date.forEach((d) => {
                let grantDate = grant.date
                console.log(grantDate)

                //get the current date
                let currentDate = new Date()
                let currentYear = currentDate.getFullYear()
                let lastYear = currentYear - 11
                console.log(currentYear)
                console.log(lastYear)

                if (grantDate.includes(lastYear) || grantDate.includes(currentYear)) {
                    let openAfricaTitle = document.createElement("li")
                    openAfricaTitle.innerHTML = `<label>Grant Title: </label> ${grant.title}`
                    let openAfricaDate = document.createElement("li")
                    openAfricaDate.innerHTML = `<label>Published Date : </label> ${grantDate}`


                    let openAfricaLink = document.createElement("li")
                    openAfricaLink.innerHTML = `<label>Grant URL: </label><a href=${grant.url} target="_blank">${grant.url}</a>`
                    let ul = document.createElement("ul")


                    let openAfricaObj = {
                        title: grant.title,
                        date: grantDate,
                        url: grant.url
                    }

                    openAfricaArr.push(openAfricaObj)

                    localStorage.clear()

                    localStorage.setItem("openAfricaAid", JSON.stringify(openAfricaArr))

                    ul.append(openAfricaTitle, openAfricaDate, openAfricaLink)

                    listGrants.appendChild(ul)
                }
            //})
        })


    } catch (error) {
        console.log('Error', error)
    }
})

//Trust Africa Grants
const trustAfricaButton = document.querySelector(".trust-africa-button")
trustAfricaButton.addEventListener("click", async () => {
    try{
    const response = await fetch(`${API_URL}/trustafrica`)

    if(!response.ok){
        console.log(`HTTP ERROR, ${response.status}`)
    }

    const responseData = await response.json()

    const data = responseData.data
    console.log(data)

    let trustAfricaArr = []

    data.forEach((grant) => {
            let trustAfricaTitle = document.createElement("li")
            trustAfricaTitle.innerHTML = `<label><b>Grant Title:</b> </label><h1>${grant.title}</h1>`
            let trustAfricaContent = document.createElement("li")
            trustAfricaContent.innerHTML = `<label><b>Grant Content:</b> </label><p>${grant.content}</p>`
            let trustAfricaAmount = document.createElement("li")
            trustAfricaAmount.innerHTML = `<label><b>Grant Amount:</b> </label><span>${grant.amount}</span>`
            
            let ul = document.createElement("ul")

            let trustAfricaObj = {
                title: grant.title,
                amount: grant.amount,
                content: grant.content
            }

            trustAfricaArr.push(trustAfricaObj)

            localStorage.setItem("trustAfrica", JSON.stringify(trustAfricaArr))
        
            ul.append(trustAfricaTitle, trustAfricaContent, trustAfricaAmount)
            
            listGrants.appendChild(ul)
        })
}catch(error){
    console.log('Error', error)
}
})

//search grants based on title, location and category
async function searchGrants() {
    listGrants.innerHTML = ""

    let grantsFound = false

    //gov grants search
    let govGrants = JSON.parse(localStorage.getItem("grantsGov"))
    //let govGrants = await fetch(`${API_URL}/`)
    console.log(govGrants)

    let govGrantTitle = []

    for (let grant of govGrants) {
        govGrantTitle.push(grant)
    }
    console.log(govGrantTitle)

    let inputValue = searchInput.value.toLowerCase()
    console.log(inputValue)

    govGrantTitle.filter((grant) => {
        console.log(grant)

        let modifiedTitle = grant.title.toLowerCase()
        let modifiedAgency = grant.agency.toLowerCase()

        let check = modifiedTitle.includes(inputValue)
        console.log(check)

        if (modifiedTitle.includes(inputValue) || modifiedAgency.includes(inputValue)) {
            //let grantSection = document.createElement("div")
            let listGovGrants = document.createElement("ul")
            listGovGrants.setAttribute("class", "list-gov-grants")
            let title = document.createElement("li")
            title.setAttribute("class", "title")
            title.innerHTML = `<label>Grant Title: </label>${grant.title}`
            let oDate = document.createElement("li")
            oDate.innerHTML = `<label>Open Date: </label>${grant.openData}`
            let dDate = document.createElement("li")
            dDate.innerHTML = `<label>Close Date: </label>${grant.closeDate}`
            let agency = document.createElement("li")
            agency.innerHTML = `<label>Agency: </label>${grant.agency}`
            listGovGrants.append(title, oDate, dDate, agency)
            listGrants.appendChild(listGovGrants)

            //change status of grants Found to true to display message if no grants are found
            grantsFound = true
        }


    })

    //search for funds for ngos
    let fundsForNgos = JSON.parse(localStorage.getItem("fundsForNgos"))
    // let response = await fetch(`${API_URL}/funds-for-ngos`)

    // if (!response.ok) {
    //     console.log(`HTTP SERVER ERROR, ${response.status}`)
    // }

    // let responseData = await response.json()

    // let fundsForNgos = responseData.data
    console.log(fundsForNgos)

    let fundsNgosTitle = []

    for (let grant of fundsForNgos) {
        fundsNgosTitle.push(grant)
    }

    fundsNgosTitle.filter((grant) => {
        let modifiedFundsTitle = grant.title.toLowerCase()

        console.log(grant.date)

        if (modifiedFundsTitle.includes(inputValue)) {
            let listFundNgosGrants = document.createElement("ul")
            listFundNgosGrants.setAttribute("class", "list-fund-ngos-grants")
            let title = document.createElement("li")
            title.setAttribute("class", "title")
            title.innerHTML = `<label>Grant Title: </label>${grant.title}`
            let url = document.createElement("li")
            url.innerHTML = `<label>Grant URL: </label><a href=${grant.url} target="_blank">${grant.url}</a>`
            let date = document.createElement("li")
            date.innerHTML = `<span>${grant.date}</span>`

            listFundNgosGrants.append(title, url, date)
            listGrants.appendChild(listFundNgosGrants)

            //change status of grants Found to true to display message if no grants are found
            grantsFound = true
        }


    })

    //search for african ngos
    let africanNgos = JSON.parse(localStorage.getItem("africanNgos"))
    //console.log(africanNgos)

    let africanNgosTitle = []

    for (let grant of africanNgos) {
        //console.log(grant)
        //console.log(grant.url)
        if (grant.title !== null && grant.url !== null) {
            africanNgosTitle.push(grant)
        }
    }

    //console.log(africanNgosTitle)

    africanNgosTitle.filter((grant) => {
        /* console.log(typeof(grant.title.toString())) */

        let modifiedAfricanNgoTitle = null
        if (grant.title !== null) {
            modifiedAfricanNgoTitle = grant.title.toLowerCase()
            //console.log(typeof (modifiedAfricanNgoTitle))
        }
        //console.log(modifiedAfricanNgoTitle)

        /* modifiedAfricanNgoTitle.toString().toLowerCase() */

        if (modifiedAfricanNgoTitle !== null && modifiedAfricanNgoTitle.includes(inputValue)) {
            let listAfricanNgosGrants = document.createElement("ul")
            listAfricanNgosGrants.setAttribute("class", "list-fund-ngos-grants")
            let title = document.createElement("li")
            title.setAttribute("class", "title")
            title.innerHTML = `<label>Grant Title: </label>${grant.title}`
            let url = document.createElement("li")
            url.innerHTML = `<label>Grant URL: </label><a href=${grant.url} target="_blank">${grant.url}</a>`
            let content = document.createElement("div")
            content.innerHTML = `<p style="white-space: pre-line">${grant.content}</p>`

            listAfricanNgosGrants.append(title, url, content)
            listGrants.appendChild(listAfricanNgosGrants)

            //change status of grants Found to true to display message if no grants are found
            grantsFound = true
        }
    })

    //search for instrumentl grants
    let instrumentlGrants = JSON.parse(localStorage.getItem("instrumentl"))

    let instrumentlGrantArr = []

    for (let grant of instrumentlGrants) {
        instrumentlGrantArr.push(grant)
    }

    instrumentlGrantArr.filter((grant) => {
        let modifiedInstrumentlTitle = grant.title.toLowerCase()
        let year = grant.deadline.slice(8, 12)

        if (modifiedInstrumentlTitle.includes(inputValue) || year.includes(inputValue)) {
            let listInstrumentlGrants = document.createElement("ul")
            listInstrumentlGrants.setAttribute("class", "instrumentl-grants")
            let title = document.createElement("li")
            title.setAttribute("class", "title")
            title.innerHTML = `<label>Grant Title: </label>${grant.title}`
            let url = document.createElement("li")
            url.innerHTML = `<label>Grant URL: </label><a href=${grant.url} target="_blank">${grant.url}</a>`
            let deadline = document.createElement("li")
            deadline.innerHTML = `<label>Grant Deadline: </label><span>${grant.deadline}</span>`
            
            listInstrumentlGrants.append(title, url, deadline)
            listGrants.appendChild(listInstrumentlGrants)

            //change status of grants Found to true to display message if no grants are found
            grantsFound = true
        }

    })

    //console.log(instrumentlGrantArr)

    //search for open Africa grants
    let openAfricaGrants = JSON.parse(localStorage.getItem("openAfricaAid"))

    let openAfricaTitle = []

    for (let grant of openAfricaGrants) {
        openAfricaTitle.push(grant)
    }


    openAfricaTitle.filter((grant) => {
        let modifiedDaTitle = grant.title.toLowerCase()
        let year = grant.date.slice(19, 23)
        console.log(year)

        if (modifiedDaTitle.includes(inputValue) || year.includes(inputValue)) {
            let listopenAfricaGrants = document.createElement("ul")
            listopenAfricaGrants.setAttribute("class", "list-development-aids-grants")
            let title = document.createElement("li")
            title.setAttribute("class", "title")
            title.innerHTML = `<label>Grant Title: </label>${grant.title}`
            let date = document.createElement("li")
            date.innerHTML = `<label>Published Date: </label>${grant.date}`
            let url = document.createElement("li")
            url.innerHTML = `<label>Grant URL: </label><a href=${grant.url} target="_blank">${grant.url}</a>`
            listopenAfricaGrants.append(title, url, date)
            listGrants.appendChild(listopenAfricaGrants)

            //change status of grants Found to true to display message if no grants are found
            grantsFound = true
        }

        //if no grants are found display message that no grants are found
        if (grantsFound === false) {
            listGrants.innerHTML = ""
            let noGrant = document.createElement("p")
            noGrant.setAttribute("class", "no-grant")
            noGrant.textContent = "The search entry value is not present in the listed grants."
            listGrants.appendChild(noGrant)
        }
    })
}

let searchInput = document.querySelector(".search-input")

let searchButton = document.querySelector(".search-button")
searchButton.addEventListener("click", searchGrants)

//searchInput.addEventListener("input", searchGrants)

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchGrants()
    }
})

//if input field value is empty then make the listGrants empty
searchInput.addEventListener("input", () => {
    let search = searchInput.value
    if (search === "" || search.length === 0) {
        listGrants.innerHTML = ""
    }
})


// async function retrieveGrants() {

// }

