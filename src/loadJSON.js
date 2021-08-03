export default function loadJSON(path) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.onload = function () {
            resolve(JSON.parse(this.responseText));
        }
        xhr.onerror = (err) => reject(err);
        xhr.send(null);
    });
}