import React from 'react'

function ProfilePage() {
  return (
    <div>
      <h1 className='w-full flex justify-center py-4'>GameVault</h1>
      <div className="flex justify-around bg-yellow-500 text-gray-900 text-sm py-2">
        <div className='border-b-4 border-gray-900'>1. Basket</div>
        <div>2. Delivery</div>
        <div>3. Payment</div>
      </div>
      <div className='p-4'>
        <table className='border-b border-gray-700 w-full'>
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

    <div className='flex justify-between p-4'>
      <button className='bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-2 px-4 rounded '>
      Contine Shopping
      </button>
      <button className='bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-2 px-4 rounded '>
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
export default ProfilePage 