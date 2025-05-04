import React, { useEffect, useState } from "react";
import EmptyCart from "./EmptyCart";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const [cartDetails, setCartDetails] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [price, setPrice] = useState();
  const [confirmed, setConfirmed] = useState(false);

  const increment = (index, product) => {
    setCartItem((prev) => {
      const newCount = (prev[index] || 0) + 1;

      setCartDetails((prevDetails) => {
        const itemIndex = prevDetails.findIndex(
          (item) => item.name === product.name
        );
        if (itemIndex === -1) {
          return [
            ...prevDetails,
            {
              name: product.name,
              price: product.price,
              image: product.image.desktop,
            },
          ];
        } else {
          const updatedCart = [...prevDetails];
          updatedCart[itemIndex].price = product.price * newCount;
          return updatedCart;
        }
      });

      return {
        ...prev,
        [index]: newCount,
      };
    });
  };

  const decrement = (index, product) => {
    setCartItem((prev) => {
      const newCount = (prev[index] || 0) - 1;
      if (newCount <= 0) {
        setCartDetails((prevDetails) =>
          prevDetails.filter((item) => item.name !== product.name)
        );
        return {
          ...prev,
          [index]: 0,
        };
      } else {
        setCartDetails((prevDetails) => {
          const itemIndex = prevDetails.findIndex(
            (item) => item.name === product.name
          );
          if (itemIndex !== -1) {
            const updatedCart = [...prevDetails];
            updatedCart[itemIndex].price = product.price * newCount;
            return updatedCart;
          }
          return prevDetails;
        });

        return {
          ...prev,
          [index]: newCount,
        };
      }
    });
  };

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

  const totalItems = Object.values(cartItem).reduce((a, b) => a + b, 0);

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

  const handleAddToCart = (index, product) => {
    increment(index, product);
  };

  const total = cartDetails.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex justify-between ml-10 mr-3 mt-8">
      <div className="w-[73%]">
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
                  onClick={() => setPrice(product.price)}
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
                <p className="text-xs text-[#260F08] font-semibold">
                  {product.category}
                </p>
                <p className="text-xs text-[#C73B0F]">
                  <span>$</span>
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {confirmed && (
        <div className="absolute w-[69%] rounded-lg bg-white top-[105%]">
          <div className="ml-7 mt-10">
            <div>
              <img src="/icon-order-confirmed.svg" alt="confirmed" />
            </div>
            <h2 className="text-2xl font-bold mt-3">Order Confirmed</h2>
            <span className="text-xs mt-5">We hope you enjoy your food</span>
          </div>

          <div className="ml-7">
            {cartDetails.map((item, index) => (
              <div key={index} className="mb-1 border-b py-2">
                <div className="flex space-x-4">
                  <div>
                    <img
                      className="w-[50px] inline-block"
                      src={item.image}
                      alt="item"
                    />
                  </div>
                  <div>
                    <p className="text-[#260F08] text-xs font-medium">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 relative">
                      <span className="text-sm text-[#C73B0F]">
                        {cartItem[index]}x
                      </span>
                      <span className="text-xs text-[#87635A]">@ ${price}</span>
                      <span className="text-xs font-medium text-[#87635A] ml-[420px]">
                        ${(item.price * (cartItem[index] || 0)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm">Order Total</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <button className="mb-4 w-[70%] ml-[80px] rounded-[30px] bg-[#C73B0F] text-white py-2 font-medium hover:bg-[#b83509] transition">
            Start New order
          </button>
        </div>
      )}

      <div className="w-[25%] bg-white h-[28%] rounded-lg">
        <div className="mt-2 ml-3">
          <h2 className="text-[#C73B0F] font-semibold">
            Your Cart ({totalItems})
          </h2>
        </div>

        {cartDetails.length === 0 && <EmptyCart />}

        {cartDetails.length > 0 && (
          <div>
            {cartDetails.map((item, index) => (
              <div key={index} className="mb-1 border-b py-2">
                <p className="text-[#260F08] text-xs font-medium">
                  {item.name}
                </p>
                <div className="flex items-center gap-2 relative">
                  <span className="text-sm text-[#C73B0F]">
                    {cartItem[index]}x
                  </span>
                  <span className="text-xs text-[#87635A]">@ ${price}</span>
                  <span className="text-xs font-medium text-[#87635A]">
                    ${item.price * (cartItem[index] || 0)}
                  </span>
                  <button
                    onClick={() => removeItem(item.name, index)}
                    className="border rounded-lg border-[#AD8A85] absolute right-2 bottom-3"
                  >
                    <img
                      className="w-full"
                      src="/icon-remove-item.svg"
                      alt="remove"
                    />
                  </button>
                </div>
              </div>
            ))}

            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm">Order Total</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
              <div className="flex bg-[#FCF8F6] items-center justify-center text-green-600 text-xs mb-4">
                <span className="mr-1">
                  <img src="/icon-carbon-neutral.svg" alt="carbon" />
                </span>
                <p className="text-[#260F08] text-xs">
                  This is a <span className="font-medium">carbon-neutral</span>{" "}
                  delivery
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
