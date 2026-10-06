import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div>
        <h3>ShopEase</h3>
        <p>Your trusted online shopping store.</p>
      </div>

      <div className="footer-links">
        <h4>Quick Links</h4>

        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/cart">Cart</a>
      </div>

      <div className="footer-contact">
        <h4>Contact</h4>

        <p>Email: support@shopease.com</p>
        <p>Phone: +91 9876543210</p>
      </div>

    </footer>
  );
}

export default Footer;