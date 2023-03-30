import React, { useEffect, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/config";

import spinner from "../../assets/spinner.jpg";
import styles from "./ProductModal.module.scss";
import { HiOutlineXCircle } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

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
  name: "",
  imgUrl: "",
  price: "",
  category: "",
  brand: "",
  description: "",
};

const ProductModal = ({
  setIsModalActive,
  modalAction,
  editingProductId,
  getData,
}) => {
  const productsData = useSelector((state) => state.product.products);

  const [product, setProduct] = useState({ ...productObj });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImg, setUploadedImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const productEdit = productsData.find((item) => item.id === editingProductId);
  useEffect(() => {
    if (modalAction === "edit") {
      setProduct({
        ...productEdit,
      });
    } else {
      setProduct({
        ...productObj,
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e) => {
    if (product.imgUrl !== "") {
      const storageRef = ref(storage, product.imgUrl);
      deleteObject(storageRef);
    }

    const file = e.target.files[0];

    const imgRef = ref(storage, `eCommerce/${file.name}_${Date.now()}`);
    const uploadTask = uploadBytesResumable(imgRef, file);

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
          setProduct((prev) => ({ ...prev, imgUrl: downloadURL }));
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
        name: product.name,
        imgUrl: product.imgUrl,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        description: product.description,
        createdAt: new Date().toString(),
      });
      setProduct({
        ...productObj,
      });
      getData();
      setLoading(false);
      setUploadProgress(0);
      setIsModalActive(false);
      toast.success("Product added to database");
    } catch (err) {
      toast.error(err.message);
    }
  };
  const editProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (product.imgUrl !== productEdit.imgUrl) {
      const storageRef = ref(storage, productEdit.imgUrl);
      deleteObject(storageRef);
    }
    try {
      setDoc(doc(firestore, "products", editingProductId), {
        name: product.name,
        imgUrl: product.imgUrl,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        description: product.description,
        createdAt: product.createdAt,
        editedAt: new Date().toString(),
      });

      setProduct({
        ...productObj,
      });
      getData();
      setLoading(false);
      setUploadProgress(0);
      setIsModalActive(false);
      toast.success("Product successfuly edited");
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  console.log(product);

  const handleCancel = () => {
    if (modalAction === "add" && uploadedImg) {
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
  };

  return (
    <div role="dialog" className={styles.product}>
      <ToastContainer />
      <div className={styles.overlay}></div>
      <div className={styles.card}>
        <div className={styles["modal-header"]}>
          <h3>{modalAction === "add" ? "Add new product" : "Edit product"}</h3>
          <button className="--btn" onClick={handleCancel}>
            <HiOutlineXCircle size={40} color="#333" />
          </button>
        </div>
        <form
          onSubmit={
            modalAction === "add" ? (e) => addProduct(e) : (e) => editProduct(e)
          }
        >
          <fieldset>
            <label htmlFor="name">Product name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={product.name}
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
              {product.imgUrl !== "" && (
                <input
                  type="text"
                  name="imgUrl"
                  id="imgUrl"
                  placeholder="Image URL"
                  disabled
                  value={product.imgUrl}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              )}
            </div>
          </fieldset>
          <fieldset>
            <label htmlFor="price">Product price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={product.price}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="category">Product category</label>
            <select
              name="category"
              id="category"
              value={product.category}
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
            <label htmlFor="brand">Product brand</label>
            <input
              type="text"
              name="brand"
              id="brand"
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="description">Product description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              value={product.description}
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

export default ProductModal;
