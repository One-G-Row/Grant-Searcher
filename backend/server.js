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
            'https://trustafrica.org/fluxx-grants/',
            { timeout: 60000 }
        )

        await page.waitForSelector("#flux_table", {
            timeout: 10000
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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`�Server running on port ${PORT}`);
});