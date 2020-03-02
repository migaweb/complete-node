
const pet = {
    name: "How"
}

pet.toJSON = function()  {
    console.log(this)
    delete this.name
    return this
}

console.log(JSON.stringify(pet))