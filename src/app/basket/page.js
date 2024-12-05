"use client";
import React from 'react'
import Link from 'next/link'
import Navbar from '../components/navbar'
import { useCart } from '../../context/cart-context'
import { Menu, Moon, Sun, X, ShoppingCart, Trash2, Minus, Plus } from 'lucide-react'

function BasketPage() {

  const {  cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()

  return (
    <div>
    <Navbar isLoggedIn={"True"}></Navbar>
      <h1 className='w-full flex justify-center py-4 text-white font-black text-lg'>GameVault</h1>
      
      <div className="flex justify-around text-black text-base py-3 bg-[#FFA800]">
        <div className='font-black'>1. Basket</div>
        <div>2. Delivery</div>
        <div>3. Payment</div>
      </div>
      <div className='p-4 px-52'>
          {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3">
                    <span className='pl-3 text-sm'>{item.title}</span>
                    <div className="flex items-center">
                        <button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                        <span className="ml-2">${(item.price * item.quantity).toFixed(2)}</span>
                        <button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="h-8 w-8 p-0 ml-2"
                        >
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                    </div>

                </div>
            ))}
            
        <h1>Grand Total: £{getCartTotal() === 0 ? "0" : getCartTotal().toString()}</h1>

      </div>
      
    <div className='flex justify-between p-4 px-52 text-base '>
    <Link href={"/shop"}>
      <button className=' hover:bg-yellow-100 text-black font-semibold py-2 px-4 rounded ' style={{backgroundColor:"#FFA800"}}>
      Contine Shopping
      </button>
      </Link>
      <button className=' hover:bg-yellow-100 text-black font-semibold py-2 px-4 rounded ' style={{backgroundColor:"#FFA800"}}>

      Proceed to Checkout
      </button>
    </div>
    </div>
  )
}


function ShopImage({ name, img }) {
  return (
      <div className='flex items-center py-3 '>
          <img src={img} alt={name} className='w-[100px] h-[100px] mr-2'/>
          <span>{name}</span>
      </div>
  )
}
export default BasketPage 