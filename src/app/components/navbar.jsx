import Link from "next/link";

function Navbar({ isLoggedIn }) {
  if (isLoggedIn) {
    return (
      <nav className="fixed top-0 left-0 w-full z-10 flex justify-between items-center p-1 bg-gray-900 text-white font-sans">
        <div className="flex items-center space-x-4">
          <img src="/logo.svg" alt="logo" className="w-16 h-16" />
          <div className="text-2xl font-bold">GAME VAULT</div>
        </div>

        <ul className="flex space-x-12">
          <li>
            <Link href="/" className="hover:text-orange-500 transition-all">
              Home
            </Link>
          </li>
          <li>
            <Link href="/shop" className="hover:text-orange-500 transition-all">
              Shop
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="hover:text-orange-500 transition-all"
            >
              Profile
            </Link>
          </li>
          <li>
          <Link
              href="/login"
              className="hover:text-orange-500 transition-all"
            >
              Login
            </Link>
          </li>
          <li>
          <Link
              href="/basket"
              className="hover:text-orange-500 transition-all"
            >
              Basket
            </Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="fixed top-0 left-0 w-full z-10 flex justify-between items-center p-2 bg-gray-900 text-white font-sans">
        <div className="flex items-center space-x-4">
          <img src="/logo.svg" alt="logo" className="w-16 h-16" />
          <div className="text-2xl font-bold">GAME VAULT</div>
        </div>

        <ul className="flex space-x-12">
          <li>
            <Link href="/" className="hover:text-orange-500 transition-all">
              Home
            </Link>
          </li>
          <li>
            <Link href="/shop" className="hover:text-orange-500 transition-all">
              Shop
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="hover:text-orange-500 transition-all"
            >
              Log in
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="hover:text-orange-500 transition-all"
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
