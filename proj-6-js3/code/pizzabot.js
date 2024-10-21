const vegetarian = "Vegetarian Pizza",
 hawaiian = "Hawaiian Pizza",
 pepperoni = "Pepperoni Pizza",
 pizzaPrice = 80

//Put your Javscript code here:

// const checkOrderName = (orderName) => {
//     if(!orderName.toLowerCase().includes("vegetarian")
//     && !orderName.toLowerCase().includes("hawaiian") && 
//     !orderName.toLowerCase().includes("pepperoni")
//     )
//     {
//         return false
//     }
//     return true

// }

const calculateCookingTime = (orderQuantity) => {

    if(orderQuantity >= 1 && orderQuantity <= 2) {
        return 10
    } else if(orderQuantity >= 3 && orderQuantity <= 5) {
        return 15
    } else if(orderQuantity >= 6) {
        return 20
    }
}

const totalCost = (orderQuantity) => {
    return orderQuantity * pizzaPrice
}

document.getElementById("pizzaForm").addEventListener("submit", (e) => {
    e.preventDefault()

    const orderName = document.getElementById("pizzaName").value,
        orderQuantity = document.getElementById("pizzaQuantity").value

        // if(!checkOrderName(orderName)) {
        //     document.getElementById("orderOutput").innerText = "Sorry, we don't have that pizza on the menu"
        //     return
        // }

    const orderTotal = totalCost(orderQuantity),
        cookingTime = calculateCookingTime(orderQuantity)

        document.getElementById("orderOutput").innerText = `Great, I'll get started on your ${orderName} right away, it will cost ${orderTotal} kr. The pizzas will take ${cookingTime} minutes.`

        e.target.reset()
})

