import React, { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { Loader, ProductModal } from "../../../components";

import styles from "./Products.module.scss";
import { firestore, storage } from "../../../firebase/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteObject, ref } from "firebase/storage";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import { useSelector } from "react-redux";

const Products = ({ getData }) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [editingProductId, setEditingProductId] = useState("");

  const productsData = useSelector((state) => state.product.products);

  const deleteProduct = (id, imgUrl) => {
    //console.log(id, imgUrl);
    try {
      deleteDoc(doc(firestore, "products", id));

      const imageRef = ref(storage, imgUrl);
      deleteObject(imageRef);

      getData();

      toast.success("Product deleted");
    } catch (err) {
      toast.error("Something went wrong, please try again");
      console.log(err);
    }
  };
  const confirmDelete = (id, imgUrl) => {
    Confirm.show(
      "Deleting product!",
      "This action is permament and cannot be reversed",
      "Yes, delete",
      "No, cancel",
      function okCb() {
        deleteProduct(id, imgUrl);
      },
      function cancelCb() {
        toast.info("Delete canceled");
      },
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
      }
    );
  };

  const handleModal = (action, id) => {
    setIsModalActive(true);
    setModalAction(action);
    setEditingProductId(id);
  };

  // console.log(productsData);
  return (
    <div className={styles.products}>
      <ToastContainer />

      <div className={styles.table}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1.5rem",
            paddingBottom: "2rem",
          }}
        >
          <h2>All products</h2>
          <button
            className="--btn --btn-danger"
            onClick={() => handleModal("add")}
            style={{ marginLeft: "auto" }}
          >
            Add new product
          </button>
        </div>
        {productsData.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <td>s/n</td>
                <td>Image</td>
                <td>Name</td>
                <td>Category</td>
                <td>Price</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product, index) => {
                const { id, name, imgUrl, category, price } = product;
                //console.log(id);
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={imgUrl} alt={name} width="100" />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className={styles.icons}>
                      <button onClick={() => handleModal("edit", id)}>
                        <FaEdit size={20} color="green" />
                      </button>
                      &nbsp;
                      <button onClick={() => confirmDelete(id, imgUrl)}>
                        <FaTrashAlt size={20} color="red" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {isModalActive && (
        <ProductModal
          setIsModalActive={setIsModalActive}
          modalAction={modalAction}
          editingProductId={editingProductId}
          getData={getData}
        />
      )}
    </div>
  );
};

export default Products;
