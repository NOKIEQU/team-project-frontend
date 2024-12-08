'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const CardForAccount = () => {
    const cardList =[
        {
            src:"/account/profilepic.png",
            title:'My Profile',
            description:'Click to veiw.',
            link: '/realprofile'
        },
        {
            src: "/account/payments.jpg",
            title:'My Payments',
            description:'You have not made any purchases.',
        },
        {
            src: "/account/costumer.png",
            title:'Customer Service',
            description:'Our Customer Service team is here for you! If you have questions or need assistance fill our contact us form .',
        },
        {
            src: "/account/orders.png",
            title:'My Orders',
            description:' You have not made any purchases yet, order now.',
        },
         {
            src: "/account/security.png",
            title:'My Security',
            description:' Your security is our top priority. We use advanced measures to keep your personal information and transactions safe and protected at all time.',
        },
        {
          
            src: "/account/security.jpg",
            title:'Our Policy',
            description:'Our policy is to make your gaming shopping experience as seamless as possible.',
            link: '/about'
        }

    ]
    return(
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"> 
      { cardList.map((card,id)=>{
        const [isOpen, setIsOpen] = useState(false);
        
        const CardContent = (
          <>
            <img src={card.src} alt="card-images" className="w-[75px] mb-4"/>
            <p 
              className="text-[20px] font-bold uppercase mb-7 hover:text-gray-600 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
              }}
            >
                {card.title}
            </p> 
            {isOpen && (
              <p className="text-[15px] font-medium leading-2 w-full transition-all duration-300">
                  {card.description}
              </p> 
            )}
          </>
        );

        return (
          <div key={id} className="contents">
            {card.link ? (
              <Link href={card.link}
                className="flex flex-col cursor-pointer bg-[#1b263b]  text-white justify-center py-6 px-10 text-center 
                items-center mt-12 rounded-tl-[35px] rounded-br-[35px] shadow-2xl
                transition-transform duration-300 hover:-translate-y-2 hover:shadow-3xl"
              >
                {CardContent}
              </Link>
            ) : (
              <div className="flex flex-col cursor-pointer bg-[#1b263b] justify-center text-white py-6 px-10 text-center 
                items-center mt-12 rounded-tl-[35px] rounded-br-[35px] shadow-2xl
                transition-transform duration-300 hover:-translate-y-2 hover:shadow-3xl"
              >
                {CardContent}
              </div>
            )}
          </div>
        );
      })}
      </div>
    )
}
export default CardForAccount