import { Paginator } from "https://unpkg.com/@carry0987/paginator/dist/paginator.esm.js"
//import '../node_modules/@carry0987/paginator/theme/paginator.min.css';

const listGrants = document.querySelector(".list-grants")
console.log(listGrants)

//section to populate events
const listEvents = document.querySelector(".list-events")

//const API_URL = "https://grant-searcher-backend.onrender.com/api" || "http://127.0.0.1:3000/api"
const API_URL = "http://127.0.0.1:3000/api"


//get the option values selected in the select element box
let selectedValue = ""

const grants = document.querySelector("#select-grants")
grants.addEventListener("change", () => {
    selectedValue = grants.value


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

console.log(selectedValue)

async function populateGovGrants(){
    if(selectedValue === "grantsgov"){
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

}
}


//render scraped funds for ngos grants
const fundsForNgosButton = document.querySelector('.funds-for-ngos-button')

async function populateFundsForNgos() {
    //fundsForNgosButton.addEventListener("click", async () => {
if (selectedValue === "fundsforngos"){
      listGrants.innerHTML = ""

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
        let grantCard = document.createElement("div")
        grantCard.setAttribute("class", "grant-card")

        if (grant.title !== null && grant.url !== null && grant.content !== null) {
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
        }


    })

    console.log(data)
    return data
}
}


  

///api/africanngos
//african-ngos-button
const africanNgosButton = document.querySelector('.african-ngos-button')

//africanNgosButton.addEventListener("click", async () => {
async function populateAfricanNgos() {
if(selectedValue === "africanngos"){
    listGrants.innerHTML = ""

    const response = await fetch(`${API_URL}/africanngos`)

    if (!response.ok) {
        console.log(`HTTP SERVER ERROR, ${response.status}`)
    }

    const responseData = await response.json()

    let data = responseData.data

    let africanNgosArr = []

    data.forEach((grant) => {
        let grantCard = document.createElement("div")
        grantCard.setAttribute("class", "grant-card")

        let africanNgoTitle = document.createElement("li")
        let africanNgoUrl = document.createElement("li")
        let africanNgoContent = document.createElement("div")

        //console.log(grant.title)

        let title = []

        if (title !== null && grant.url !== null && grant.content !== null) {
            title.push(grant.title)
            console.log(title)

            africanNgoTitle.innerHTML = `<label><b>Grant Title:</b> </label> ${title}`
            africanNgoUrl.innerHTML = `<label><b>Grant URL:</b> </label><a href=${grant.url} target="_blank">${grant.url}</a>`
            africanNgoContent.innerHTML = `<p style="white-space: pre-line">${grant.content}</p><br>`


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
        }
    })

    console.log(data)
    return data

    }
}
    
    

//instrumenl grants
let instrumentlButton = document.querySelector(".instrumentl-button")
//instrumentlButton.addEventListener("click", async () => {

async function populateInstrumentl() {
if(selectedValue === "instrumentl"){
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
            let grantCard = document.createElement("div")
            grantCard.setAttribute("class", "grant-card")

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
                grantCard.appendChild(ul)
                listGrants.appendChild(grantCard)
            }

        })

    } catch (error) {
        console.log('Error', error)
    }
}
}

//open africa grants
let openAfricaButton = document.querySelector(".open-africa-button")
//openAfricaButton.addEventListener("click", async () => {

async function populateOpenAfrica() {
if(selectedValue === "openafrica"){
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
            let grantCard = document.createElement("div")
            grantCard.setAttribute("class", "grant-card")

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


                localStorage.setItem("openAfricaAid", JSON.stringify(openAfricaArr))

                ul.append(openAfricaTitle, openAfricaDate, openAfricaLink)

                grantCard.appendChild(ul)
                listGrants.appendChild(grantCard)
            }
            //})
        })


    } catch (error) {
        console.log('Error', error)
    }
}
}

//Trust Africa Grants
const trustAfricaButton = document.querySelector(".trust-africa-button")
//trustAfricaButton.addEventListener("click", async () => {

