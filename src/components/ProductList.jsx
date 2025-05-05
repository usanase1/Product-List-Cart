import React, { useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductCard from "./ProductCard";
import Header from "./Header";
import Cart from "./Cart";
import OrderModal from "./OrderModal";

export default function ProductList() {
  const { products, setProducts, confirmed } = useContext(CartContext);

  
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

  return (
    <div className="flex justify-between ml-10 mr-3 mt-8">
     
      <div
        className={`w-[73%] ${confirmed ? "opacity-50 pointer-events-none" : ""}`}
      >
        <Header />
        <div className="grid grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </div>

     
      <OrderModal />

     
      <Cart />
    </div>
  );
}