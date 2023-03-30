import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  getDocs,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { AddProductModal, Loader } from "../../../components";

import styles from "./Products.module.scss";
import { firestore, storage } from "../../../firebase/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteObject, ref } from "firebase/storage";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import { useDispatch, useSelector } from "react-redux";
import { storeProduct } from "../../../redux/features/productSlice";

const Products = () => {
  //const [productsData, setProductsData] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.product.products);

  useEffect(() => {
    let isDataFetching = true;
    setLoading(true);

    if (isDataFetching) {
      getData();
    }
    setLoading(false);

    return () => {
      isDataFetching = false;
    };
  }, []);

  const getData = async () => {
    try {
      const productsRef = collection(firestore, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);
      const allProducts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const { createdAt, ...product } = data; // remove createdAt property
        return {
          id: doc.id,
          ...product,
        };
      });
      dispatch(storeProduct({ allProducts }));
    } catch (err) {
      toast.error("Something went wrong, please refresh the page");
      console.log(err);
    }
  };

  const deleteProduct = (id, imgUrl) => {
    console.log(id, imgUrl);
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
        // etc...
      }
    );
  };

  console.log(productsData);
  return (
    <div className={styles.products}>
      {loading && <Loader />}
      <ToastContainer />
      <button
        className="--btn --btn-danger"
        onClick={() => setIsModalActive(true)}
        style={{ marginLeft: "auto" }}
      >
        Add new product
      </button>

      <div className={styles.table}>
        <h2>All products</h2>
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
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={product.imgUrl}
                        alt={product.name}
                        width="100"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{`$${product.price}`}</td>
                    <td className={styles.icons}>
                      <button>
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

      {isModalActive && <AddProductModal setIsModalActive={setIsModalActive} />}
    </div>
  );
};

export default Products;
