// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve([1,4,7])
//         // Promise returns after first call to resolve/reject
//         reject("This is my error")
//     }, 2000);
// })

// doWorkPromise.then((result) => {
//     console.log("Success!", result)
// }).catch((error) => {
//     console.log("Error: ", error)
// })

//
//                           fulfilled
//                          /
// Promise   -- pending -->
//                          \
//                           rejected
//

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000);
    })
} 

add(2, 3).then((sum) => {
    console.log(sum)
}).catch((e) => {
    console.log(e)
})

// Promis chaining
add(2,3).then((sum) => {
    console.log(sum)
    return add(sum, 2)
}).then((sum) => {
    console.log(sum)
}).catch((e) => {
    console.log(e)
})