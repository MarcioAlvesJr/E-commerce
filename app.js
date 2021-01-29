//UI DOM VARIABLES

const 
    DOM_items = document.querySelectorAll(".items li"),
    DOM_mainDivs = document.querySelectorAll(".initial, .selected, .shopping-cart,div.checkout"),
    DOM_backBtn = document.querySelector(".back.btn")
    
    DOM_backBtn.addEventListener('click', ()=>{
        DOM_backBtn.classList.add("hidden-space")
        goTo(0)

    })
    
    DOM_addToCart = document.querySelector('.white-round.side')




//CLICK SHOW ITEM
DOM_items.forEach(item =>{
    item.addEventListener('click', ()=>{
        DOM_mainDivs[1].querySelector("img").src = item.querySelector("img").src

        DOM_mainDivs[1].querySelector(".title").innerText = item.querySelector(".title").innerText

        DOM_mainDivs[1].querySelector(".value span").innerText = item.querySelector(".value span").innerText

        DOM_mainDivs[1].querySelector("input").value = 1

        DOM_backBtn.classList.remove("hidden-space")

        goTo(1)
    })
})

//CLICK ADD TO CART

DOM_addToCart.addEventListener('click', addToCart)

function addToCart(){
    console.log('add to cart')
}

function goTo(n){
    DOM_mainDivs.forEach(div =>{
        div.classList.add("hidden-none")
    })
    DOM_mainDivs[n].classList.remove("hidden-none") 
}
