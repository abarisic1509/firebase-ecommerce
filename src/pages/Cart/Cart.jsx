import React from "react";
import "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";

import styles from "./Cart.module.scss";
import {
  clearCart,
  decreaseCount,
  deleteFromCart,
  increaseCount,
} from "../../redux/features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { setRedirectPath } from "../../redux/features/authSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const handleCheckout = () => {
    if (!isLoggedIn) {
      dispatch(setRedirectPath("/checkout"));
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };
  //console.log(cartItems);
  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping cart</h2>

        {cartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty</p>
            <br />
            <Link
              to="/"
              className="--btn --btn-danger"
              style={{ width: "fit-content" }}
            >
              Back to shop
            </Link>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <td>s/n</td>
                  <td>Product</td>
                  <td>Price</td>
                  <td style={{ textAlign: "center" }}>Quantity</td>
                  <td>Total</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <h4>{item.name}</h4>
                      <img src={item.imgUrl} alt={item.name} width={100} />
                    </td>
                    <td>{item.price.toFixed(2)}</td>
                    <td
                      className={styles.count}
                      style={{ textAlign: "center" }}
                    >
                      <button onClick={() => dispatch(decreaseCount(item))}>
                        -
                      </button>
                      <span>{item.count}</span>
                      <button onClick={() => dispatch(increaseCount(item))}>
                        +
                      </button>
                    </td>
                    <td>{(item.price * item.count).toFixed(2)}</td>
                    <td>
                      <button>
                        <FaTrashAlt
                          color="red"
                          size={20}
                          onClick={() => dispatch(deleteFromCart(item))}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button
                className="--btn --btn-danger"
                disabled={cartItems.length === 0}
                onClick={() => dispatch(clearCart())}
              >
                Clear cart
              </button>

              <div className={styles.checkout}>
                <div>
                  <Link to="/">&larr; Back to shop</Link>
                </div>
                <div className={styles.card}>
                  <p>Cart items: {totalQuantity}</p>
                  <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3> ${totalPrice.toFixed(2)}</h3>
                  </div>
                  <p>Taxes and shipping calculated at checkout</p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="--btn --btn-primary"
                  style={{ marginTop: "1rem" }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
