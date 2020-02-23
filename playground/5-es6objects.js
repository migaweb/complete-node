// Object property shorthand
const name = "Micke"
const userAge = 46

const user = {
    name,
    age: userAge,
    location: "Malmö"
}

console.log(user)

// Object destructuring
const product = {
    label: "Apple",
    price: 12,
    stock: 10,
    salePrice: undefined
}

// const label = produt.label
// const stock = product.stock

// const {label:productLabel, stock, rating = 5} = product

// console.log(rating)
// console.log(productLabel)

const transaction = (type, { label = "lab", stock = 0 } = {}) => {
    console.log(label + " " + stock)
}

transaction("order", product)
transaction("order", undefined)