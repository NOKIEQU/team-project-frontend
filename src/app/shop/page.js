import React from 'react';
<<<<<<< HEAD

function ShopPage() {
  return (
    <div className="flex flex-row w-full h-screen gap-x-4 bg-gray-800">
      <div className="flex flex-col w-1/4 h-full p-10 bg-[#FFA800] gap-y-10">
        
        {/* Sort By Dropdown */}
        <div>
          <h2 className="text-xl font-bold mb-4">Sort By</h2>
          <select className="p-2 border rounded w-full">
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="date-release">Date of Release</option>
          </select>
        </div>
        
        {/* Categories */}
        <div>
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul>
            <div className="flex flex-row items-baseline gap-x-2">
              <input type="checkbox" className="mr-2" />
              <li className="mb-2">Horror</li>
            </div>
            </ul>

        </div>

        {/* Age Category */}
        <div>
          <h2 className="text-xl font-bold mb-4">Age Category</h2>
          <div className="flex flex-row items-baseline gap-x-2">
            <input type="checkbox" className="mr-2" />
            <label>Under 12</label>
=======
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

function ShopPage() {
  return (
    <div>
      <Navbar isLoggedIn={"True"}/>
      <div className="flex flex-row w-full h-full gap-x-4">
        {/* Sidebar */}
        <div className="flex flex-col w-1/4 h-full p-10 bg-gray-300 gap-y-10">
          {/* Sort By */}
          <div>
            <h2 className="text-xl font-bold mb-4">Sort By</h2>
            <select className="p-2 border rounded w-full">
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="date-release">Date of Release</option>
            </select>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <ul>
              <div className="flex flex-row items-baseline gap-x-2">
                <input type="checkbox" className="mr-2" />
                <li className="mb-2">Horror</li>
              </div>
              <div className="flex flex-row items-baseline gap-x-2">
                <input type="checkbox" className="mr-2" />
                <li className="mb-2">RPG</li>
              </div>
              <div className="flex flex-row items-baseline gap-x-2">
                <input type="checkbox" className="mr-2" />
                <li className="mb-2">Category 3</li>
              </div>
              <div className="flex flex-row items-baseline gap-x-2">
                <input type="checkbox" className="mr-2" />
                <li className="mb-2">Category 4</li>
              </div>
            </ul>
          </div>

          {/* Price */}
          <div>
            <h2 className="text-xl font-bold mb-4">Price</h2>
            <div className="flex flex-row items-baseline gap-x-2 w-full">
              <input
                type="number"
                placeholder="Min Price"
                className="p-2 border rounded w-full"
              />{' '}
              -
              <input
                type="number"
                placeholder="Max Price"
                className="p-2 border rounded w-full"
              />
            </div>
>>>>>>> 815295a1cb8181babfac4c3409022c8577e6d1b8
          </div>

          {/* Age Category */}
          <div>
            <h2 className="text-xl font-bold mb-4">Age Category</h2>
            <div className="flex flex-row items-baseline gap-x-2">
              <input type="checkbox" className="mr-2" />
              <label>Under 12</label>
            </div>
            <div className="flex flex-row items-baseline gap-x-2">
              <input type="checkbox" className="mr-2" />
              <label>12-17</label>
            </div>
            <div className="flex flex-row items-baseline gap-x-2">
              <input type="checkbox" className="mr-2" />
              <label>18+</label>
            </div>
          </div>

          {/* Rating */}
          <div>
            <h2 className="text-xl font-bold mb-4">Rating</h2>
            <div className="flex flex-row items-baseline gap-x-2">
              <input type="radio" name="rating" className="mr-2" />
              <label>1 Star</label>
            </div>
            <div className="flex flex-row items-baseline gap-x-2">
              <input type="radio" name="rating" className="mr-2" />
              <label>2 Stars</label>
            </div>
            <div className="flex flex-row items-baseline gap-x-2">
              <input type="radio" name="rating" className="mr-2" />
              <label>3 Stars</label>
            </div>
            <div className="flex flex-row items-baseline gap-x-2">
              <input type="radio" name="rating" className="mr-2" />
              <label>4 Stars</label>
            </div>
            <div className="flex flex-row items-baseline gap-x-2">
              <input type="radio" name="rating" className="mr-2" />
              <label>5 Stars</label>
            </div>
          </div>
        </div>

        {/* Shop Items */}
        <div className="flex flex-row flex-wrap w-full h-full p-10 gap-2">
          <ShopItem
            name="Game 1"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            img="https://dummyimage.com/400x200/000/fff.png"
            price="$10"
          />
          <ShopItem
            name="Game 2"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            img="https://dummyimage.com/400x200/000/fff.png"
            price="$20"
          />
          <ShopItem
            name="Game 3"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            img="https://dummyimage.com/400x200/000/fff.png"
            price="$30"
          />
          <ShopItem
            name="Game 4"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            img="https://dummyimage.com/400x200/000/fff.png"
            price="$40"
          />
          <ShopItem
            name="Game 5"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            img="https://dummyimage.com/400x200/000/fff.png"
            price="$50"
          />
          <ShopItem
            name="Game 6"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            img="https://dummyimage.com/400x200/000/fff.png"
            price="$60"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ShopItem({ name, desc, img, price }) {
  return (
    <div className="flex flex-col justify-between w-[400px] h-[450px] bg-slate-300 p-5 gap-y-2">
      <img src={img} alt={name} />
      <h1 className="text-4xl font-bold">{name}</h1>
      <p>{desc}</p>
      <p className="text-4xl">{price}</p>
    </div>
  );
}

export default ShopPage;