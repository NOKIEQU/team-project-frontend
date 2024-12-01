import React from "react";

export default function CheckoutLayout({ children }) {
  return (
    <div className="p-10 w-full h-screen bg-gray-100">
      {/* The children components will be rendered here */}
      {children}
    </div>
  );
}
