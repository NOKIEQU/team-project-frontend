import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Twitch, Linkedin, Mail, Phone } from 'lucide-react'

function Footer() {
    return (
        <footer className="bg-gray-950 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Quick Links */}
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-lg mb-4 border-b border-gray-800 pb-2">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-sm hover:text-[#FFA800] transition-colors duration-200">Home</Link></li>
                            <li><Link href="/shop" className="text-sm hover:text-[#FFA800] transition-colors duration-200">Shop</Link></li>
                            <li><Link href="/about" className="text-sm hover:text-[#FFA800] transition-colors duration-200">About Us</Link></li>
                            <li><Link href="/contact-us" className="text-sm hover:text-[#FFA800] transition-colors duration-200">Contact</Link></li>
                        </ul>
                    </div>
                    
                    {/* Legal */}
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-lg mb-4 border-b border-gray-800 pb-2">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="/ReturnsPolicy" className="text-sm hover:text-[#FFA800] transition-colors duration-200">Returns Policy</Link></li>
                            <li><Link href="/tos" className="text-sm hover:text-[#FFA800] transition-colors duration-200">Terms & Conditions</Link></li>
                            <li><Link href="/PrivacyPolicy" className="text-sm hover:text-[#FFA800] transition-colors duration-200">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-lg mb-4 border-b border-gray-800 pb-2">Customer Service</h3>
                        <ul className="space-y-2">
                            <li className="text-sm flex items-center">
                                <Phone className="h-4 w-4 mr-2" />
                                <a href="tel:+442345678900" className="hover:text-[#FFA800] transition-colors duration-200">+44 2345 678900</a>
                            </li>
                            <li className="text-sm flex items-center">
                                <Mail className="h-4 w-4 mr-2" />
                                <a href="mailto:GameVault@gmail.com" className="hover:text-[#FFA800] transition-colors duration-200">GameVault@gmail.com</a>
                            </li>
                            <li><Link href="/faq" className="text-sm hover:text-[#FFA800] transition-colors duration-200">FAQ</Link></li>
                        </ul>
                    </div>
                    
                    {/* Connect With Us */}
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-lg mb-4 border-b border-gray-800 pb-2">Connect With Us</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                               className="bg-gray-900 p-2 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                               className="bg-gray-900 p-2 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                               className="bg-gray-900 p-2 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                               className="bg-gray-900 p-2 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200">
                                <Youtube className="h-5 w-5" />
                            </a>
                            <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" 
                               className="bg-gray-900 p-2 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200">
                                <Twitch className="h-5 w-5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                               className="bg-gray-900 p-2 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs text-gray-400">Follow us for updates, promotions, and more!</p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-400">&copy; 2025 GameVault. All rights reserved.</p>
                    <p className="text-xs text-gray-500 mt-2 md:mt-0">Designed and developed by GameVault Team</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
