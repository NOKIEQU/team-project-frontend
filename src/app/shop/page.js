import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'

function ShopPage() {
    return ( 
        <div>
        <Navbar/>
        <div className='flex flex-row w-full h-full gap-x-4'>
            <div className='flex flex-col w-1/4 h-full p-10 bg-gray-300 gap-y-10'>
                <div>
                    <h2 className='text-xl font-bold mb-4'>Sort By</h2>
                    <select className='p-2 border rounded w-full'>
                        <option value='price-low-high'>Price: Low to High</option>
                        <option value='price-high-low'>Price: High to Low</option>
                        <option value='date-release'>Date of Release</option>
                    </select>
                </div>
                <div>
                    <h2 className='text-xl font-bold mb-4'>Categories</h2>
                    <ul>
                        <div className='flex flex-row items-baseline gap-x-2'>
                            <input type='checkbox' className='mr-2' />
                            <li className='mb-2'>Horror</li>
                        </div>
                        <div className='flex flex-row items-baseline gap-x-2'>
                            <input type='checkbox' className='mr-2' />
                            <li className='mb-2'>RPG</li>
                        </div>
                        <div className='flex flex-row items-baseline gap-x-2'>
                            <input type='checkbox' className='mr-2' />
                            <li className='mb-2'>Category 3</li>
                        </div>
                        <div className='flex flex-row items-baseline gap-x-2'>
                            <input type='checkbox' className='mr-2' />
                            <li className='mb-2'>Category 4</li>
                        </div>
                    </ul>
                </div>
                <div>
                    <h2 className='text-xl font-bold mb-4'>Price</h2>
                    <div className='flex flex-row items-baseline gap-x-2 w-full'>
                        <input type='number' placeholder='Min Price' className='p-2 border rounded w-full' /> -
                        <input type='number' placeholder='Max Price' className='p-2 border rounded w-full' />
                    </div>
                </div>

            </div>
            <div className='flex flex-row flex-wrap w-full h-full p-10 gap-2'>
                <ShopItem name='Game 1' desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' img='https://dummyimage.com/400x200/000/fff.png' price='$10' />
                <ShopItem name='Game 1' desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' img='https://dummyimage.com/400x200/000/fff.png' price='$10' />
                <ShopItem name='Game 1' desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' img='https://dummyimage.com/400x200/000/fff.png' price='$10' />
                <ShopItem name='Game 1' desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' img='https://dummyimage.com/400x200/000/fff.png' price='$10' />
                <ShopItem name='Game 1' desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' img='https://dummyimage.com/400x200/000/fff.png' price='$10' />
                <ShopItem name='Game 1' desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' img='https://dummyimage.com/400x200/000/fff.png' price='$10' />

            </div>
        </div>
        <Footer></Footer>
        </div>
    )
}


function ShopItem({ name, desc, img, price }) {
    return (
        <div className='flex flex-col justify-between w-[400px] h-[450px] bg-slate-300 p-5 gap-y-2'>
            <img src={img} alt={name} />
            <h1 className='text-4xl font-bold'>{name}</h1>
            <p>{desc}</p>
            <p className='text-4xl'>{price}</p>
        </div>
    )
}
export default ShopPage 