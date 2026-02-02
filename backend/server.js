const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
const puppeteer = require('puppeteer');
const e = require('express');

console.log('Puppeteer cache directory:', puppeteer.configuration?.cacheDirectory);
console.log('Current directory:', __dirname);

const app = express()


// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json())

// Add debug logging
app.use((req, res, next) => {
    console.log('Request body:', req.body)
    next()
})

//Grants Scraper Section
app.get('/api/funds-for-ngos', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-software-rasterizer',
                '--disable-dev-tools'
            ]
        })
        const page = await browser.newPage()

        await page.goto(
            'https://www2.fundsforngos.org/category/information-technology/',
            { timeout: 60000 }
        )

        await page.waitForSelector("h2", {
            timeout: 10000
        })

        let grants = await page.$$eval("article.post", elements =>
            elements.map(el => {
                const header = el.querySelector(".entry-header")
                const h2 = header ? header.querySelector("h2") : null
                const link = h2 ? h2.querySelector("a") : null
                const contentDiv = el.querySelector(".entry-content")
                const contentText = contentDiv ? contentDiv.querySelector("p") : null

                return {
                    title: h2 ? h2.textContent.trim() : null,
                    url: link ? link.href : null,
                    content: contentText ? contentText.textContent.trim() : null
                }
            })
        )

        grants = grants.filter(grant => grant.url !== null)

        console.log(grants)
        browser.close()
        res.json({
            success: true,
            data: grants,
        })
    } catch (error) {
        console.log('Scraping error:', error)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch data'
        })
    }

})

app.get('/api/africanngos', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-software-rasterizer',
                '--disable-dev-tools'
            ]
        })
        const page = await browser.newPage()
        await page.goto(
            'https://africanngos.org/2025/12/03/african-ngo-funding-opportunities-december-2025-january-2026/',
            { timeout: 60000 }
        )

        await page.waitForSelector("strong", {
            timeout: 10000
        })

        let grants = await page.$$eval("p", elements =>
            elements.map(el => {
                const strongEl = el.querySelector("strong")
                const link = el.querySelector("a")

                // Clone the element to manipulate it
                const clone = el.cloneNode(true)

                clone.querySelectorAll('br').forEach(br => {
                    br.replaceWith('\n')
                })

                return {
                    title: strongEl ? strongEl.textContent.trim() : null,
                    url: link ? link.href : null,
                    content: clone.textContent.trim()
                }
            }
            )
        )

        console.log(grants)
        browser.close()
        res.json({
            success: true,
            data: grants,
        })
    } catch (error) {
        console.log('Scraping error:', error)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch data'
        })
    }

})

app.get('/api/instrumentl', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-software-rasterizer',
                '--disable-dev-tools'
            ]
        })
        const page = await browser.newPage()
        await page.goto(
            'https://www.instrumentl.com/browse-grants/africa',
            { timeout: 60000 }
        )

        await page.waitForSelector("h3", {
            timeout: 10000
        })

        let body = await page.$$eval("body", elements =>
            elements.map(el => {
                return {
                    body: el ? el.textContent.trim() : null,
                }
            }
            )
        )

        let grants = await page.$$eval(".featured-grant", elements =>
            elements.map(el => {
                const date = el.querySelector(".deadline")
                const deadline = date ? date.querySelector(".pull-right") : null
                const headerContainer = el.querySelector(".header")
                const title = headerContainer.querySelector("h3")
                const linkContainer = headerContainer.querySelector("h3")
                const link = linkContainer.querySelector("a")

                return {
                    title: title ? title.title : null,
                    url: link ? link.href : null,
                    deadline: deadline ? deadline.textContent : null
                }
            }
            )
        )

        grants.filter(grant => grant !== null)

        console.log(grants, body)
        browser.close()
        res.json({
            success: true,
            data: grants,
            content: body
        })
    } catch (error) {
        console.log('Scraping error:', error)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch data'
        })
    }

})

