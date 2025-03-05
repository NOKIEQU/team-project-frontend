import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Youtube, Twitch, Linkedin } from 'lucide-react'

function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-start">
                        <p className="text-sm text-muted dark:text-white">
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-sm hover:underline">Home</Link></li>
                            <li><Link href="/shop" className="text-sm hover:underline">Shop</Link></li>
                            <li><Link href="/about" className="text-sm hover:underline">About Us</Link></li>
                            <li><Link href="/contact-us" className="text-sm hover:underline">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li><Link href="/faq" className="text-sm hover:underline">FAQ</Link></li>
                            <li><Link href="/privacy-policy" className="text-sm hover:underline">Privacy Policy</Link></li>
                            <li className="text-sm"><a href="tel:+442345678900" className="hover:underline">+44 2345 678900</a></li>

                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
                        <div className="flex flex-wrap gap-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                                <Instagram className="h-5 w-5" />
                            </a>
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
                <div className="mt-8 pt-2 border-t text-center text-sm text-muted-foreground">
                    <div className="flex justify-center mb-2"> </div>
                    <p>&copy; 2025 Gamevault. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer
