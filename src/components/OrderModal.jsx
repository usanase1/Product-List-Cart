import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function OrderModal() {
  const { confirmed, cartDetails, cartItem, total, setConfirmed, setCartItem, setCartDetails } = useContext(CartContext);

  return confirmed ? (
    <div className="absolute w-full md:w-[69%] rounded-lg bg-white top-0 md:top-[105%] left-0 md:left-auto z-10">
      <div className="ml-4 md:ml-7 mt-6 md:mt-10">
        <img src="/icon-order-confirmed.svg" alt="confirmed" />
        <h2 className="text-xl md:text-2xl font-bold mt-3">Order Confirmed</h2>
        <span className="text-xs md:text-sm mt-5">We hope you enjoy your food</span>
      </div>
      <div className="ml-4 md:ml-7">
        {cartDetails.map((item, i) => {
          const quantity = cartItem[item.index] || 0;
          return (
            <div key={i} className="mb-1 border-b py-2">
              <div className="flex space-x-4">
                <img className="w-[40px] md:w-[50px]" src={item.image} alt={item.name} />
                <div className="w-full">
                  <p className="text-[#260F08] text-xs md:text-sm font-medium">{item.name}</p>
                  <div className="flex items-center gap-2 relative flex-wrap">
                    <span className="text-sm text-[#C73B0F]">{quantity}x</span>
                    <span className="text-xs md:text-sm text-[#87635A]">@ ${item.unitPrice.toFixed(2)}</span>
                    <span className="text-xs md:text-sm font-medium text-[#87635A] ml-auto md:ml-[420px]">
                      ${(item.unitPrice * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="border-t pt-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm md:text-base">Order Total</span>
            <span className="text-xl md:text-2xl font-bold">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setConfirmed(false);
          setCartItem({});
          setCartDetails([]);
        }}
        className="mb-4 w-full md:w-[70%] mx-auto md:ml-[80px] rounded-[30px] bg-[#C73B0F] text-white py-2 font-medium hover:bg-[#b83509] transition"
      >
        Start New Order
      </button>
    </div>
  ) : null;
}