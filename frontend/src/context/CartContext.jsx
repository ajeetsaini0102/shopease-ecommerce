import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username");
  });

  const [cart, setCart] = useState(() => {
    const currentUser = localStorage.getItem("username");

    if (!currentUser) {
      return [];
    }

    const savedCart = localStorage.getItem(
      `cart_${currentUser}`
    );

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Login / Logout detect karega
  useEffect(() => {
    const syncUser = () => {
      const currentUser = localStorage.getItem("username");

      setUsername(currentUser);
    };

    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  // User change hone par us user ka cart load hoga
  useEffect(() => {
    if (!username) {
      setCart([]);
      return;
    }

    const savedCart = localStorage.getItem(
      `cart_${username}`
    );

    setCart(
      savedCart ? JSON.parse(savedCart) : []
    );
  }, [username]);

  // Cart change hone par current user ke cart me save hoga
  useEffect(() => {
    if (!username) {
      return;
    }

    localStorage.setItem(
      `cart_${username}`,
      JSON.stringify(cart)
    );
  }, [cart, username]);

  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(
      cart.filter((item) => item.id !== id)
    );
  };

  // Ye sirf current logged-in user ka cart delete karega
  const clearCart = () => {
    setCart([]);

    if (username) {
      localStorage.removeItem(
        `cart_${username}`
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;