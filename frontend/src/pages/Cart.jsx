import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";
import { Link } from "react-router-dom";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const totalPrice = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <div className="cart-page">
      <h1 className="cart-title">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">
          Your cart is currently empty.
        </p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((product) => (
              <div className="cart-item" key={product.id}>
                <img
                  className="cart-item-image"
                  src={product.image}
                  alt={product.name}
                />

                <div className="cart-item-info">
                  <h3>{product.name}</h3>

                  <p>{product.description}</p>

                  <div className="cart-item-price">
                    ₹{product.price}
                  </div>

                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        decreaseQuantity(product.id)
                      }
                    >
                      -
                    </button>

                    <span>{product.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQuantity(product.id)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(product.id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h2>Total: ₹{totalPrice}</h2>

            <Link
              to="/checkout"
              className="checkout-button"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;