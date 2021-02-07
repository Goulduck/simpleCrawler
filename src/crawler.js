const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')
const { appendFileSync } = require('fs')

const parseUrl = async function (url) {
    const markup = await fetch(url).then(res => res.text()).catch(error => error)
    const dom = new JSDOM(markup)
    const anchorNodeList = dom.window.document.querySelectorAll('a')
    return [...anchorNodeList].map(a => a.href.replace(/\/$/, ''))
}

const crawl = async (url, limit = 10, extOnly = true) => {
    const pages = new Map()
    let pageCount = 0
    const queue = [url]
    const fileName = `${url.replace(/(^\w+:|^)\/\//, '')}.txt`
    while (pageCount < limit && queue.length) {
        const nextUrl = queue.shift()
        if (pages.has(nextUrl)) continue
        const links = await parseUrl(nextUrl).then(res => filterJunk(removeDuplicates(res), extOnly))
        pages.set(nextUrl, links)
        queue.push(...links)
        appendFileSync(fileName, JSON.stringify({ url: nextUrl, links }, 0, 4) + '\n')
        pageCount++
    }
    return `Crawl Complete - results written to ${fileName}`
}

const removeDuplicates = linkList => linkList.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])

const filterJunk = (linkList, extOnly) => {
    return extOnly
        ? linkList.filter(link => (link.includes('https://') || link.includes('http://')))
        : linkList.filter(link => link !== '#' && !link.includes('tel:') && !link.includes('mailto:'))
}

module.exports = crawl

require('make-runnable/custom')({
    printOutputFrame: false
})
