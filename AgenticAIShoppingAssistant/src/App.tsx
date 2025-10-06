import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import AssistantChat from "./components/AssistantChat";
import { Product } from "./helpers/types";

const ProductCard = ({ product }: { product: Product }) => (
  <div className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition bg-white">
    <img src={product.image} alt={product.title} className="h-32 mx-auto mb-2 object-contain" />
    <h3 className="text-md font-semibold line-clamp-2">{product.title}</h3>
    <p className="text-sm text-gray-600">${product.price}</p>
    <p className="text-yellow-600">⭐ {product.rating.rate}</p>
    <Link
      to={`/product/${product.id}`}
      target="_blank" 
      rel="noopener noreferrer"
      className="mt-1 inline-block text-blue-600 text-sm hover:underline">
      View Details →
    </Link>
  </div>
);

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading products...</p>;

  return (
    <Routes>
      <Route path="/" element={
          <div className="grid grid-cols-3 gap-4 h-screen">
            <div className="col-span-2 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
            <div className="col-span-1 border-l">
              <AssistantChat />
            </div>
          </div>

        } />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
};

export default App;