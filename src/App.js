import ProductList from "./components/ProductList";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <div>
        <ProductList />
      </div>
    </CartProvider>
  );
}

export default App;