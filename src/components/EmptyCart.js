import React from "react";

export default function EmptyCart() {
  return (
    <div className="font-inter">
      <div className="mt-16 mb-4 flex justify-center">
        <img
          src="/illustration-empty-cart.svg"
          alt="empty cart"
          className="w-[160px] h-auto"
        />
      </div>
      <div className="mt-4 px-4 pb-6">
        <p className="text-[#87635A] text-sm text-center font-medium">
          Your added items will appear here
        </p>
      </div>
    </div>
  );
}
