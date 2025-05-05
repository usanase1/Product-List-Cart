import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartItem({ item }) {
  const { cartItem, removeItem } = useContext(CartContext);
  const quantity = cartItem[item.index] || 0;

  return (
    <div className="mb-1 border-b py-2">
      <p className="text-[#260F08] text-xs md:text-sm font-medium">{item.name}</p>
      <div className="flex items-center gap-2 relative flex-wrap">
        <span className="text-sm text-[#C73B0F]">{quantity}x</span>
        <span className="text-xs md:text-sm text-[#87635A]">@ ${item.unitPrice.toFixed(2)}</span>
        <span className="text-xs md:text-sm font-medium text-[#87635A] ml-auto md:ml-0">
          ${(item.unitPrice * quantity).toFixed(2)}
        </span>
        <button
          onClick={() => removeItem(item.name, item.index)}
          className="border rounded-lg border-[#AD8A85] absolute right-0 bottom-3 md:bottom-3"
        >
          <img className="w-full" src="/icon-remove-item.svg" alt="remove" />
        </button>
      </div>
    </div>
  );
}