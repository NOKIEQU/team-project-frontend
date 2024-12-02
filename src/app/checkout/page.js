import React from "react";

function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      {/* Header */}
      <header className="flex justify-between w-full max-w-5xl items-center mb-10">
        <div className="flex items-center space-x-2">
          <img
            src="/gamevault-logo.png"
            alt="GameVault Logo"
            className="w-10 h-10"
          />
          <span className="text-yellow-500 font-bold text-2xl">GAMEVAULT</span>
        </div>
        <nav className="flex space-x-6 text-white">
          <a href="/login" className="hover:text-yellow-500">
            LOG IN
          </a>
          <a href="/about-us" className="hover:text-yellow-500">
            ABOUT US
          </a>
          <a href="/signup" className="hover:text-yellow-500">
            SIGN IN
          </a>
        </nav>
      </header>

      {/* Checkout Heading */}
      <h1 className="text-4xl font-bold text-yellow-500 mb-6">CHECKOUT</h1>

      <div className="flex flex-wrap w-full max-w-5xl gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Payment Section */}
          <section className="w-full bg-gray-800 rounded-lg p-5 mb-10">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">
              HOW WOULD YOU LIKE TO PAY?
            </h2>
            <div className="flex flex-col space-y-4">
              {/* Disney Gift Card */}
              <label className="flex items-center space-x-3">
                <input type="radio" name="payment" className="accent-yellow-500" />
                <img
                  src="/disney-gift-card.png"
                  alt="Disney Gift Card"
                  className="w-12 h-12"
                />
                <span>Disney Gift Card</span>
              </label>

              {/* Disney Rewards Redemption Card */}
              <label className="flex items-center space-x-3">
                <input type="radio" name="payment" className="accent-yellow-500" />
                <img
                  src="/disney-rewards.png"
                  alt="Disney Rewards Redemption Card"
                  className="w-12 h-12"
                />
                <span>Disney Rewards Redemption Card</span>
              </label>

              {/* Credit or Debit Card */}
              <label className="flex items-center space-x-3">
                <input type="radio" name="payment" className="accent-yellow-500" />
                <img
                  src="/credit-card.png"
                  alt="Credit or Debit Card"
                  className="w-12 h-12"
                />
                <span>Credit or Debit Card</span>
              </label>

              {/* Click to Pay */}
              <label className="flex items-center space-x-3">
                <input type="radio" name="payment" className="accent-yellow-500" />
                <img
                  src="/click-to-pay.png"
                  alt="Click to Pay"
                  className="w-12 h-12"
                />
                <span>Click to Pay</span>
              </label>
            </div>
          </section>

          {/* Form Section */}
          <section className="w-full bg-gray-800 rounded-lg p-5 mb-10">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">CONFIRM</h2>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 bg-gray-700 text-white rounded border border-yellow-500"
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full p-3 bg-gray-700 text-white rounded border border-yellow-500"
              />
              <input
                type="text"
                placeholder="Country"
                className="w-full p-3 bg-gray-700 text-white rounded border border-yellow-500"
              />
              <button className="w-full py-3 bg-yellow-500 text-black font-bold rounded">
                Confirm Purchase
              </button>
            </form>
          </section>
        </div>

        {/* Items Section (Moved to the Right Side) */}
        <aside className="w-full max-w-sm bg-gray-800 rounded-lg p-5">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">
            ITEMS BEING PURCHASED
          </h2>
          <div className="grid grid-cols-4 gap-4 text-center text-white font-semibold">
            <div>Items</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total</div>
          </div>
          <div className="grid grid-cols-4 gap-4 text-center mt-4 items-center">
            <div className="flex flex-col items-center">
              <img
                src="/game-image.png"
                alt="Game Thumbnail"
                className="w-16 h-16 rounded-md"
              />
              <span className="text-sm">Fusion Game Hard Company Games</span>
            </div>
            <div>£100.00</div>
            <div>1</div>
            <div>£100.00</div>
          </div>
        </aside>
      </div>

      {/* Back to Top */}
      <button className="py-3 px-6 bg-yellow-500 text-black font-bold rounded mt-10">
        BACK TO TOP
      </button>
    </div>
  );
}

export default CheckoutPage;
