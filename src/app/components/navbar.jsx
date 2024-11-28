
function Navbar() {
  return (
    <nav className="flex justify-between items-center p-5 bg-gray-900 text-white">
      <div className="text-2xl font-bold">GAME VAULT</div>
      <ul className="flex space-x-8">
        <li>
          <a href="#" className="hover:text-purple-500">Home</a>
        </li>
        <li>
          <a href="#" className="hover:text-purple-500">About Us</a>
        </li>
        <li>
          <a href="#" className="hover:text-purple-500">Products</a>
        </li>
      </ul>
      <button className="px-6 py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-purple-500 hover:text-white transition-all">
        Log in
      </button>
    </nav>
  );
}

export default Navbar;
