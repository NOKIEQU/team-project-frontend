"use client"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

function FooterComponent() {

    return (
        <footer className="bg-black text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-start">
                        <p className="text-sm text-muted dark:text-white">
                            Your one-stop shop for all things gaming. Discover, play, and connect.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-sm hover:underline">Home</Link></li>
                            <li><Link href="/shop" className="text-sm hover:underline">Shop</Link></li>
                            <li><Link href="/about" className="text-sm hover:underline">About Us</Link></li>
                            <li><Link href="/contact" className="text-sm hover:underline">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li><Link href="/faq" className="text-sm hover:underline">FAQ</Link></li>
                            <li><Link href="/shipping" className="text-sm hover:underline">Shipping</Link></li>
                            <li><Link href="/returns" className="text-sm hover:underline">Returns</Link></li>
                            <li><Link href="/privacy" className="text-sm hover:underline">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <button variant="ghost" size="icon">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <Facebook className="h-5 w-5" />
                                    <span className="sr-only">Facebook</span>
                                </a>
                            </button>
                            <button variant="ghost" size="icon">
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <Twitter className="h-5 w-5" />
                                    <span className="sr-only">Twitter</span>
                                </a>
                            </button>
                            <button variant="ghost" size="icon">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <Instagram className="h-5 w-5" />
                                    <span className="sr-only">Instagram</span>
                                </a>
                            </button>
                            <button variant="ghost" size="icon">
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                    <Youtube className="h-5 w-5" />
                                    <span className="sr-only">YouTube</span>
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; 2024 GameStore. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default FooterComponent;