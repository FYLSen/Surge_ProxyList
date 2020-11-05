addEventListener('fetch', event => {
    event.respondWith(getProxyList(event));
});

async function getProxyList(event) {
    const getReqHeader = (key) => event.request.headers.get(key);
    
    const url = new URL(event.request.url);
    const path = 'https:/' + url.pathname;

    let init = {
        method: event.request.method,
        headers: {
            'User-Agent': getReqHeader("User-Agent"),
            'Accept': getReqHeader("Accept"),
            'Accept-Language': getReqHeader("Accept-Language"),
            'Accept-Encoding': getReqHeader("Accept-Encoding"),
            'Connection': 'keep-alive'
        }
    };

    if (event.request.headers.has("Referer")) {
        init.headers.Referer = getReqHeader("Referer");
    }

    if (event.request.headers.has("Origin")) {
        init.headers.Origin = getReqHeader("Origin");
    }
    
    const response = await fetch(path, event.request);
    const results = await response.text();
    
    var res = results.toString().match(/\[Proxy\]\n[\S\s]+\n\[Proxy Group\]/g);
    var proxy_arr = res.toString().split(/[\[\]]/);

    return new Response(proxy_arr[2].toString(), init)
}
