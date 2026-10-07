import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://https://shopease-ecommerce-wl99.onrender.com/api/products/${id}/`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

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
    <div className="product-details">
      <div className="product-details-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-details-info">
        <h1>{product.name}</h1>

        <p className="product-details-description">
          {product.description}
        </p>

        <h2>₹{product.price}</h2>

        <p>
          <strong>Stock:</strong> {product.stock}
        </p>

        <button onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;