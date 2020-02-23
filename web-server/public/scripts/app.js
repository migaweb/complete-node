

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#location")
const messageTwo = document.querySelector("#forecast")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let url = "/weather?address=" + searchElement.value
    searchElement.value = "";
    messageOne.innerHTML = "Loading ...";
    messageTwo.innerHTML = "";
    
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {                
                messageOne.innerHTML = data.error;
            } else {
                messageOne.innerHTML = data.location;
                messageTwo.innerHTML = data.forecast.summary
            }
        });
    });
});