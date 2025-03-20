import React from "react";

export default function CheckoutLayout({ children }) {
  return (
    <div className="w-full h-full min-h-screen bg-gray-100">
      {/* The children components will be rendered here */}
      {children}
    </div>
  );
}