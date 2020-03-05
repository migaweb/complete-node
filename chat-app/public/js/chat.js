const socket = io()

//Elements
const $messageForm = document.querySelector("#message-form")
const $messageFormInput = $messageForm.querySelector("input")
const $messgeFormButton = $messageForm.querySelector("button")
const $sendLocationButton = document.querySelector("#send-location")

socket.on("message", (message) => {
    console.log(message)
})

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
            console.log(message)
        })
    })
})