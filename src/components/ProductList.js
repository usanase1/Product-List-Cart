import React, { useEffect, useState } from "react";
import EmptyCart from "./EmptyCart";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const [cartDetails, setCartDetails] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/data.json");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Increment product quantity
  const increment = (index, product) => {
    setCartItem((prev) => {
      const newCount = (prev[index] || 0) + 1;
      setCartDetails((prevDetails) => {
        const itemIndex = prevDetails.findIndex((item) => item.name === product.name);
        if (itemIndex === -1) {
          return [
            ...prevDetails,
            {
              name: product.name,
              unitPrice: product.price,
              image: product.image.desktop,
              index,
            },
          ];
        }
        return prevDetails;
      });
      return { ...prev, [index]: newCount };
    });
  };

  // Decrement product quantity
  const decrement = (index, product) => {
    setCartItem((prev) => {
      const newCount = (prev[index] || 0) - 1;
      if (newCount <= 0) {
        setCartDetails((prevDetails) =>
          prevDetails.filter((item) => item.name !== product.name)
        );
        return { ...prev, [index]: 0 };
      } else {
        return { ...prev, [index]: newCount };
      }
    });
  };

  // Remove a product from the cart
  const removeItem = (itemName, index) => {
    setCartDetails((prevDetails) =>
      prevDetails.filter((item) => item.name !== itemName)
    );
    setCartItem((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[index];
      return newCart;
    });
  };

  // Handle adding item to the cart
  const handleAddToCart = (index, product) => {
    increment(index, product);
  };

  // Calculate the total number of items in the cart
  const totalItems = Object.values(cartItem).reduce((a, b) => a + b, 0);

  // Calculate the total price of the cart
  const total = cartDetails.reduce((sum, item) => {
    const quantity = cartItem[item.index] || 0;
    return sum + item.unitPrice * quantity;
  }, 0);

  return (
    <div className="flex justify-between ml-10 mr-3 mt-8">
      {/* Product Grid */}
      <div
        className={`w-[73%] ${confirmed ? "opacity-50 pointer-events-none" : ""}`}
      >
        <div className="font-bold mb-6">
          <h4 className="text-2xl">Desserts</h4>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div key={product.name} className="w-full">
              <div className="relative">
                <img
                  className="w-full rounded-lg"
                  src={product.image.desktop}
                  alt={product.name}
                />
                <div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="absolute top-[93%] left-1/2 transform -translate-x-1/2 flex items-center justify-center border-2 rounded-[20px] bg-white px-2 py-1 shadow-sm w-[120px]"
                >
                  {hoveredIndex === index ? (
                    <div className="flex justify-center items-center space-x-3 bg-[#C73B0F] text-white rounded-full px-3 py-1">
                      <button
                        onClick={() => increment(index, product)}
                        className="text-lg font-bold cursor-pointer"
                      >
                        +
                      </button>
                      <div className="text-sm font-medium">
                        {cartItem[index] || 0}
                      </div>
                      <button
                        onClick={() => decrement(index, product)}
                        className="text-lg font-bold cursor-pointer"
                      >
                        -
                      </button>
                    </div>
                  ) : (
                    <>
                      <img
                        className="w-[14px] ml-2"
                        src="/icon-add-to-cart.svg"
                        alt="Add to cart"
                      />
                      <button
                        onClick={() => handleAddToCart(index, product)}
                        className="text-xs ml-2"
                      >
                        Add To Cart
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xs text-[#87635A]">{product.name}</p>
                <p className="text-xs text-[#260F08] font-semibold">{product.category}</p>
                <p className="text-xs text-[#C73B0F]">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Panel */}
      {confirmed && (
        <div className="absolute w-[69%] rounded-lg bg-white top-[105%]">
          <div className="ml-7 mt-10">
            <img src="/icon-order-confirmed.svg" alt="confirmed" />
            <h2 className="text-2xl font-bold mt-3">Order Confirmed</h2>
            <span className="text-xs mt-5">We hope you enjoy your food</span>
          </div>
          <div className="ml-7">
            {cartDetails.map((item, i) => {
              const quantity = cartItem[item.index] || 0;
              return (
                <div key={i} className="mb-1 border-b py-2">
                  <div className="flex space-x-4">
                    <img className="w-[50px]" src={item.image} alt={item.name} />
                    <div>
                      <p className="text-[#260F08] text-xs font-medium">{item.name}</p>
                      <div className="flex items-center gap-2 relative">
                        <span className="text-sm text-[#C73B0F]">{quantity}x</span>
                        <span className="text-xs text-[#87635A]">@ ${item.unitPrice}</span>
                        <span className="text-xs font-medium text-[#87635A] ml-[420px]">
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
                <span className="text-sm">Order Total</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setConfirmed(false);
              setCartItem({});
              setCartDetails([]);
            }}
            className="mb-4 w-[70%] ml-[80px] rounded-[30px] bg-[#C73B0F] text-white py-2 font-medium hover:bg-[#b83509] transition"
          >
            Start New Order
          </button>
        </div>
      )}

      {/* Cart Section */}
      <div className="w-[25%] bg-white h-[28%] rounded-lg">
        <div className="mt-2 ml-3">
          <h2 className="text-[#C73B0F] font-semibold">
            Your Cart ({totalItems})
          </h2>
        </div>
        {cartDetails.length === 0 && <EmptyCart />}
        {cartDetails.length > 0 && (
          <div>
            {cartDetails.map((item, i) => {
              const quantity = cartItem[item.index] || 0;
              return (
                <div key={i} className="mb-1 border-b py-2">
                  <p className="text-[#260F08] text-xs font-medium">{item.name}</p>
                  <div className="flex items-center gap-2 relative">
                    <span className="text-sm text-[#C73B0F]">{quantity}x</span>
                    <span className="text-xs text-[#87635A]">@ ${item.unitPrice}</span>
                    <span className="text-xs font-medium text-[#87635A]">
                      ${(item.unitPrice * quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.name, item.index)}
                      className="border rounded-lg border-[#AD8A85] absolute right-2 bottom-3"
                    >
                      <img className="w-full" src="/icon-remove-item.svg" alt="remove" />
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm">Order Total</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
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
    </div>
  );
}