async function populateTrustAfrica(){
    if(selectedValue === "trustafrica"){
    try {
        listGrants.innerHTML = ""
        const response = await fetch(`${API_URL}/trustafrica`)

        if (!response.ok) {
            console.log(`HTTP ERROR, ${response.status}`)
        }

        const responseData = await response.json()

        const data = responseData.data
        console.log(data)

        let trustAfricaArr = []

        data.forEach((grant) => {
            let grantCard = document.createElement("div")
            grantCard.setAttribute("class", "grant-card")

            console.log(typeof (grant.amount))
            if (grant.title !== null || grant.content !== null || grant.amount !== null) {
                let ul = document.createElement("ul")

                if (grant.title !== null) {
                    let trustAfricaTitle = document.createElement("li")
                    trustAfricaTitle.innerHTML = `<label><b>Grant Title:</b> </label><span>${grant.title}</span>`
                    ul.appendChild(trustAfricaTitle)
                }

                if (grant.content !== null) {
                    let trustAfricaContent = document.createElement("li")
                    trustAfricaContent.innerHTML = `<label><b>Grant Content:</b> </label><p>${grant.content}</p>`
                    ul.appendChild(trustAfricaContent)
                }

                if (grant.amount !== null) {
                    let trustAfricaAmount = document.createElement("li")
                    trustAfricaAmount.innerHTML = `<label><b>Grant Amount:</b> </label><span>${grant.amount}</span>`
                    ul.appendChild(trustAfricaAmount)
                }

                if (grant.year !== null) {
                    let trustAfricaYear = document.createElement("li")
                    trustAfricaYear.innerHTML = `<label><b>Grant Year:</b> </label><span>${grant.year}</span>`
                    ul.appendChild(trustAfricaYear)
                }

                grantCard.appendChild(ul)
                listGrants.appendChild(grantCard)
            }



            let trustAfricaObj = {
                title: grant.title,
                amount: grant.amount,
                content: grant.content,
                year: grant.year
            }

            trustAfricaArr.push(trustAfricaObj)



            localStorage.setItem("trustAfrica", JSON.stringify(trustAfricaArr))

        })
    } catch (error) {
        console.log('Error', error)
    }
}
}

populateGovGrants()
populateFundsForNgos()
populateAfricanNgos()
populateInstrumentl()
populateOpenAfrica()
populateTrustAfrica()

})

//gov grants search
let govGrants = JSON.parse(localStorage.getItem("grantsGov"))

//search for funds for ngos
let fundsForNgos = JSON.parse(localStorage.getItem("fundsForNgos"))

//search for african ngos
let africanNgos = JSON.parse(localStorage.getItem("africanNgos"))

//search for instrumentl grants
let instrumentlGrants = JSON.parse(localStorage.getItem("instrumentl"))


//search for instrumentl grants
let trustAfricaGrants = JSON.parse(localStorage.getItem("trustAfrica"))

//search for open Africa grants
let openAfricaGrants = JSON.parse(localStorage.getItem("openAfricaAid"))


