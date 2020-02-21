// const square = function(x) {
//     return x * x;
// }

// const square = (x) => {
//     return x * x;
// }

// const square = (x) => x * x

// console.log(square(44))

// Arrow functions don't bind their own this

const event = {
    name: "Birthday party",
    guestList: ['Mike', 'Jenny', 'Jennifer'],
    printGuestList() {
        console.log("Guest list for: " + this.name)
        this.guestList.forEach((item) => {
            console.log(item + " is attending " + this.name)
        })
    }
}

event.printGuestList()