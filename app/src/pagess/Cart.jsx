import { Button, Container, Table } from "react-bootstrap";
import { CartData } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../main";
import { IoBagCheckOutline } from "react-icons/io5";
import { RiDeleteBinFill } from "react-icons/ri";
import "../styles/Cart.css";

const Cart = () => {
  const { cart, subTotal, updateCart, removeFromCart } = CartData();

  const updateCartHandler = async (action, id) => {
    await updateCart(action, id);
  };
  const navigate = useNavigate();

  return (
    <Container className="cart-container">
      <h2 className="cart-title mt-4 mb-3">Shopping Bag</h2>
      {cart && cart.length > 0 ? (
        <div className="cart-content">
          <div className="cart-items">
            <Table className="cart-table" striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((e, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td className="product-details">
                      <Link to={`/product/${e.product._id}`}>
                        <img
                          src={`${server}/${e.product.image}`}
                          className="product-image"
                          alt={e.product.title}
                        />
                      </Link>
                      <div className="product-info">
                        <span className="product-name">{e.product.title}</span>
                      </div>
                    </td>
                    <td>₹{e.product.price}</td>
                    <td>
                      <Button
                        onClick={() => updateCartHandler("dec", e._id)}
                        className="mx-2"
                      >
                        -
                      </Button>
                      {e.quantity}
                      <Button
                        onClick={() => updateCartHandler("inc", e._id)}
                        className="mx-2"
                      >
                        +
                      </Button>
                    </td>
                    <td>₹{e.product.price * e.quantity}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => removeFromCart(e._id)}
                      >
                        <RiDeleteBinFill />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="cart-summary">
            <div className="summary-box">
              <h4>Sub Total</h4>

              <p className="total-price">Total Price to be Paid: ₹{subTotal}</p>
              <Button variant="primary" className="checkout-button"
              onClick={() => navigate("/checkout")}>
                Checkout <IoBagCheckOutline />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p>No Items in Cart</p>
      )}
    </Container>
  );
};

export default Cart;
