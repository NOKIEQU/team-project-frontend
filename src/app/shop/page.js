"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Check, ChevronLeft, ChevronRight, Minus, Plus, Filter } from 'lucide-react'
import { useCart } from '../../context/cart-context'
import { useSearchParams } from 'next/navigation'
// import Navbar from '../components/navbar'

function ShopPage() {
  const [games, setGames] = useState([])
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const searchParams = useSearchParams()
  const initialGenre = searchParams.get('genre')
  const [selectedGenres, setSelectedGenres] = useState(initialGenre ? [initialGenre] : [])
  const [minPriceRange, setMinPriceRange] = useState(0)
  const [maxPriceRange, setMaxPriceRange] = useState(1000)
  const [minRating, setMinRating] = useState(0)
  const [selectedYears, setSelectedYears] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const { cart, addToCart, updateQuantity } = useCart()

  const itemsPerPage = 6

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresResponse, productsResponse] = await Promise.all([
          fetch('http://51.77.110.253:3001/api/genres'),
          fetch('http://51.77.110.253:3001/api/products')
        ])

        if (!genresResponse.ok || !productsResponse.ok) {
          throw new Error('Failed to fetch data')
        }

        const genresData = await genresResponse.json()
        const productsData = await productsResponse.json()

        setGenres(genresData)
        setGames(productsData)
        setLoading(false)
      } catch (error) {
        setError('An error occurred while fetching data')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredGames = games.filter(game =>
    (selectedGenres.length === 0 || selectedGenres.includes(game.genre.name)) &&
    parseFloat(game.price) >= minPriceRange && parseFloat(game.price) <= maxPriceRange &&
    parseInt(game.rating) >= minRating &&
    (selectedYears.length === 0 || selectedYears.includes(game.releaseYear))
  )

  const totalPages = Math.ceil(filteredGames.length / itemsPerPage)
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleGenreChange = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
    setCurrentPage(1)
  }

  const handleAddToCart = (game) => {
    addToCart({
      id: game.id,
      title: game.title,
      price: parseFloat(game.price),
      quantity: 1
    })

    console.log(`${game.title} has been added to your cart.`)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <div className="flex flex-row w-full min-h-screen gap-x-4 px-24 bg-gray-800 pt-10 ">
        <aside className="lg:col-span-1 hidden lg:block">
          <FilterContent
            genres={genres}
            games={games}
            selectedGenres={selectedGenres}
            minPriceRange={minPriceRange}
            maxPriceRange={maxPriceRange}
            setMinPriceRange={setMinPriceRange}
            setMaxPriceRange={setMaxPriceRange}
            minRating={minRating}
            setMinRating={setMinRating}
            selectedYears={selectedYears}
            setSelectedYears={setSelectedYears}
            setCurrentPage={setCurrentPage}
            handleGenreChange={handleGenreChange}
          />
        </aside>
        <main>
          <div className="grid grid-cols-1 sm:grid-cols-3  xl:grid-cols-3  gap-6 ">
            {paginatedGames.map(game => {
              const cartItem = cart.find(item => item.id === game.id)
              return (
                <div key={game.id} className="flex font-bold bg-white p-5  rounded-xl flex-col justify-between">
                  <Link href={`/shop/${game.id}`} className="flex-grow">
                    <div>
                      <Image
                        // src={game.imageUrls[0] || "https://fakeimg.pl/440x320/282828/eae0d0/?retina=1"}
                        src={"https://fakeimg.pl/440x320/282828/eae0d0/?retina=1"}
                        alt={game.title}
                        className="w-full h-48 object-cover"
                        width={440} 
                        height={320}
                      />
                      <div>
                        <div className="flex justify-between items-start">
                          <span className=" text-lg">{game.title}</span>
                          <div variant="secondary">{game.releaseYear}</div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm foreground mb-2">{game.genre.name}</p>
                        <div className="flex items-center space-x-1 text-yellow-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i}>
                              {i < Math.floor(game.rating) ? "★" : "☆"}
                            </span>
                          ))}
                          <span className="text-sm  ml-1">({game.rating})</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="flex justify-between items-center">
                    <span className="text-lg  font-bold">${parseFloat(game.price).toFixed(2)}</span>
                    {cartItem ? (
                      <div className="flex items-center">
                        <div
                          className='flex items-center space-x-1 bg-black text-white p-2 rounded-lg'
                          onClick={() => updateQuantity(game.id, cartItem.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </div>
                        <span className="mx-2">{cartItem.quantity}</span>
                        <div
                          className='flex items-center space-x-1 bg-black text-white p-2 rounded-lg'
                          onClick={() => updateQuantity(game.id, cartItem.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </div>
                      </div>
                    ) : (
                      <button
                        className='flex items-center space-x-1 bg-black text-white p-2 rounded-lg'
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(game);
                        }}
                      >
                        <ShoppingCart size={20} />
                        <span>Add to Cart</span>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                className=' bg-black text-white p-2 rounded-lg'
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className='bg-black text-white p-2 rounded-lg'
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const FilterContent = ({ genres, games, selectedGenres, minPriceRange, maxPriceRange, setMinPriceRange, setMaxPriceRange, minRating, setMinRating, selectedYears, setSelectedYears, setCurrentPage, handleGenreChange }) => (
  <div className="h-[calc(100vh-100px)] p-4  bg-[#FFA800] p-5  ">
    <div className="space-y-6">
      <div>
        <h3 className="font-medium  mb-2">Genres</h3>
        {genres.map(genre => (
          <div key={genre.id} className="flex items-center space-x-2 mb-2">
            <input
              type='checkbox'
              id={genre.id}
              checked={selectedGenres.includes(genre.name)}
              onChange={() => handleGenreChange(genre.name)}
            />
            <label htmlFor={genre.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {genre.name}
            </label>
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <input
          type='number'
          value={minPriceRange}
          onChange={(e) => {
            setMinPriceRange(e.target.value)
            setCurrentPage(1)
          }}
          className="mb-2"
        />
        <input
          type='number'
          value={maxPriceRange}
          onChange={(e) => {
            setMaxPriceRange(e.target.value)
            setCurrentPage(1)
          }}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${minPriceRange}</span>
          <span>${maxPriceRange}</span>
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">Minimum Rating</h3>
        <input
          type='range'
          min={0}
          max={5}
          step={0.1}
          value={minRating}
          onChange={(e) => {
            setMinRating(e.target.value)
            setCurrentPage(1)
          }}
          className="mb-2"
        />
        <div className="text-sm text-muted-foreground">{minRating} / 5</div>
      </div>
      <div>
        <h3 className="font-medium mb-2">Release Year</h3>
        {Array.from(new Set(games.map(game => game.releaseYear))).sort().map(year => (
          <div key={year} className="flex items-center space-x-2 mb-2">
            <input
              type='checkbox'
              id={`year-${year}`}
              checked={selectedYears.includes(year)}
              onChange={() => {
                setSelectedYears(prev =>
                  prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
                )
                setCurrentPage(1)
              }}
            />
            <label htmlFor={`year-${year}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {year}
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default ShopPage;

