const { parseCookies } = require("nookies");

function getToken() {
    const cookies = parseCookies()
    return cookies.iaiaccess
}

export default getToken;