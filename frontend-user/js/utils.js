function getFromStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
