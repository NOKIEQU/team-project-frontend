'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { 
    UserCircle, 
    CreditCard, 
    HeadphonesIcon, 
    ShoppingBag, 
    Shield, 
    ScrollText,
    ChevronDown,
    ChevronUp
} from 'lucide-react'

const CardForAccount = () => {
    const cardList = [
        {
            src: "/account/profilepic.png",
            title: 'My Profile',
            description: 'Click to view.',
            link: '/realprofile',
            icon: UserCircle
        },
        // {
        //     src: "/account/payments.jpg",
        //     title: 'My Payments',
        //     description: 'You have not made any purchases.',
        //     icon: CreditCard
        // },
        // {
        //     src: "/account/costumer.png",
        //     title: 'Customer Service',
        //     description: 'Our Customer Service team is here for you! If you have questions or need assistance fill our contact us form.',
        //     icon: HeadphonesIcon
        // },
        {
            src: "/account/orders.png",
            title: 'My Orders',
            description: 'You have not made any purchases yet, order now.',
            link: '/orderhistory',
            icon: ShoppingBag
        },
        //  {
        //     src: "/account/security.png",
        //     title: 'My Security',
        //     description: 'Your security is our top priority. We use advanced measures to keep your personal information and transactions safe and protected at all time.',
        //     icon: Shield
        // },
        {
            src: "/account/security.jpg",
            title: 'Our Policy',
            description: 'Our policy is to make your gaming shopping experience as seamless as possible.',
            link: '/about',
            icon: ScrollText
        }

    ]

    return (
        <>
            <div className="bg-[#F0ECEC] rounded-2xl shadow-2xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-center mb-8 text-[#1A1A22]">My Points</h2>
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="flex justify-between items-center p-6 bg-white rounded-xl shadow-md flex-1">
                        <span className="font-medium text-[#1A1A22]">Current Points</span>
                        <span className="text-2xl font-bold text-[#1A1A22]">0</span>
                    </div>
                    <div className="flex justify-between items-center p-6 bg-white rounded-xl shadow-md flex-1">
                        <span className="font-medium text-[#1A1A22]">Level</span>
                        <span className="text-2xl font-bold text-[#1A1A22]">Gold</span>
                    </div>
                    <div className="flex justify-between items-center p-6 bg-white rounded-xl shadow-md flex-1">
                        <span className="font-medium text-[#1A1A22]">Points to Next Level</span>
                        <span className="text-2xl font-bold text-[#1A1A22]">50</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cardList.map((card, id) => {
                    const [isHovered, setIsHovered] = useState(false);
                    const [isExpanded, setIsExpanded] = useState(false);
                    const Icon = card.icon;

                    const CardContent = () => (
                        <div className="relative h-full">
                            {/* Card Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative">
                                    <div className={`absolute inset-0 bg-[#FFA800]/20 rounded-full blur-md transition-opacity duration-300 
                                        ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
                                    <div className="w-12 h-12 bg-[#1A1A22] rounded-full flex items-center justify-center relative">
                                        <Icon 
                                            className={`w-6 h-6 transition-colors duration-300 text-[#ffffff]
                                            `}
                                        />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-[#1A1A22]">
                                    {card.title}
                                </h3>
                            </div>

                            {/* Card Description */}
                            <div className={`transition-all duration-300 ease-in-out relative
                                ${isExpanded ? '' : 'line-clamp-2'}`}>
                                <p className="text-[#1A1A22]/70 leading-relaxed">
                                    {card.description}
                                </p>
                            </div>

                            
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsExpanded(!isExpanded);
                                }}
                                className={`absolute bottom-2 right-2 p-1.5 rounded-full bg-[#1A1A22] 
                                    hover:bg-[#1A1A22]/90 transition-all duration-300 group z-10
                                    ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                                aria-label={isExpanded ? "Show less" : "Show more"}
                            >
                                <ChevronDown className="w-4 h-4 text-[#F0ECEC] transition-transform group-hover:translate-y-0.5" />
                            </button>

                            <div className={`absolute inset-0 border-2 border-[#ffffff] rounded-2xl transition-all duration-500
                                ${isHovered ? 'opacity-20' : 'opacity-0'}`}></div>
                        </div>
                    );

                    const CardWrapper = card.link ? Link : 'div';
                    const wrapperProps = card.link ? { href: card.link } : {};

                    return (
                        <CardWrapper
                            key={id}
                            {...wrapperProps}
                            className={`relative group bg-[#F0ECEC] rounded-2xl p-6
                                shadow-lg transition-all duration-300 ease-in-out
                                hover:shadow-2xl hover:shadow-black/20
                                hover:-translate-y-1
                                ${isExpanded ? 'min-h-[200px]' : 'h-[160px]'}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <CardContent />
                        </CardWrapper>
                    );
                })}
            </div>
        </>
    )
}

export default CardForAccount

