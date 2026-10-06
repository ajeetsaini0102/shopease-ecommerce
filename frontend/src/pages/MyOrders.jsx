import { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (!email) {
      setMessage("Please place an order first.");
      return;
    }

    axios
      .get(
        `http://127.0.0.1:8000/api/my-orders/?email=${email}`
      )
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Unable to load orders.");
      });
  }, []);

  return (
    <div className="my-orders-page">

      <h1>My Orders</h1>

      {message && (
        <p className="my-orders-message">
          {message}
        </p>
      )}

      {orders.length === 0 && !message ? (
        <p className="my-orders-message">
          No orders found.
        </p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="order-card"
          >

            <h2>
              Order #{order.id}
            </h2>

            <p>
              <strong>Name:</strong>{" "}
              {order.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {order.email}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {order.address}
            </p>

            <h3>
              Products
            </h3>

            {order.items.map((item) => (
              <div
                key={item.product}
                className="order-product"
              >
                <p>
                  Product ID: {item.product}
                </p>

                <p>
                  Quantity: {item.quantity}
                </p>

                <p>
                  Price: ₹{item.price}
                </p>
              </div>
            ))}

            <p className="order-total">
              <strong>
                Total: ₹{order.total_price}
              </strong>
            </p>

          </div>
        ))
      )}

    </div>
  );
}

export default MyOrders;