"use client";
import React from 'react'
import Link from 'next/link'
import Navbar from '../components/navbar'
import { useCart } from '../../context/cart-context'
import { Menu, Moon, Sun, X, ShoppingCart, Trash2, Minus, Plus } from 'lucide-react'

function BasketPage() {

  const {  cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()

  return (
    <div className="bg-[#0d1b2a]">
    <Navbar isLoggedIn={"True"}></Navbar>
      <h1 className='w-full flex justify-center py-4 text-white font-black text-lg'>GameVault</h1>
      
      <div className="flex justify-around text-black text-base py-3 bg-[#FFA800]">
        <div className='font-black text-lg'> Basket</div>
        
      </div>
      <div className='p-4 px-52'>
         
          <div className="flex justify-between items-center py-3 border-b-2 border-gray-300 mb-4">
              <div className="flex-1">
                  <span className="font-semibold text-lg text-white">Product</span>
              </div>
              <div className="flex items-center space-x-8">
                  <div className="min-w-[140px] text-center">
                      <span className="font-semibold text-lg text-white">Quantity</span>
                  </div>
                  <div className="min-w-[100px] text-right text-white">
                      <span className="font-semibold text-lg">Price</span>
                  </div>
                  <div className="w-8"></div> 
              </div>
          </div>

          
          {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-200">
                    <div className="flex items-center flex-1">
                        <div className="shop-image-container">
                            <ShopImage name={item.title} img={item.img} />
                        </div>
                        <span className='pl-3 text-sm font-medium text-white'>{item.title}</span>
                    </div>
                    <div className="flex items-center space-x-8">
                        <div className="quantity-container flex items-center bg-gray-100 rounded-lg px-2 py-1">
                            <button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0 hover:bg-gray-200 rounded-full"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="mx-4 font-medium">{item.quantity}</span>
                            <button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0 hover:bg-gray-200 rounded-full"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="price-container min-w-[100px] text-right">
                            <span className="font-semibold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="h-8 w-8 p-0 hover:bg-[#fa9a00ef] rounded-full"
                        >
                            <Trash2 className="h-4 w-4 text-[#f6a302]" />
                        </button>
                    </div>
                </div>
            ))}
            
        <div className="mt-8 border-t border-gray-200 pt-4">
            <h1 className="text-xl font-semibold text-right text-white">
                Grand Total: £{getCartTotal() === 0 ? "0" : getCartTotal().toFixed(2)}
            </h1>
        </div>
      </div>
      
    <div className='flex justify-between p-4 px-52 text-base'>
        <Link href={"/shop"}>
            <button className='hover:bg-yellow-500 transition-colors text-black font-semibold py-2 px-6 rounded' 
                    style={{backgroundColor:"#FFA800"}}>
                Continue Shopping
            </button>
        </Link>
        <Link href={"/checkout"}>
            <button className='hover:bg-yellow-500 transition-colors text-black font-semibold py-2 px-6 rounded' 
                    style={{backgroundColor:"#FFA800"}}>
                Proceed to Checkout
            </button>
        </Link>
    </div>
    </div>
  )
}


function ShopImage({ name, img }) {
  console.log('Image URL:', img);
  return (
      <div className='flex items-center py-3'>
          <img src={img} alt={name} className='w-[100px] h-[100px] mr-2'/>
      </div>
  )
}
export default BasketPage 