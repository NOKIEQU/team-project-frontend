import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function GameCard(props) {
  return (
    <div className="flex flex-col bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-2xl transition-transform hover:scale-110 w-80 h-auto pb-6">
    <Image
      src={props.image}
      alt={props.title}
      width={320}
      height={200}
      className="w-80 rounded-t-lg card-image"
    />
    <div className="p-4 text-left">
      <h1 className="text-xl font-bold ">{props.title}</h1>
      <p className="text-lg text-gray-400  mt-2">{props.price}</p>
      <p className="text-sm text-gray-300  mt-2">{props.description}</p>
      <Link href={"/shop"}>
      <button className="mt-4 bg-[#F0ECEC] text-black font-semibold py-2 px-4 rounded-lg transition-transform hover:scale-105 hover:bg-[#fa9a00ef] w-full">
        View Details
      </button>
      </Link>
    </div>
  </div>
  )
}

export default GameCard