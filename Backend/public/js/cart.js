//assigning our btn by dom
const payBtn = document.querySelector(".checkout-btn");
payBtn.addEventListener("click",()=>{
    const cart = JSON.parse(localStorage.getItem('cart')) || []
if (cart.length === 0) {
    alert('Your cart is empty')
    return
}
fetch("/request",{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify({cart:cart}),
})
.then((res)=>res.json())
.then((data)=>{
    if(data.success){
        localStorage.removeItem('cart')//clear my cart page

        window.location.href='/success'
        
        alert('Order Placed')
    }else{
      alert('Error saving cart items: ' + data.message)
    }
})
.catch((error)=>console.log(error))
})