const orders = document.getElementById("my-order")

fetch("/cart-items")
   .then(response=>response.json())
   .then(data=>{
    if (data.success) {
        const cartItems = data.data; //get cart items
        displayCartData(cartItems); //displaying our items in html
    }else{
        console.error('Error fetching cart items: ' ,data.message)
    }
   })
   .catch(error=>{
    console.error('Error:',error);
   })
   
   function displayCartData(items){
    const ordersList = orders;
    if (items.length === 0) {
        ordersList.innerHTML = '<p>No item in the cart</p>'
        return;
    }
    items.forEach(cart => {
       const cartList = cart.items.map(item=> `
         <div class="cart-item">
         <img src="${item.image}" alt="${item.name}">
         <p class="cart-items-title">Product: ${item.name}</p>
         <p class="cart-item-price">Price: $${item.price}</p>
           <p>Quantity: ${item.quantity}</p>
         </div>
        `).join('') ;
        ordersList.innerHTML +=`<div>Cart from ${new Date(cart.date).toLocaleString()}<h3>${cartList}</h3></div>`
    });
   }