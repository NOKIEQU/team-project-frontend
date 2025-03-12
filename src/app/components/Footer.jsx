import Link from 'next/link'

import { Facebook, Twitter, Instagram, Youtube, Twitch, Linkedin } from 'lucide-react'

function Footer() {
    return (

          <footer className="bg-gray-950 text-white">



            <div className="container mx-auto px-4 py-4"> {/* Adjusted padding */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Quick Links (Far Left) */}
                    <div className="flex flex-col items-start">

                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>

                        <ul className="space-y-2">
                            <li><Link href="/" className="text-sm hover:underline">Home</Link></li>
                            <li><Link href="/shop" className="text-sm hover:underline">Shop</Link></li>
                            <li><Link href="/about" className="text-sm hover:underline">About Us</Link></li>
                            <li><Link href="/contact-us" className="text-sm hover:underline">Contact</Link></li>
                        </ul>

                    </div>
                       {/* Legal */}
                    <div className="flex flex-col items-start">

                        <h3 className="font-semibold text-lg mb-4">Legal</h3>

                        <ul className="space-y-2">
                            <li><Link href="/ReturnsPolicy" className="text-sm hover:underline">Returns Policy</Link></li>

                            <li><Link href="/shop" className="text-sm hover:underline">Terms & Conditions</Link></li>

                           
                        </ul>

                    </div>


                    

                    {/* Customer Service (Middle) - Adjusted left alignment */}
                    <div className="flex flex-col items-start ml-4">
                        <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
                        <ul className="space-y-2">

                            <li className="text-sm"><a href="tel:+442345678900" className="hover:underline">+44 2345 678900</a></li>
                            <li className="text-sm"><a href="tel:+442345678900" className="hover:underline">GameVault@gmail.con</a></li>

                            <li><Link href="/privacy-policy" className="text-sm hover:underline">Privacy Policy</Link></li>

                            <li><Link href="/faq" className="text-sm hover:underline">FAQ</Link></li>

                        </ul>
                    </div>

                    
                    {/* Connect With Us (Aligned with Quick Links and Customer Service) */}
                    <div className="flex flex-col items-start mt-2">
                        <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>

                        <div className="flex gap-3 mb-4"> {/* Adjusted gap for better spacing */}

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
                        <div className="flex gap-3"> {/* Adjusted gap for better spacing */}

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
                {/* Logo and Copyright */}

                <div className="mt-2 pt-2 border-t border-gray-700 text-center text-sm text-muted-foreground"> {/* Reduced spacing */}
                    <p>&copy; 2025 GameVault. All rights reserved.</p>

                </div>
            </div>
        </footer>
    )
}


export default Footer;

