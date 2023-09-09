const tabs = document.querySelectorAll("[data-tab-target]")
const tabContents = document.querySelectorAll("[data-tab-content]")
const mainContainer = document.getElementById("mainContainer")
const contactForm = document.querySelector(".contact")
const closeContact = document.querySelectorAll(".closeContact")
const signUpForm = document.querySelector(".sign-up-form")
const logInForm = document.querySelector(".log-in-form")
const connect = document.getElementById("connect")
const cart = document.querySelector(".cart")
const emptyCart = document.getElementById("empty-cart")
const addToCartParents = document.querySelectorAll(".price-container")
const totalPrice = document.getElementById("totalPrice")
const nonEmptyCart = document.getElementById("non-empty-cart")
let currentPrice = 0
let index = 0;

products = [
    {
        img : "images/best selling products 1.png",
        description : "Regular Fit Long Sleeve Top",
        price : 38.99,
        alreadyAddedToCart : false,
        id : "p1"
    }, 

    {
        img : "images/best selling products 2.png",
        description : "Black Crop Tailored Jacket",
        price : 62.99,
        alreadyAddedToCart : false,
        id : "p2"
    },

    {
        img : "images/best selling products 3.png",
        description : "Textured Sunset Shirt",
        price : 49.99,
        alreadyAddedToCart : false,
        id : "p3"
    },

    {
        img : "images/hot products 1.png",
        description : "Spread Collar Shirt",
        price : 48.99,
        alreadyAddedToCart : false,
        id : "p4"
    },
    {
        img : "images/hot products 2.png",
        description : "White Solid Formal Shirt",
        price : 39.00,
        alreadyAddedToCart : false,
        id : "p5"
    },
    {
        img : "images/hot products 3.png",
        description : "White Solid Formal Shirt",
        price : 42.99,
        alreadyAddedToCart : false,
        id : "p6"
    },
    {
        img : "images/hot products 4.png",
        description : "White Solid Formal Shirt",
        price : 32.99,
        alreadyAddedToCart : false,
        id : "p7"
    },
    {
        img : "images/hot products 5.png",
        description : "White Solid Formal Shirt",
        price : 39.99,
        alreadyAddedToCart : false,
        id : "p8"
    },
    {
        img : "images/hot products 6.png",
        description : "White Solid Formal Shirt",
        price : 39.95,
        alreadyAddedToCart : false,
        id : "p9"
    },
    {
        img : "images/hot products 7.png",
        description : "White Solid Formal Shirt",
        price : 46.00,
        alreadyAddedToCart : false,
        id : "p10"
    },
    {
        img : "images/hot products 8.png",
        description : "White Solid Formal Shirt",
        price : 46.00,
        alreadyAddedToCart : false,
        id : "p11"
    },

]




tabs.forEach(tab => {

    tab.addEventListener("click", () => {
        const target = document.querySelector("#" + [tab.dataset.tabTarget])
        tabContents.forEach(tab => {
            tab.classList.remove("active")
        })
        
        target.classList.add("active")
    })

})

function contact() {
    mainContainer.classList.add("contactActive")
    contactForm.style.display = "flex"

}

closeContact.forEach(closeButton => {
    closeButton.addEventListener("click", () => {
        const classListMainContainer = mainContainer.classList
        cart.classList.add("cart-inactive")
        if (Array.from(classListMainContainer).includes("contactActive")) {
            mainContainer.classList.remove("contactActive")
            contactForm.style.display = "none"
            connect.style.display = "none"
            logInForm.classList.add("loginhidden")
            signUpForm.classList.add("signupshown")
    
        }
    })
    
})

function logIn() {
    logInForm.classList.remove("loginhidden")
    signUpForm.classList.remove("signupshown")
}

function logInSignUp() {
    mainContainer.classList.add("contactActive")
    connect.style.setProperty("display", "flex", "important")
}

function shop() {
    document.querySelector(".our-products").scrollIntoView({behavior:"smooth"})
    cart.classList.add("cart-inactive")
}

function features() {
    document.querySelector(".designer").scrollIntoView({behavior:"smooth"})
}

function explore() {
    document.querySelector(".introduction-text").scrollIntoView({behavior:"smooth"})
}

function bestSellingSeeAll() {
    window.alert("I don't have more images to put")
}

function shoppingBag() {
    document.querySelector(".cart").classList.remove("cart-inactive")
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}




addToCartParents.forEach(parent => {
    const button = parent.querySelector("button")
    button.setAttribute("data-add-item-to-cart", index)
    index += 1
    button.addEventListener("click", () => {
        const target = products[[button.dataset.addItemToCart]]
        emptyCart.style.display = "none"
        nonEmptyCart.style.display = "grid"
        if (!target.alreadyAddedToCart) {
            addItemToCart(target)
            currentPrice += target.price
            totalPrice.innerHTML = currentPrice.toFixed(2)
            target.alreadyAddedToCart = true
            document.querySelector(".landing-page").scrollIntoView({behavior:"smooth"})
            document.getElementById("shopping-bag").click()
        }

    })
})


function findIndex(objects, string) {
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].hasOwnProperty("id") && objects[i].id === string) {
        return i;
      }

  }
}
  

function addItemToCart(item) {
    const newGoods = document.createElement("div")
    const img = document.createElement("img")
    const price = document.createElement("div")
    const trash = document.createElement("img")
    const lastNode = document.querySelector(".cart-goods")
    trash.setAttribute("src", "images/icons8-trash.svg")
    newGoods.setAttribute("class", "cart-goods")
    newGoods.classList.add("cartContent")
    img.setAttribute("src", item.img)
    img.setAttribute("class", "img-cart")
    price.innerHTML = "$" + item.price 
    price.setAttribute("class", "cart-goods-description")
    newGoods.setAttribute("id", item.id)
    trash.setAttribute("data-trash-pointer", item.id)
    trash.addEventListener("click", () => {
        document.getElementById(trash.dataset.trashPointer).style.display = "none"
        currentPrice -= products[findIndex(products, trash.dataset.trashPointer)].price
        totalPrice.innerHTML = currentPrice.toFixed(2)
        if (currentPrice < 1) {
            emptyCart.style.display = "block"
            nonEmptyCart.style.display = "none"
        }
    })

    newGoods.appendChild(img)
    newGoods.appendChild(price)
    newGoods.appendChild(trash)
    insertAfter(lastNode, newGoods)
    item.alreadyAddedToCart = true

}

function mailTo() {
    const emailInput = document.getElementById("emailInput")
    const mailbutton = document.getElementById("mailTo")
    const emailAdress = emailInput.value
    mailbutton.setAttribute("href", "mailto:" + emailAdress)
}
