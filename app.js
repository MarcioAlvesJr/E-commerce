let cart = []


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

function checkCart(){
    let newCartTotal = 0

    cart.forEach(item =>{
        newCartTotal = newCartTotal + item.value * item.quantity
    })

    DOM_cartBtn.querySelector("span").innerText = newCartTotal.toFixed(2)

    if(cart.length == 0){
        DOM_cartBtn.classList.add('hidden-space')
    }else{
        DOM_cartBtn.classList.remove('hidden-space') 
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
