import React, { useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firestore, storage } from "../../firebase/config";

import spinner from "../../assets/spinner.jpg";
import styles from "./AddProductModal.module.scss";
import { HiOutlineXCircle } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categories = [
  {
    id: 1,
    name: "Laptops",
  },
  {
    id: 2,
    name: "Electronics",
  },
  {
    id: 3,
    name: "Fashion",
  },
  {
    id: 4,
    name: "Phone",
  },
];

const productObj = {
  productName: "",
  productImgUrl: "",
  productPrice: "",
  productCategory: "",
  productBrand: "",
  productDescription: "",
};

const AddProductModal = ({ setIsModalActive }) => {
  const [product, setProduct] = useState({
    ...productObj,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImg, setUploadedImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const imgRef = ref(storage, `eCommerce/${file.name}_${Date.now()}`);
    const uploadTask = uploadBytesResumable(imgRef, file);
    console.log(imgRef);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error("Uh-oh, something went wrong, please try again");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct((prev) => ({ ...prev, productImgUrl: downloadURL }));
          toast.success("Upload successful");
          setUploadedImg(imgRef);
        });
      }
    );
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = await addDoc(collection(firestore, "products"), {
        name: product.productName,
        imgUrl: product.productImgUrl,
        price: Number(product.productPrice),
        category: product.productCategory,
        brand: product.productBrand,
        description: product.productDescription,
        createdAt: Timestamp.now().toDate(),
      });
      setProduct({
        ...productObj,
      });
      setLoading(false);
      setUploadProgress(0);
      setIsModalActive(false);
      toast.success("Product added to database");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCancel = () => {
    if (uploadedImg) {
      deleteObject(uploadedImg)
        .then(() => {
          toast.info("Image deleted");
        })
        .catch((error) => {
          toast.error("Uh-oh, something went wrong, please try again");
        });
    }
    setProduct({
      ...productObj,
    });
    setIsModalActive(false);
    setLoading(false);
    setUploadProgress(0);
    toast.info("Product adding canceled");
  };

  console.log(product);
  return (
    <div role="dialog" className={styles.product}>
      <ToastContainer />
      <div className={styles.overlay}></div>
      <div className={styles.card}>
        <div className={styles["modal-header"]}>
          <h3>Add new product</h3>
          <button className="--btn" onClick={handleCancel}>
            <HiOutlineXCircle size={40} color="#333" />
          </button>
        </div>
        <form onSubmit={(e) => addProduct(e)}>
          <fieldset>
            <label htmlFor="productName">Product name</label>
            <input
              type="text"
              name="productName"
              id="productName"
              value={product.productName}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="productImg">Product image</label>
            <div className={styles.group}>
              {uploadProgress > 0 && (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100 ? "Uploading..." : "Upload complete"}
                  </div>
                </div>
              )}
              <input
                type="file"
                name="productImg"
                id="productImg"
                onChange={(e) => handleImageChange(e)}
              />
              {product.productImgUrl !== "" && (
                <input
                  type="text"
                  name="productImgUrl"
                  id="productImgUrl"
                  placeholder="Image URL"
                  disabled
                  value={product.productImgUrl}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              )}
            </div>
          </fieldset>
          <fieldset>
            <label htmlFor="productPrice">Product price</label>
            <input
              type="number"
              name="productPrice"
              id="productPrice"
              value={product.productPrice}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="productCategory">Product category</label>
            <select
              name="productCategory"
              id="productCategory"
              value={product.productCategory}
              onChange={(e) => handleInputChange(e)}
              required
            >
              <option value="">-- Choose --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="productBrand">Product brand</label>
            <input
              type="text"
              name="productBrand"
              id="productBrand"
              value={product.productBrand}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="productDescription">Product description</label>
            <textarea
              name="productDescription"
              id="productDescription"
              cols="30"
              rows="10"
              value={product.productDescription}
              onChange={(e) => handleInputChange(e)}
              required
            ></textarea>
          </fieldset>
          <button
            className="--btn --btn-primary"
            disabled={loading ? true : false}
          >
            {loading && <img src={spinner} width="32" />}
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
