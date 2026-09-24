/**
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker 
 */

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url)
    let { search, pathname } = url
    let targetUrl
    /* this is to get around that goofy route */
    if (request.url.includes('/30th-anniversary')) { pathname = "" }
    if (url.hostname === 'www.atypon.com') {
	targetUrl = `https://prod.webflow.atypon.com/${pathname}${search}`
    } else { /* non-prod */
	targetUrl = `https://staging.webflow.atypon.com/${pathname}${search}`
    }

    return fetch(targetUrl)
}
