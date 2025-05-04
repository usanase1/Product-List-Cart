import React from "react";

export default function EmptyCart() {
  return (
    <div className="">
      <div className="mt-5 flex justify-center">
        <img src="/illustration-empty-cart.svg" alt="empty cart" />
      </div>
      <div className=" mt-2 pb-6">
        <p className="text-[#87635A] text-xs text-center">
          Your added items will appear here
        </p>
      </div>
    </div>
  );
}
