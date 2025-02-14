import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash, Plus, Minus } from "lucide-react";

const GameBasket = () => {
  const [cart, setCart] = useState([
    { id: 1, title: "Cyberpunk 2077", price: 49.99, quantity: 1, image: "/cyberpunk.jpg" },
    { id: 2, title: "Elden Ring", price: 59.99, quantity: 1, image: "/eldenring.jpg" },
  ]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id, amount) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode === "GAMER10") {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal - (subtotal * discount) / 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Basket</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-3">Game</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Total</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id} className="border-b">
                <td className="p-3 flex items-center gap-3">
                  <img src={item.image} alt={item.title} className="w-16 h-16 rounded" />
                  {item.title}
                </td>
                <td className="p-3">${item.price.toFixed(2)}</td>
                <td className="p-3 flex items-center gap-2">
                  <Button size="icon" onClick={() => updateQuantity(item.id, -1)}><Minus /></Button>
                  {item.quantity}
                  <Button size="icon" onClick={() => updateQuantity(item.id, 1)}><Plus /></Button>
                </td>
                <td className="p-3">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="p-3">
                  <Button variant="destructive" size="icon" onClick={() => removeItem(item.id)}>
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Input placeholder="Enter Promo Code" value={promoCode} onChange={e => setPromoCode(e.target.value)} />
          <Button onClick={applyPromoCode}>Apply</Button>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="flex justify-between text-lg font-semibold">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold mt-2">
            <span>Discount:</span>
            <span>{discount}%</span>
          </div>
          <div className="flex justify-between text-xl font-bold mt-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <Button variant="outline">Continue Shopping</Button>
        <Button className="bg-blue-600 hover:bg-blue-700">Checkout</Button>
      </div>
    </div>
  );
};

export default GameBasket;
