addEventListener('fetch', event => {
    event.respondWith(getProxyList(event));
});

async function getProxyList(event) {
    const url = new URL(event.request.url);
    const path = 'https:/' + url.pathname;

        const modifiedRequest = new Request(path, event.request);

    const response = await fetch(modifiedRequest);
    const results = await response.text();
    
    const proxyListRegex = /\[Proxy\]\n([\s\S]+?)\n\[Proxy Group\]/;
    const match = proxyListRegex.exec(results);
    const proxyList = match ? match[1] : '';

    return new Response(proxyList, response);
}