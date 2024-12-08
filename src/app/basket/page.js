<div className="bg-[#0d1b2a] min-h-screen">
  <Navbar isLoggedIn={"True"}></Navbar>
  <h1 className="text-center py-4 text-white font-black text-xl md:text-2xl">
    GameVault
  </h1>

  {/* Basket Header */}
  <div className="flex justify-around text-black text-base py-3 bg-[#FFA800]">
    <div className="font-black text-lg">Basket</div>
  </div>

  {/* Basket Content */}
  <div className="p-4 md:px-10 lg:px-20 xl:px-52">
    <div className="flex justify-between items-center py-3 border-b-2 border-gray-300 mb-4">
      <div className="flex-1">
        <span className="font-semibold text-lg text-white">Product</span>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <div className="min-w-[140px] text-center">
          <span className="font-semibold text-lg text-white">Quantity</span>
        </div>
        <div className="min-w-[100px] text-right text-white">
          <span className="font-semibold text-lg">Price</span>
        </div>
        <div className="w-8"></div>
      </div>
    </div>

    {/* Cart Items */}
    {cart.map((item) => (
      <div
        key={item.id}
        className="flex flex-col md:flex-row justify-between items-center py-3 border-b border-gray-200"
      >
        {/* Product Info */}
        <div className="flex items-center flex-1 w-full md:w-auto">
          <div className="w-[80px] h-[80px] flex-shrink-0">
            <ShopImage name={item.title} img={item.img} />
          </div>
          <span className="pl-3 text-sm font-medium text-white">{item.title}</span>
        </div>

        {/* Quantity and Price */}
        <div className="flex items-center justify-between w-full md:w-auto mt-4 md:mt-0 md:space-x-8">
          <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="h-8 w-8 p-0 hover:bg-gray-200 rounded-full"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="mx-4 font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="h-8 w-8 p-0 hover:bg-gray-200 rounded-full"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="min-w-[100px] text-right">
            <span className="font-semibold text-white">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="h-8 w-8 p-0 hover:bg-[#fa9a00ef] rounded-full"
          >
            <Trash2 className="h-4 w-4 text-[#f6a302]" />
          </button>
        </div>
      </div>
    ))}

    {/* Grand Total */}
    <div className="mt-8 border-t border-gray-200 pt-4">
      <h1 className="text-xl font-semibold text-right text-white">
        Grand Total: £{getCartTotal() === 0 ? "0" : getCartTotal().toFixed(2)}
      </h1>
    </div>
  </div>

  {/* Action Buttons */}
  <div className="flex flex-col md:flex-row justify-between gap-4 p-4 md:px-10 lg:px-20 xl:px-52 text-base">
    <Link href={"/shop"}>
      <button
        className="hover:bg-yellow-500 transition-colors text-black font-semibold py-2 px-6 rounded w-full md:w-auto"
        style={{ backgroundColor: "#FFA800" }}
      >
        Continue Shopping
      </button>
    </Link>
    <Link href={"/checkout"}>
      <button
        className="hover:bg-yellow-500 transition-colors text-black font-semibold py-2 px-6 rounded w-full md:w-auto"
        style={{ backgroundColor: "#FFA800" }}
      >
        Proceed to Checkout
      </button>
    </Link>
  </div>
</div>