//search grants based on title, location and category
async function searchGrants() {

    listGrants.innerHTML = ""
    listEvents.innerHTML = ""

    let grantsFound = false


    //let govGrants = await fetch(`${API_URL}/grants/search`)
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
            let grantCard = document.createElement("div")
            grantCard.setAttribute("class", "grant-card")

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

            grantCard.appendChild(listGovGrants)
            listGrants.appendChild(grantCard)

            //change status of grants Found to true to display message if no grants are found
            grantsFound = true
        }

        //if no grants are found display message that no grants are found
        if (grantsFound === false ) {
            listGrants.innerHTML = ""
            let noGrant = document.createElement("p")
            noGrant.setAttribute("class", "no-grant")
            noGrant.textContent = "The search entry value is not present in the listed grants."
            listGrants.appendChild(noGrant)
        }

    })


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
            let grantCard = document.createElement("div")
            grantCard.setAttribute("class", "grant-card")

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
            grantCard.appendChild(listFundNgosGrants)

            listGrants.appendChild(grantCard)

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
            let grantCard = document.createElement("div")
            grantCard.setAttribute("class", "grant-card")

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
            grantCard.appendChild(listAfricanNgosGrants)

            listGrants.appendChild(grantCard)

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


    let instrumentlGrantArr = []

    for (let grant of instrumentlGrants) {
        instrumentlGrantArr.push(grant)
    }

    instrumentlGrantArr.filter((grant) => {
        let grantCard = document.createElement("div")
        grantCard.setAttribute("class", "grant-card")

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
            grantCard.appendChild(listInstrumentlGrants)

            listGrants.appendChild(listInstrumentlGrants)

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


    let trustAfricaArr = []

    for (let grant of trustAfricaGrants) {
        trustAfricaArr.push(grant)
    }

    trustAfricaArr.filter((grant) => {
        console.log(grant.title)
        console.log(typeof (grant.title))

        let modifiedTaTitle = ""
        let modifiedTaContent = ""

        if (grant.title !== null) {
            modifiedTaTitle = grant.title.toLowerCase()
        }

        if (grant.content !== null) {
            modifiedTaContent = grant.content.toLowerCase()
        }

        if(grant.year !== null){
            if (modifiedTaTitle.includes(inputValue) || modifiedTaContent.includes(inputValue) || grant.year.includes(inputValue)) {
            let grantCard = document.createElement("div")
            grantCard.setAttribute("class", "grant-card")

            let listTaGrants = document.createElement("ul")

            if (grant.title !== null) {
                listTaGrants.setAttribute("class", "trust-africa-grants")
                let title = document.createElement("li")
                title.setAttribute("class", "title")
                title.innerHTML = `<label>Grant Title: </label>${grant.title}`
                listTaGrants.appendChild(title)
            }

            if (grant.content !== null) {
                let content = document.createElement("li")
                content.innerHTML = `<label>Grant Content: </label><span>${grant.content}</span>`
                listTaGrants.appendChild(content)
            }

            if (grant.year !== null) {
                let year = document.createElement("li")
                year.innerHTML = `<label>Grant Year: </label><span>${grant.year}</span>`
                listTaGrants.appendChild(year)
            }

            grantCard.appendChild(listTaGrants)

            listGrants.appendChild(grantCard)

            //change status of grants Found to true to display message if no grants are found
            grantsFound = true
        }

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

    console.log(trustAfricaArr)


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
    console.log(grantsFound)
}

//populate listGrants with all grants if listGrants is empty
let searchInput = document.querySelector(".search-input")

function populatePage(){
//if (searchInput.value === "" || searchInput.value.length === 0) {


if (govGrants) {
    govGrants.forEach((grant) => {

        let grantCard = document.createElement("div")
        grantCard.setAttribute("class", "grant-card")

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

        grantCard.appendChild(listGovGrants)
        listGrants.appendChild(grantCard)
    })

}

if (fundsForNgos) {
    fundsForNgos.forEach((grant) => {
        let grantCard = document.createElement("div")
        grantCard.setAttribute("class", "grant-card")

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
        grantCard.appendChild(listFundNgosGrants)

        listGrants.appendChild(grantCard)
    })
}

    if (africanNgos) {
        africanNgos.forEach((grant) => {
            let grantCard = document.createElement("div")
            grantCard.setAttribute("class", "grant-card")

            let listAfricanNgosGrants = document.createElement("ul")
            listAfricanNgosGrants.setAttribute("class", "list-fund-ngos-grants")

            if (grant.title !== null && grant.url !== null && grant.content !== null) {
                let title = document.createElement("li")
                title.setAttribute("class", "title")
                title.innerHTML = `<label>Grant Title: </label>${grant.title}`
                let url = document.createElement("li")
                url.innerHTML = `<label>Grant URL: </label><a href=${grant.url} target="_blank">${grant.url}</a>`
                let content = document.createElement("div")
                content.innerHTML = `<p style="white-space: pre-line">${grant.content}</p>`

                listAfricanNgosGrants.append(title, url, content)
                grantCard.appendChild(listAfricanNgosGrants)

                listGrants.appendChild(grantCard)
            }

        })
    }

    if(instrumentlGrants){
        instrumentlGrants.forEach((grant) => {
            let grantCard = document.createElement("div")
            grantCard.setAttribute("class", "grant-card")

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
            grantCard.appendChild(listInstrumentlGrants)

            listGrants.appendChild(listInstrumentlGrants)
        })
    }


    if(trustAfricaGrants){
        trustAfricaGrants.forEach((grant) => {
            let grantCard = document.createElement("div")
            grantCard.setAttribute("class", "grant-card")

            let listTaGrants = document.createElement("ul")

            if (grant.title !== null) {
                listTaGrants.setAttribute("class", "trust-africa-grants")
                let title = document.createElement("li")
                title.setAttribute("class", "title")
                title.innerHTML = `<label>Grant Title: </label>${grant.title}`
                listTaGrants.appendChild(title)
            }

            if (grant.content !== null) {
                let content = document.createElement("li")
                content.innerHTML = `<label>Grant Content: </label><span>${grant.content}</span>`
                listTaGrants.appendChild(content)
            }

            if (grant.year !== null) {
                let year = document.createElement("li")
                year.innerHTML = `<label>Grant Year: </label><span>${grant.year}</span>`
                listTaGrants.appendChild(year)
            }

            grantCard.appendChild(listTaGrants)

            listGrants.appendChild(grantCard)
        })  
    }

    if(openAfricaGrants){
        openAfricaGrants.forEach((grant) => {
            let grantCard = document.createElement("div")
            grantCard.setAttribute("class", "grant-card")

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

            grantCard.appendChild(listopenAfricaGrants)
            listGrants.appendChild(grantCard)
        })
    }
}
console.log(searchInput)
//}
populatePage()

//create a paginated table 
const paginator = new Paginator({
    columns: ['Title', 'Agency', 'Url'],
    data: `${govGrants}`,
    dataRender: (response) => {
        let dataHtml = '<ul>';
        response.forEach((item, index) => {
            dataHtml += '<li><span>' + item.join(' : ') + '</span></li>';
        });
        dataHtml += '</ul>';
        document.querySelector('div.paginator').innerHTML = dataHtml;
    }
});
console.log(paginator)

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
        window.location.reload()
    }
})


// async function retrieveGrants() {

// }

