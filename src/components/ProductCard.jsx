import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product, index }) {
  const { cartItem, hoveredIndex, setHoveredIndex, handleAddToCart, increment, decrement } = useContext(CartContext);

  return (
    <div className="w-full">
      <div className="relative">
        <picture>
          <source
            media="(min-width: 1024px)"
            srcSet={product.image.desktop}
          />
          <source
            media="(min-width: 768px)"
            srcSet={product.image.tablet}
          />
          <source
            media="(max-width: 767px)"
            srcSet={product.image.mobile}
          />
          <img
            className="w-full rounded-lg"
            src={product.image.desktop} 
            alt={product.name}
          />
        </picture>
        <div
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(cartItem[index] ? index : null)}
          className={`absolute top-[90%] md:top-[92%] lg:top-[93%] left-1/2 transform -translate-x-1/2 flex items-center justify-center w-[130px] md:w-[140px] lg:w-[150px] ${
            hoveredIndex === index ? '' : 'border-2 rounded-[20px] bg-white px-2 py-1 shadow-sm'
          }`}
        >
          {hoveredIndex === index ? (
            <div className="flex justify-between items-center w-full bg-[#C73B0F] text-white rounded-full px-2 py-1">
              <button
                onClick={() => decrement(index, product)}
                className="w-5 h-5 border border-white rounded-full cursor-pointer hover:opacity-80 flex items-center justify-center"
              >
                <img
                  className="w-2 h-2"
                  src="/icon-decrement-quantity.svg"
                  alt="decrement"
                />
              </button>
              <div className="w-1/3 text-[10px] md:text-xs font-medium text-center">
                {cartItem[index] || 0}
              </div>
              <button
                onClick={() => increment(index, product)}
                className="w-5 h-5 border border-white rounded-full cursor-pointer hover:opacity-80 flex items-center justify-center"
              >
                <img
                  className="w-2 h-2"
                  src="/icon-increment-quantity.svg"
                  alt="increment"
                />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <img
                className="w-[10px] md:w-[12px]"
                src="/icon-add-to-cart.svg"
                alt="Add to cart"
              />
              <button
                onClick={() => handleAddToCart(index, product)}
                className="text-[10px] md:text-xs"
              >
                Add To Cart
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 md:mt-4 lg:mt-6">
        <p className="text-[10px] md:text-xs lg:text-sm text-[#87635A]">{product.name}</p>
        <p className="text-[10px] md:text-xs lg:text-sm text-[#260F08] font-semibold">{product.category}</p>
        <p className="text-[10px] md:text-xs lg:text-sm text-[#C73B0F]">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}