app.get('/api/openafrica', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-software-rasterizer',
                '--disable-dev-tools'
            ]
        })
        const page = await browser.newPage()
        await page.goto(
            'https://open.africa/dataset/?q=grants',
            { timeout: 60000 }

        )

        await page.waitForSelector('.dataset-heading', { timeout: 40000 })

        await page.waitForSelector('.dataset-date', { timeout: 40000 })


        let grants = await page.$$eval(".dataset-heading", elements =>
            elements.map(el => {
                console.log(el)

                const link = el.querySelector("a")
                const date = el.querySelector("div.dataset-date")

                if (!link) {
                    return null
                }

                return {
                    title: link.textContent.trim(),
                    url: link.href,
                    date: date ? date.textContent.trim() : null
                }
            }
            )
        )
        // Filter out any null/empty entries
        grants = grants.filter(grant => grant.title && grant.url)

        console.log(grants)

        await browser.close()
        res.json({
            success: true,
            data: grants,
        })
    } catch (error) {
        console.log('Scraping error:', error)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch data'
        })
    }

})

app.get('/api/trustafrica', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            protocolTimeout: 240000,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-software-rasterizer',
                '--disable-dev-tools'
            ]
        })
        const page = await browser.newPage()
        // Set a reasonable page timeout
        page.setDefaultTimeout(200000) // 200 seconds

        await page.goto(
            'https://trustafrica.org/fluxx-grants/',
            {
                timeout: 80000,
                waitUntil: 'networkidle2' // Wait for network to be mostly idle
            }
        )

        await page.waitForSelector("#flux_table", {
            timeout: 180000
        })

        let grants = await page.$$eval("#flux_table tbody tr", rows => rows.map(row => {
            const tds = row.querySelectorAll("td")
            console.log(tds)

            // if (tds.length < 4 || row.querySelector('.expandChildTable')){
            //     return null
            // } 

            const amount = tds[1]?.textContent.trim()

            const titleContainer = tds[2]
            const title =
                titleContainer?.querySelector('b')?.textContent.trim()

            const content =
                titleContainer?.querySelector('p:not(:has(b))')?.textContent.trim()

            const year = tds[3]?.textContent.trim()

            // Only return if we have actual data (title should exist)
            // if (!title || title === "Programme: Equitable") {
            //     return null
            // }

            return {
                amount: amount || null,
                title: title,
                content: content || null,
                year: year || null
            }
        }))

        // Filter out completely null objects
        grants = grants.filter(grant =>
            grant !== null &&
            (grant.amount || grant.title || grant.content || grant.year)
        )
        console.log(grants)
        await browser.close()
        res.json({
            success: true,
            data: grants,
        })
    } catch (error) {
        console.log('Scraping error:', error)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch data'
        })
    }

})

let responseData = ""

app.post('/api/grants/search', async (req, res) => {
    try {
        let requestBody = {
            "rows": req.body.rows || 100,
            "keyword": req.body.keyword || "Africa digital literacy",
            "oppNum": req.body.oppNum || "",
            "eligibilities": req.body.eligibilities || "",
            "agencies": req.body.agencies || "",
            "oppStatuses": req.body.oppStatuses || "forecasted|posted",
            "aln": req.body.aln || "",
            "fundingCategories": req.body.fundingCategories || ""
        }


        const response = await fetch("https://api.grants.gov/v1/api/search2", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(requestBody)
        })


        if (!response.ok) {
            return res.status(response.status).json({
                error: `Grants.gov API error: ${response.status}`
            })
        }

        responseData = await response.json()

        console.log(`Response data, ${responseData.msg}`)

        res.json(responseData)


    } catch (error) {
        console.error('Error fetching grants', error)
        res.status(500).json({ error: 'Failed to fetch grants' });
    }
})

console.log(responseData)

app.post('/api/grants/details', async (req, res) => {
    try {
        const response = await fetch("https://api.grants.gov/v1/api/fetchOpportunity", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oppId: req.body.oppId
            })
        })


        if (!response.ok) {
            res.status(response.status).json({ error: `Grants.gov API error: ${response.status}` })
        }

        const responseData = await response.json()

        res.json(responseData)

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch opportunity' })
    }
})

