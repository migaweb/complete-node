const socket = io()

//Elements
const $messageForm = document.querySelector("#message-form")
const $messageFormInput = $messageForm.querySelector("input")
const $messgeFormButton = $messageForm.querySelector("button")
const $sendLocationButton = document.querySelector("#send-location")
const $messages = document.querySelector("#messages")

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML
const locationMessageTemplate = document.querySelector("#location-message-template").innerHTML

// Listeners
socket.on("message", (message) => {
    const html = Mustache.render(messageTemplate, { 
        message: message.text, 
        createdAt: moment(message.createdAt).format("HH:mm") 
    })
    $messages.insertAdjacentHTML("beforeend", html)
})

socket.on("locationMessage", (locationMessage) => {
    const html = Mustache.render(locationMessageTemplate, { 
        url: locationMessage.url,
        createdAt: moment(locationMessage.createdAt).format("HH:mm")
    })
    $messages.insertAdjacentHTML("beforeend", html)
})

// Events
$messageForm.addEventListener("submit", (e) => {
    e.preventDefault()
    $messgeFormButton.setAttribute("disabled", "disabled")

    const message = e.target.elements.message.value
    socket.emit("sendMessage", message, (error) => {
        
        $messgeFormButton.removeAttribute("disabled")
        $messageFormInput.value = ""
        $messageFormInput.focus()

        if (error) {
            return console.log(error)
        }
        console.log("Message delivered.")
    })
    
})

$sendLocationButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("Geolocation is not supported by your browser.")
    }

    $sendLocationButton.setAttribute("disabled", "disabled")

    navigator.geolocation.getCurrentPosition((position) => {
        const location = {
            latitude: position.coords.latitude, longitude: position.coords.longitude
        }
        socket.emit("sendLocation", location, (message) => {
            $sendLocationButton.removeAttribute("disabled")
        })
    })
})