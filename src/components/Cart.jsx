import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";

export default function Cart() {
  const { cartDetails, totalItems, total, setConfirmed } = useContext(CartContext);

  return (
    <div className="w-full md:w-[25%] bg-white h-auto md:h-[28%] rounded-lg p-4 md:p-0">
      <div className="mt-2 ml-0 md:ml-3">
        <h2 className="text-[#C73B0F] font-semibold text-lg md:text-base">
          Your Cart ({totalItems})
        </h2>
      </div>
      {cartDetails.length === 0 && <EmptyCart />}
      {cartDetails.length > 0 && (
        <div>
          {cartDetails.map((item, i) => (
            <CartItem key={i} item={item} />
          ))}
          <div className="border-t pt-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm md:text-base">Order Total</span>
              <span className="text-xl md:text-2xl font-bold">${total.toFixed(2)}</span>
            </div>
            <div className="flex bg-[#FCF8F6] items-center justify-center text-green-600 text-xs mb-4">
              <img className="mr-1" src="/icon-carbon-neutral.svg" alt="carbon" />
              <p className="text-[#260F08] text-xs">
                This is a <span className="font-medium">carbon-neutral</span> delivery
              </p>
            </div>
            <button
              onClick={() => setConfirmed(true)}
              className="w-full rounded-[30px] bg-[#C73B0F] text-white py-2 font-medium hover:bg-[#b83509] transition"
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}