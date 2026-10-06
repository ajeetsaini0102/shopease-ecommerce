import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <h2>Welcome to ShopEase</h2>

      <p>
        Discover amazing products at great prices.
      </p>

      <Link to="/products" className="hero-button">
        Shop Now
      </Link>
    </section>
  );
}

export default Hero;