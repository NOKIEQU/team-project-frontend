"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../../context/user-context";
import { useRouter } from "next/navigation";

export default function OrderHistory() {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [category, setCategory] = useState("all");
  const [timeFrame, setTimeFrame] = useState("all");
  const [orders, setOrders] = useState([]);
  const { user: userObject } = useUser();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const router = useRouter();

  // Check if the user is loaded
  useEffect(() => {
    if (userObject && userObject.token) {
      setIsUserLoaded(true);
    }
  }, [userObject]);

  const toggleDetails = (id) => {
    setExpandedOrder(id === expandedOrder ? null : id);
  };

  


useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://51.77.110.253:3001/api/orders", {
        headers: {
          Authorization: `Bearer ${userObject.token}`,
        },
      });
      const data = await response.json();
      const formattedOrders = data.map((order) => ({
        id: order.id,
        date: new Date(order.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        game: order.orderItems.map((item) => item.product.title).join(", "),
        price: `£${order.totalPrice}`,
        payment: "Paid with GameVault Points", // Adjust if payment info is available
        status: order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase(),
        category: "Unknown", // Adjust if category info is available
        image: order.orderItems[0]?.product.imageUrls[0] || "/placeholder.jpg",
        details: `Order contains ${order.orderItems.length} item(s).`,
      }));
      setOrders(formattedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  if (isUserLoaded) {
    fetchOrders();
  }
}, [isUserLoaded, userObject]);

  // Filtering logic
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.date);
    const currentDate = new Date();
    let withinTimeFrame = true;

    if (timeFrame === "3months") {
      withinTimeFrame = orderDate >= new Date(currentDate.setMonth(currentDate.getMonth() - 3));
    } else if (timeFrame === "6months") {
      withinTimeFrame = orderDate >= new Date(currentDate.setMonth(currentDate.getMonth() - 6));
    }

    return (category === "all" || order.category === category) && withinTimeFrame;
  });

  const recentOrders = filteredOrders.slice(0, 2);
  const pastOrders = filteredOrders.slice(2);

  return (
    <div className="min-h-screen bg-[#1A1A22] text-white px-6 py-8">
      {/* Header */}
      <div className="border-b border-gray-600 pb-4 mb-6 text-center">
        <h1 className="text-4xl font-bold">Order History</h1>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <select className="bg-[#F0ECEC] text-[#111] p-2 rounded" onChange={(e) => setCategory(e.target.value)}>
          <option value="all"> View All Categories</option>
          <option value="Action">Action</option>
          <option value="RPG">RPG</option>
          <option value="Adventure">Adventure</option>
          <option value="Sports">Sports</option>
        </select>
        <select className=" bg-[#F0ECEC] text-[#111] p-2 rounded" onChange={(e) => setTimeFrame(e.target.value)}>
          <option value="all"> Order Date </option>
          <option value="3months">ordered within Past 3 Months</option>
          <option value="6months">ordered within Past 6 Months</option>
          <option value="12months">ordered within Past 12 Months</option>
          <option value="1 year">ordered within Past 1 year</option>
          <option value="2 year">ordered within Past 2 years</option>
        </select>
      </div>

      {/* Orders Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        <div className="space-y-6">
          {recentOrders.map((order) => (
            <div key={order.id} className="bg-[#F0ECEC] p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img src={order.image} alt={order.game} className="w-20 h-20 rounded-md text-[#111]" />
                  <div>
                    <p className="text-sm font-bold text-[#111]">{order.date}</p>
                    <p className="text-lg font-semibold text-[#111]">{order.game}</p>
                    <p className="text-sm text-[#111]">Order Number: {order.id}</p>
                    <p className="text-md font-bold text-[#111]">{order.price}</p>
                    <p className="text-sm text-[#111]">{order.payment}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === "Delivered" ? "bg-[#111]" : "hover:bg-[#d9d9d9]"} text-[#F0ECEC]`}>
                    {order.status}
                  </span>
                  <button onClick={() => toggleDetails(order.id)} className="mt-3 text-sm text-[#111] hover:text-[#111] transition">
                    {expandedOrder === order.id ? "Hide Details" : "Show Details"}
                  </button>
                </div>
              </div>
              {expandedOrder === order.id && (
                <div className="mt-4 text-sm text-[#111]">
                  <p>Payment Method: {order.payment}</p>
                  <p>Status: {order.status}</p>
                  <p>{order.details}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Past Orders with Increased Margin */}
      <div className="mt-12">

        <h2 className="text-2xl font-semibold mb-4 ">Past Orders</h2>
        <div className="space-y-6">

          {pastOrders.map((order) => (
            <div key={order.id} className="bg-[#F0ECEC] p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img src={order.image} alt={order.game} className="w-20 h-20 rounded-md text-[#111]" />
                  <div>
                    <p className="text-sm font-bold text-[#111]">{order.date}</p>
                    <p className="text-lg font-semibold text-[#111]">{order.game}</p>
                    <p className="text-sm text-[#111]">Order Number: {order.id}</p>
                    <p className="text-md font-bold text-[#111]">{order.price}</p>
                    <p className="text-sm text-[#111]">{order.payment}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === "Delivered", "Processed", "Pending" ? "bg-[#111]" : "hover:bg-[#d9d9d9]"} text-[#F0ECEC]`}>
                    
                    {order.status}
                  </span>
                  <button onClick={() => toggleDetails(order.id)} className="mt-3 text-sm text-[#111] hover:text-[#111] transition">
                    {expandedOrder === order.id ? "Hide Details" : "Show Details"}
                  </button>
                </div>
              </div>
              {expandedOrder === order.id && (
                <div className="mt-4 text-sm text-[#111]">
                  <p>Payment Method: {order.payment}</p>
                  <p>Status: {order.status}</p>
                  <p>{order.details}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex justify-end space-x-4">
        <button className="bg-[#F0ECEC] hover:bg-[#d9d9d9] text-[#111] px-6 py-3 rounded-lg font-semibold">Continue Shopping</button>
      </div>
    </div>
  );
}
