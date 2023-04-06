import React from "react";

import styles from "./Checkout.module.scss";
import { useSelector } from "react-redux";

const CheckoutDetails = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  return (
    <section>
      <div className={styles.checkout}>
        <h2>Checkout details</h2>

        <form>
          <div className={styles.card}>
            <h3>Billing address</h3>
            <label htmlFor="fullName">Full name</label>
            <input
              type="text"
              placeholder="Your full name"
              name="fullName"
              required
            />
            <label htmlFor="phoneNum">Phone number</label>
            <input
              type="tel"
              placeholder="Your Phone number"
              name="phoneNum"
              required
            />
            <label htmlFor="address1">Address 1</label>
            <input
              type="text"
              placeholder="Your address"
              name="address1"
              required
            />
            <label htmlFor="address2">Address 2</label>
            <input type="text" placeholder="Your address" name="address2" />
            <label htmlFor="city">City</label>
            <input type="text" placeholder="City" name="city" required />
            <label htmlFor="state">State</label>
            <input type="text" placeholder="State" name="state" required />
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              placeholder="Postal Code"
              name="postalCode"
              required
            />
            <label htmlFor="country">Country</label>
            <input type="text" placeholder="Country" name="country" required />

            <label htmlFor="sameAsShippingAdress">
              <input
                type="checkbox"
                name="sameAsShippingAdress"
                id="sameAsShippingAdress"
                checked
              />
              <span>Same as shipping adress</span>
            </label>
          </div>

          <div className={styles.card}>
            <h3>Checkout summary</h3>

            <div>
              <p>Cart items: {totalQuantity}</p>
              <div className={styles.text}>
                <h4>Subtotal:</h4>
                <h3> ${totalPrice.toFixed(2)}</h3>
              </div>
              {cartItems.map((item) => {
                const { id, name, price, count } = item;

                return (
                  <div className={styles.card} key={id}>
                    <h4>Product: {name}</h4>
                    <p>Quantity: {count}</p>
                    <p>Unit price: {price.toFixed(2)}</p>
                    <p>Total price: {(price * count).toFixed(2)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
