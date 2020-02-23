const addParameter = (url, key, value) => {
    return  url + (!url.endsWith("?") ? "&" : "") + key + "=" + value
}

module.exports = addParameter 