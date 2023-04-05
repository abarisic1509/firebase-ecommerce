import React from "react";
import "./Cart.module.scss";
import { useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";

import styles from "./Cart.module.scss";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);
  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping cart</h2>

        {cartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty</p>
            <br />
            <Link to="/" className="--btn --btn-danger">
              Back to shop
            </Link>
          </>
        ) : (
          <table>
            <thead>
              <tr>
                <td>s/n</td>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
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
                  <td>{item.price}</td>
                  <td>{item.count}</td>
                  <td>{item.price * item.count}</td>
                  <td>
                    <button>
                      <FaTrashAlt color="red" size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Cart;