//Events Scraper Section
//eventsbrite
app.get('/api/eventsbrite', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-software-rasterizer',
                '--disable-dev-tools'
            ]
        })
        const page = await browser.newPage()
        await page.goto(
            'https://www.eventbrite.com/d/kenya--nairobi/tech-events/',
            { timeout: 80000 }
        )

        await page.waitForSelector("section.event-card-details", {
            timeout: 60000
        })


        let events = await page.$$eval("section.event-card-details", elements =>
            elements.map(el => {
                const cardContainer = el.querySelector("div.Stack_root__1ksk7")
                const link = cardContainer ? cardContainer.querySelector("a.event-card-link") : null
                const title = link ? link.querySelector("h3") : null
                const date = cardContainer ? cardContainer.querySelector("p") : null
                const priceContainer = cardContainer ? cardContainer.querySelector("div.DiscoverHorizontalEventCard-module__priceWrapper___3rOUY") : null
                const price = priceContainer ? priceContainer.querySelector("p") : null

                return {
                    title: title ? title.textContent.trim() : null,
                    url: link ? link.href : null,
                    date: date ? date.textContent : null,
                    price: price ? price.textContent.trim() : null
                }
            }
            )
        )

        events.filter(event => event !== null)

        console.log(events)
        browser.close()

        res.json({
            success: true,
            data: events,
        })
    } catch (error) {
        console.log('Scraping error:', error)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch data'
        })
    }

})

//dev events
app.get('/api/devevents', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-software-rasterizer',
                '--disable-dev-tools'
            ]
        })
        const page = await browser.newPage()
        await page.goto(
            'https://dev.events/AF/KE/Nairobi/tech',
            { timeout: 80000 }
        )

        await page.waitForSelector("div.row.columns.is-mobile", {
            timeout: 60000
        })


        let events = await page.$$eval("div.row.columns.is-mobile", elements =>
            elements.map(el => {
                const dateContainer = el.querySelector("div.column.is-one-quarter")
                const date = dateContainer ? dateContainer.querySelector("time a") : null
                const link = el.querySelector("h2.title a")
                const content = el.querySelector("h3.subtitle")

                return {
                    title: link ? link.textContent.trim() : null,
                    url: link ? link.href : null,
                    date: date ? date.textContent.trim() : null,
                    content: content ? content.textContent.trim() : null
                }
            }
            )
        )

        events = events.filter(event => event !== null)

        console.log(events)
        browser.close()

        res.json({
            success: true,
            data: events,
        })
    } catch (error) {
        console.log('Scraping error:', error)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch data'
        })
    }

})

//international tech conferences
app.get('/api/internationalconferences', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-software-rasterizer',
                '--disable-dev-tools'
            ]
        })
        const page = await browser.newPage()
        await page.goto(
            'https://internationalconferencealerts.com/con/africa/information-technology',
            { timeout: 80000 }
        )

        await page.waitForSelector("div.conf-list", {
            timeout: 60000
        })


        let events = await page.$$eval("div.conf-list", elements =>
            elements.map(el => {
                const link = el.querySelector("div.col-md-10 a")
                const title = link ? link.querySelector("p.event-name") : null
                const date = el.querySelector("p.listing-date")
                const location = el.querySelector("div.c-loc")

                return {
                    title: title ? title.textContent.trim() : null,
                    url: link ? link.href : null,
                    date: date ? date.textContent.trim() : null,
                    location: location ? location.textContent.trim() : null
                }
            }
            )
        )

        events = events.filter(event => event !== null)

        console.log(events)
        browser.close()

        res.json({
            success: true,
            data: events,
        })
    } catch (error) {
        console.log('Scraping error:', error)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch data'
        })
    }

})

