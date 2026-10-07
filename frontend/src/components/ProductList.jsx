import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://https://shopease-ecommerce-wl99.onrender.com/api/products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <section className="product-list">
      <h2 className="product-list-title">
        Our Products
      </h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;