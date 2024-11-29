import Link from "next/link";

function Footer() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        {/* Main Content Here */}
      </div>
      <footer className="w-full flex justify-between items-center p-2 bg-gray-900 text-white font-sans">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">GAME VAULT</div>
        </div>
        <div className="h-8 border-l-2 border-white mx-4"></div>
        
        <ul className="flex space-x-12">
          <li>
            <Link href="/about" className="hover:text-orange-500 transition-all">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-orange-500 transition-all">
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/support" className="hover:text-orange-500 transition-all">
              Support
            </Link>
          </li>
        </ul>
        
        <div className="h-8 border-l-2 border-white mx-4"></div>
        
        <div className="hover:text-orange-500 transition-all">
          <p>&copy; Copyright 2024 @Team 12</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
