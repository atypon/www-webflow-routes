/**
 * - run `npx wrangler dev` to run it locally
 * - run `npx wrangler deploy` to publish the worker to research-technology-atypon
 */

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

class RemoveElement {
    element(element) {
        element.remove();
    }
}

async function handleRequest(request) {
    const url = new URL(request.url)
    let { search, pathname } = url
    let targetUrl

    if (url.hostname === 'www.atypon.com') {
	targetUrl = `https://prod.webflow.atypon.com/${pathname}${search}`
    } else { /* non-prod */
	targetUrl = `https://staging.webflow.atypon.com/${pathname}${search}`
    }

        /* handle the sitemap and robots scenarios */
    if (pathname === '/sitemap.xml' || pathname === 'robots.txt') {
	const response = await fetch(targetUrl)
	const text = await response.text()
	const body = text.replaceAll('https://prod.webflow.atypon.com',
				     'https://www.atypon.com')
	const headers = new Headers(response.headers)
	headers.delete('context-length') // we just messed this value up
	return new Response(body, { status: response.status, headers })
    }
    const response = await fetch(targetUrl);
    return new HTMLRewriter()
	.on('meta[name="robots"]', new RemoveElement())
	.transform(response);
}