//conference alerts
app.get('/api/conferencealerts', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-software-rasterizer',
                '--disable-dev-tools'
            ]
        })
        const page = await browser.newPage()
        await page.goto(
            'https://conferencealerts.co.in/kenya/information-technology',
            { timeout: 80000 }
        )

        await page.waitForSelector("tr.data", {
            timeout: 60000
        })


        let events = await page.$$eval("tr.data", elements =>
            elements.map(el => {

                const header = el.querySelector("td.align-middle.p-lg-3.p-1 a")
                const date = el.querySelector("a p.location-name")
                const location = el.querySelector("h4.location-name")

                console.log(header)
                return {
                    title: header ? header.title : null,
                    url: header ? header.href : null,
                    date: date ? date.textContent.trim() : null,
                    location: location ? location.textContent.trim() : null
                }
            }
            )
        )

        events = events.filter(event => event !== null)

        console.log(events)
        browser.close()

        res.json({
            success: true,
            data: events,
        })
    } catch (error) {
        console.log('Scraping error:', error)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch data'
        })
    }

})


//10times Kenya
app.get('/api/tentimes', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: 'false',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-software-rasterizer',
                '--disable-dev-tools'
            ]
        })
        const page = await browser.newPage()

        // Set a realistic viewport and user agent
        await page.setViewport({ width: 1920, height: 1080 })
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

        await page.goto(
            'https://10times.com/kenya/technology',
            {
                timeout: 60000,
                waitUntil: 'networkidle2'
            }
        )

        // Take a screenshot to see what loaded
        // await page.screenshot({ path: 'debug-screenshot.png', fullPage: true })

        // // Log the HTML to see what's actually there
        // const html = await page.content()
        // console.log('Page HTML length:', html.length)

        // // Try to find ANY tr elements
        // const trElements = await page.$$('tr')
        // console.log('Found tr elements:', trElements.length)

        // // Try to find elements with 'event-card' class
        // const eventCards = await page.$$('.event-card')
        // console.log('Found event-card elements:', eventCards.length)

        // // Try broader selector
        // const rowElements = await page.$$('.row')
        // console.log('Found row elements:', rowElements.length)

        await page.waitForSelector("tr.row", {
            timeout: 80000
        })

        let events = await page.$$eval("tr.row", elements =>
            elements.map(el => {
                const dateContainer = el.querySelector("td.col-12.text-dark")
                const date = dateContainer ? dateContainer.querySelector("div.small.fw-500") : null
                const titleContainer = el.querySelector("td.col-12.c-ga")
                const linkAttr = titleContainer ? titleContainer.getAttribute("onclick") : null
                let link = null
                if (titleContainer) {
                    const linkAttr = titleContainer.getAttribute("onclick")
                    if (linkAttr) {
                        // Method 1: Using regex to extract URL from window.open('URL', '_blank')
                        const match = linkAttr.match(/window\.open\(['"]([^'"]+)['"]/)
                        console.log(match)
                        if (match && match[1]) {
                            link = match[1].startsWith('http')
                                ? match[1]
                                : 'https://10times.com' + match[1]
                        }
                    }
                }
                const titleCon = titleContainer ? titleContainer.querySelector("h2.position-relative.mb-0") : null
                const header = titleCon ? titleCon.querySelector("span.text-decoration-none") : null
                const title = header ? header.querySelector("span.d-block") : null
                const venueContainer = titleContainer ? titleContainer.querySelector("div.d-flex.text-primary") : null
                const venue = venueContainer ? venueContainer.querySelector("div.small.text-primary") : null
                const locationContainer = el.querySelector("td.col-12.mb-2")
                const locationCon = locationContainer ? locationContainer.querySelector("div.small.fw-500.venue") : null
                const location = locationCon ? locationCon.querySelector("a.text-dark.text-decoration-none") : null
                const contentContainer = el.querySelector("td.col-12.mt-3")
                const content = contentContainer ? contentContainer.querySelector("div.small.text-wrap.text-break") : null

                console.log(linkAttr)

                return {
                    title: title ? title.textContent.trim() : null,
                    date: date ? date.textContent.trim() : null,
                    content: content ? content.textContent.trim() : null,
                    venue: venue ? venue.textContent.trim() : "Not informed",
                    location: location ? location.textContent.trim() : null,
                    link: link
                }
            }
            )
        )

        events = events.filter(event => event !== null)

        console.log(events)
        browser.close()

        res.json({
            success: true,
            data: events,
        })
    } catch (error) {
        console.log('Scraping error:', error)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch data'
        })
    }

})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`�Server running on port ${PORT}`);
});