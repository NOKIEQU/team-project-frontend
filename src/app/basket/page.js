import React from 'react'
import Link from 'next/link'
import Navbar from '../components/navbar'

function BasketPage() {
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
        <table className='border-b border-gray-700 w-full text-white'>

          <thead >
            <tr>
              <th className='py-2 w-1/4 text-left'>Items</th>
              <th className='py-2 text-right'>Price</th>
              <th className='py-2 text-center'>Quantity</th>
              <th className='py-2 text-right'>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='py-2 w-1/4 text-left'>
              <ShopImage name='Fusion game hard comanpy gamess' img='https://dummyimage.com/100x100/000/fff.png'  />
              </td>
              <td className="py-2 text-right">£100.00</td>
              <td className="py-2 text-center">1</td>
              <td className="py-2 text-right">£100.00</td>
            </tr>
            <tr>
              <td className='py-2 w-1/4 text-left'>
              <ShopImage name='Fusion game hard comanpy gamess' img='https://dummyimage.com/100x100/000/fff.png'  />
              </td>
              <td className="py-2 text-right">£100.00</td>
              <td className="py-2 text-center">1</td>
              <td className="py-2 text-right">£100.00</td>
            </tr>
          </tbody>
        </table>
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