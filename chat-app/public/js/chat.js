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
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoscroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild
    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = $messages.offsetHeight
    // Height of messages container
    const containerHeight = $messages.scrollHeight
    // How far have i scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (Math.round(containerHeight - newMessageHeight) <= Math.round(scrollOffset)) {
        console.log("scroll: ", $messages.scrollHeight)
        $messages.scrollTop = $messages.scrollHeight
    }

}

// Listeners
socket.on("message", (message) => {
    const html = Mustache.render(messageTemplate, { 
        username: message.username,
        message: message.text, 
        createdAt: moment(message.createdAt).format("HH:mm") 
    })
    $messages.insertAdjacentHTML("beforeend", html)
    autoscroll()
})

socket.on("locationMessage", (locationMessage) => {
    const html = Mustache.render(locationMessageTemplate, { 
        username: locationMessage.username,
        url: locationMessage.url,
        createdAt: moment(locationMessage.createdAt).format("HH:mm")
    })
    $messages.insertAdjacentHTML("beforeend", html)
    autoscroll()
})

socket.on("roomData", ({room, users}) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector("#sidebar").innerHTML = html
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
console.log(username)

socket.emit("join", { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = "/"
    }
})