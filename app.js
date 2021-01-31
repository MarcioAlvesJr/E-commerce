let cart = []
    newCartTotal = 0


class CartItem{
    constructor(img, name, value, quantity){
        this.img = img
        this.name = name
        this.value = value
        this.quantity = quantity
    }
}

//UI DOM VARIABLES
let inputValue = undefined

const 
    DOM_items = document.querySelectorAll(".items li")
    DOM_mainDivs = document.querySelectorAll(".initial, .selected, .shopping-cart,div.checkout")
    DOM_backBtn = document.querySelector(".back.btn")  

    DOM_addToCart = document.querySelector('.white-round.side')
    DOM_inputQuantity = document.querySelector('input.side')
    DOM_cartBtn = document.querySelector("header button")


//Event Listeners
    DOM_backBtn.addEventListener('click', ()=>{
        DOM_backBtn.classList.add("hidden-space")
        goTo(0)

    })  
    DOM_inputQuantity.addEventListener('keyup', ()=>{
        fixInput(DOM_inputQuantity)
    })
    DOM_inputQuantity.addEventListener('input', ()=>{
        document.querySelector('.selected .value span').innerText =(Number(document.querySelector('.selected .value span').getAttribute("real-value")) *DOM_inputQuantity.value).toFixed(2)
        
        
    })

    DOM_cartBtn.addEventListener('click',()=>{
        cartToDom()
        goTo(2)
    })



//CLICK SHOW ITEM
DOM_items.forEach(item =>{
    item.addEventListener('click', ()=>{
        let realValue = document.createAttribute("real-value")

        realValue.value = Number(item.querySelector(".value span").innerText) 

        DOM_mainDivs[1].querySelector("img").src = item.querySelector("img").src

        DOM_mainDivs[1].querySelector(".title").innerText = item.querySelector(".title").innerText

        DOM_mainDivs[1].querySelector(".value span").innerText = item.querySelector(".value span").innerText

        DOM_mainDivs[1].querySelector(".value span").setAttributeNode(realValue)

        DOM_mainDivs[1].querySelector("input").value = 1

        DOM_backBtn.classList.remove("hidden-space")


        goTo(1)
    })
})

//CLICK ADD TO CART

DOM_addToCart.addEventListener('click', addToCart)

function checkCart(hide){
    newCartTotal = 0


    cart.forEach(item =>{
        newCartTotal = newCartTotal + item.value * item.quantity
    })

    DOM_cartBtn.querySelector("span").innerText = newCartTotal.toFixed(2)

    if(cart.length == 0){
        DOM_cartBtn.classList.add('hidden-space')
    }else{
        if(hide != true){
            DOM_cartBtn.classList.remove('hidden-space') 
        }

    }
}
checkCart()

function addToCart(){
    let ItemisNew = true
        

    const newItem = new CartItem(
        DOM_mainDivs[1].querySelector(".item img").src.split().toString(),
        DOM_mainDivs[1].querySelector(".item .title").innerText,
        Number(DOM_mainDivs[1].querySelector(".item .value span").getAttribute("real-value")),
        Number(DOM_mainDivs[1].querySelector(".item input").value) 
    )
    
    cart.forEach(item =>{
        if(item.img === newItem.img ){
            item.quantity = newItem.quantity
            ItemisNew = false
        }
    })

    if(ItemisNew){
        cart.push(newItem)
        
    }else{
        
    }

    checkCart()

}

function goTo(n){
    if(n == 2){
        DOM_backBtn.classList.remove("hidden-space")
        DOM_cartBtn.classList.add("hidden-space")
    }else{
        checkCart()
    }
    DOM_mainDivs.forEach(div =>{
        div.classList.add("hidden-none")
    })
    DOM_mainDivs[n].classList.remove("hidden-none") 
}
function fixInput(input){
    input.value = Math.round(input.value)

        if(input.value > parseInt(input.max)){
            input.value = input.max
        }
        if(input.value < parseInt(input.min)){
            input.value = input.min
        }
}

function cartToDom(){
    if(cart.length == 0){
        DOM_backBtn.classList.add("hidden-space")
        goTo(0)
    }
    else{
        const cartList = DOM_mainDivs[2].querySelector('ul')
        cartList.innerHTML = ""
        cart.forEach(item =>{
            cartList.appendChild(createLi(item))
        })
        document.querySelector(".shopping-cart p span").innerText = newCartTotal.toFixed(2)
    }

}

function createLi(item ){
    const li = document.createElement("li")

    li.innerHTML=`
    <img src="${item.img}" alt="">
    <h2 class="title">${item.name}</h2>
    <h2 class="value side">$ <span real-value="${item.value}">${(item.value*item.quantity).toFixed(2)}</span></h2>
    <input type="number" class="num-input" min="1" max="99" value="${item.quantity}" >
    <button class="delete">x</button>
    `

    li.querySelector("input").addEventListener('input', ()=>{
        fixInput(li.querySelector("input"))
    })
    li.querySelector("input").addEventListener('input', ()=>{
        li.querySelector('h2 span').innerText =
        (Number(li.querySelector('h2 span').getAttribute("real-value")) * li.querySelector("input").value).toFixed(2)

        updateCart()
    })
    li.querySelector(".delete").addEventListener('click', (e)=>{
        let newCart = []

        cart.forEach(item =>{
            if(item.img != e.path[1].querySelector("img").src){
                newCart.push(item)
            }
        })
        cart = newCart
        checkCart(true)
        cartToDom()
    })


    return li
}

function updateCart(){
    cart.forEach((item, idx) =>{
        item.quantity = Number(document.querySelectorAll(".shopping-cart ul li")[idx].querySelector('input').value)
    })
    checkCart(true)
    cartToDom()
}