function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function utf8encode(string) {
    return unescape(encodeURIComponent(string))
}

function utf8decode(string) {
    return decodeURIComponent(escape(string))
}

function containsStdAscii(string) {
    for (let index = 0; index < string.length; index++) {
        const char = string.charCodeAt(index)
        // char is between 0-9, or between A-Z or a-z
        if ((char >= 48 && char <= 57) || (char >= 65 && char <= 90) || (char >= 97 && char <= 122)) {
            return true
        }
    }
    return false
}

export {capitalizeFirstLetter, utf8encode, utf8decode, containsStdAscii}