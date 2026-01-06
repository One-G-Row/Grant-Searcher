const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
const puppeteer = require('puppeteer')

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

app.get('/api/funds-for-ngos', async (req, res) => {
    try {
        const browser = await puppeteer.launch({})
        const page = await browser.newPage()

        await page.goto(
            'https://www2.fundsforngos.org/category/information-technology/',
            { timeout: 60000 }
        )

        await page.waitForSelector("h2", {
            timeout: 10000
        })

        let grants = await page.$$eval("h2", elements =>
            elements.map(el => {
                const link = el.querySelector("a")
                return {
                    title: el.textContent.trim(),
                    url: link ? link.href : null
                }
            })
        )

        //grants = grants.filter(grants.url !== null)

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
        const browser = await puppeteer.launch({})
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
           
                return {
                    title: strongEl ? strongEl.textContent.trim() : null,
                    url: link ? link.href : null
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
        const browser = await puppeteer.launch({})
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

        let grants = await page.$$eval("h3", elements =>
            elements.map(el => {
               /* const strongEl = el.querySelector("strong") */
               const link = el.querySelector("a")

                return {
                    title: el ? el.textContent.trim() : null,
                    url: link ? link.href : null
                }  
            }
            )
        )

        console.log(grants, body)
        browser.close()
        res.json({
            success: true,
            data: grants,
            content:body
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
        const browser = await puppeteer.launch({})
        const page = await browser.newPage()
        await page.goto(
            'https://open.africa/dataset/?q=grants',
            { timeout: 60000 }
        
        )

        await page.waitForSelector('.dataset-heading', { timeout: 40000 })

        await page.waitForSelector('.dataset-date', { timeout: 40000 })

        let grantsDate = await page.$$eval(".dataset-date", elements => 
            elements.map(el => {
                return {
                    date: el.textContent.trim()
                }
            })
        )

        console.log(grantsDate)


        let grants = await page.$$eval(".dataset-heading", elements =>
            elements.map(el => {
                console.log(el)

                const link = el.querySelector("a")

                if(!link){
                    return null
                }

                return {
                    title: link.textContent.trim(),
                    url: link.href
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
            date: grantsDate
        })
    } catch (error) {
        console.log('Scraping error:', error)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch data'
        })
    }

})

// app.get('/api/scraper', async (res, next)=> {
//     const browser = await puppeteer.launch({})
//     const page = await browser.newPage()
//     await page.goto(
// 'https://www.geeksforgeeks.org/node-js/explain-the-mechanism-of-event-loop-in-node-js/')
//     let element = await page.waitFor("h1")
//     let text = await page.evaluate(
//         element => element.textContent, element)
//     console.log(text)
//     browser.close()
//     return text

//     next()
// })

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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`�Server running on port ${PORT}`);
});