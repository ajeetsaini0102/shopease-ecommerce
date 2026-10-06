import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

 const handleAddToCart = () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    alert("Please login first to add products to cart.");
    return;
  }

  addToCart(product);
  alert(`${product.name} added to cart successfully!`);
};

  return (
    <div className="product-card">
      <Link
        to={`/products/${product.id}`}
        className="product-details-link"
      >
        <div className="product-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="product-info">
          <h3>{product.name}</h3>

          <p>{product.description}</p>

          <div className="product-price">
            ₹{product.price}
          </div>
        </div>
      </Link>

      <div className="product-info">
        <button
          className="product-button"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;