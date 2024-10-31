import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';

//load variable

dotenv.config();
//starting the server

const app = express();
app.use(express.static("public"));
app.use(express.json());

//mongodb connection
mongoose.connect(process.env.MONGO_URI)
//mongo schema
const order = new mongoose.Schema({
    items:Array,
    date:{type:Date,default:Date.now()}
})
//model for the cart items
const Cart = mongoose.model('Cart',order);
//home
app.get("/",(req,res)=>{
    res.sendFile("index.html",{root:"public"});
})
//cart
app.get("/cart",(req,res)=>{
    res.sendFile("cart.html",{root:"public"});
})
app.get("/success",(req,res)=>{
    res.sendFile("success.html",{root:"public"});
})
app.get("/men",(req,res)=>{
    res.sendFile("men.html",{root:"public"});
})
app.get("/women",(req,res)=>{
    res.sendFile("women.html",{root:"public"});
})
app.get("/kid",(req,res)=>{
    res.sendFile("kid.html",{root:"public"});
})
app.get("/accessories",(req,res)=>{
    res.sendFile("accessories.html",{root:"public"});
})
//route to handle cart items request  

app.post("/request",async(req,res)=>{
    const {cart} = req.body;
    if (!cart || cart.length ===0) {
        return res.json({success:false,message:'No Item Added to the cart'})
    }
    //saving cart items in database
    const newCart = new Cart({items:cart});
    newCart.save()
    .then(()=>{
        res.json({success:true,message: 'Cart Saved'})

    })
    .catch(error=>{
     console.error('Error saving cart:',error);
     res.json({success:false,message: 'Error Saving cart'})
    })
})
app.get ('/cart-items',(req,res)=>{
    Cart.find()
        .then(cart=>{
            res.json({success:true,data:cart});
        })
        .catch(error=>{
            console.error('Error fetching cart items: ',error)
            res.json({success:false, message: 'Error fetching items'});
        })
})

app.listen(5000,()=>{
    console.log("Express server is running")
})
