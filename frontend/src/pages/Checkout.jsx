import { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce(
    (total, product) =>
      total + Number(product.price) * product.quantity,
    0
  );

  const handlePayment = async (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    setLoading(true);
    setMessage("");

    // Customer details ko pehle save kar rahe hain
    const customerData = {
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      address: event.target.address.value,
    };

    try {
      // Django se Razorpay order create karna
      const response = await axios.post(
        "http://https://shopease-ecommerce-wl99.onrender.com/api/payment/create-order/",
        {
          amount: totalPrice,
        }
      );

      const order = response.data;

      // Razorpay Checkout options
      const options = {
        key: order.key,

        amount: order.amount,

        currency: order.currency,

        name: "ShopEase",

        description: "ShopEase Order",

        order_id: order.id,

        handler: async function (paymentResponse) {
          try {
            // Payment ko Django par verify karna
            const verifyResponse = await axios.post(
              "http://https://shopease-ecommerce-wl99.onrender.com/api/payment/verify/",
              {
                razorpay_payment_id:
                  paymentResponse.razorpay_payment_id,

                razorpay_order_id:
                  paymentResponse.razorpay_order_id,

                razorpay_signature:
                  paymentResponse.razorpay_signature,

                // Customer details
                name: customerData.name,

                email: customerData.email,

                phone: customerData.phone,

                address: customerData.address,

                // Cart items
                items: cart.map((product) => ({
                  id: product.id,
                  quantity: product.quantity,
                  price: product.price,
                })),
              }
            );

            console.log(
              "VERIFY RESPONSE:",
              verifyResponse.data
            );

            if (verifyResponse.data.success) {
              // Email ko localStorage me save karna
              localStorage.setItem(
                "email",
                customerData.email
              );

              setMessage(
                `Payment successful! Order #${verifyResponse.data.order_id} placed successfully.`
              );

              // Cart clear
              clearCart();
            }
          } catch (error) {
            console.error(
              "Payment verification error:",
              error
            );

            setMessage(
              "Payment verification failed."
            );
          } finally {
            setLoading(false);
          }
        },

        prefill: {
          name: customerData.name,
          email: customerData.email,
          contact: customerData.phone,
        },

        theme: {
          color: "#111827",
        },
      };

      // Razorpay open
      const razorpay = new window.Razorpay(options);

      razorpay.open();

      // Payment failed
      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Payment failed:",
            response.error
          );

          setMessage(
            "Payment failed. Please try again."
          );

          setLoading(false);
        }
      );
    } catch (error) {
      console.error(
        "Create Razorpay order error:",
        error
      );

      setMessage(
        "Unable to start payment. Please try again."
      );

      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">

      <h1>Checkout</h1>

      <form
        className="checkout-form"
        onSubmit={handlePayment}
      >

        {/* Customer Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
        />

        {/* Address */}
        <textarea
          name="address"
          placeholder="Address"
          required
        ></textarea>

        {/* Order Summary */}
        <div className="order-summary">

          <h2>Order Summary</h2>

          {cart.map((product) => (
            <div
              key={product.id}
              className="summary-item"
            >
              <span>
                {product.name} × {product.quantity}
              </span>

              <span>
                ₹
                {Number(product.price) *
                  product.quantity}
              </span>
            </div>
          ))}

          <h3>
            Total: ₹{totalPrice}
          </h3>

        </div>

        {/* Pay Button */}
        <button
          type="submit"
          disabled={
            loading || cart.length === 0
          }
        >
          {loading
            ? "Processing..."
            : `Pay ₹${totalPrice}`}
        </button>

        {/* Message */}
        {message && (
          <p className="checkout-message">
            {message}
          </p>
        )}

      </form>
    </div>
  );
}

export default Checkout;