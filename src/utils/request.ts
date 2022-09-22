export function myFetch(url: string, method: string) {
    return fetch(url, {
        method: method,
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    })

}