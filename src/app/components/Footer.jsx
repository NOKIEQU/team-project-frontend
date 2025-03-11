import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Twitch, Linkedin } from 'lucide-react'

function Footer() {
    return (
        <footer className="bg-gray-950 text-white py-5">
            <div className="container mx-auto px-6">
                {/* Three Columns Layout */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-6">
                    {/* Quick Links */}
                    <div className="flex flex-col items-center md:items-start flex-1">
                        <h3 className="font-semibold text-base mb-3">Quick Links</h3>
                        <ul className="space-y-1">
                            <li><Link href="/" className="text-sm hover:underline">Home</Link></li>
                            <li><Link href="/shop" className="text-sm hover:underline">Shop</Link></li>
                            <li><Link href="/about" className="text-sm hover:underline">About Us</Link></li>
                            <li><Link href="/contact-us" className="text-sm hover:underline">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service (Centered) */}
                    <div className="flex flex-col items-center flex-1">
                        <h3 className="font-semibold text-base mb-3">Customer Service</h3>
                        <ul className="space-y-1">
                            <li className="text-sm"><a href="tel:+442345678900" className="hover:underline">+44 2345 678900</a></li>
                            <li><Link href="/privacy-policy" className="text-sm hover:underline">Privacy Policy</Link></li>
                            <li><Link href="/faq" className="text-sm hover:underline">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Connect With Us */}
                    <div className="flex flex-col items-center md:items-end flex-1">
                        <h3 className="font-semibold text-base mb-3">Connect With Us</h3>
                        <div className="flex gap-2 mb-2">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                        <div className="flex gap-2">
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                                <Youtube className="h-5 w-5" />
                            </a>
                            <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                                <Twitch className="h-5 w-5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright (Centered Below Customer Service) */}
                <div className="mt-4 pt-3 border-t border-gray-700 text-center text-xs text-gray-400">
                    <p>&copy; 2025 GameVault. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
