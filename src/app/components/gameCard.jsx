import React from 'react'
import Image from 'next/image'

function GameCard(props) {
  return (
    <div className='flex flex-col bg-gray-800 text-white rounded-lg shadow-xl w-80 h-auto pb-10 transition-transform hover:scale-110'>
<<<<<<< HEAD
   <Image src={props.image} alt={props.title} className="w-80 rounded-lg"/>
    <h1>{props.title}</h1>
    <p>{props.price}</p>
=======
      <Image src={props.image} alt={props.title} width={320} height={200} className="w-80 rounded-lg" />
      <h1>{props.title}</h1>
      <p>{props.price}</p>
>>>>>>> 8c37b0256801602d902db579fdfaeb5f9e50764e
      <p>{props.description}</p>
      
    </div>
  )
}

export default GameCard