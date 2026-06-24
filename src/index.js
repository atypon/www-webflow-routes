/**
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker 
 */

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url)
    const { pathname } = url
    let targetUrl
    /* sanity check */
    if (url.hostname === 'www.atypon.com') {
	targetUrl = `https://prod.webflow.atypon.com/`
    } else { /* kick it back to the old platform */
	targetUrl = `https://www.atypon.com/${pathname}`
    }

    return fetch(targetUrl)
}
