export function getDataFromLocalStorage(key) {
    if(localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key))
    }
    return []
}

export function setDataToLocalStorage(key , value) {
    localStorage.setItem(key,JSON.stringify(value))
}
