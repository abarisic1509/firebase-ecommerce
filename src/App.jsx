import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "./firebase/config";
import { useDispatch, useSelector } from "react-redux";

import "./App.scss";
import {
  AdminOnlyRoute,
  Footer,
  Header,
  Loader,
  LoggedInOnlyRoute,
} from "./components";
import { Admin, Cart, Checkout, Contact, Home, Login, Orders } from "./pages";
import { removeActiveUser, setActiveUser } from "./redux/features/authSlice";
import { storeProduct } from "./redux/features/productSlice";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import ProductDetails from "./components/Product/ProductDetails/ProductDetails";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  //get data
  useEffect(() => {
    let isDataFetching = true;

    if (isDataFetching) {
      getData();
    }

    return () => {
      isDataFetching = false;
    };
  }, [dispatch]);

  //check auth
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setActiveUser({
            userEmail: user.email,
            userName: user.displayName,
            userId: user.uid,
          })
        );
      } else {
        dispatch(removeActiveUser());
      }
    });
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const productsRef = collection(firestore, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);
      const allProducts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        //const { createdAt, ...product } = data; // remove createdAt property
        return {
          id: doc.id,
          ...data,
        };
      });
      dispatch(storeProduct({ allProducts }));
    } catch (err) {
      toast.error("Something went wrong, please refresh the page");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrowserRouter>
      {loading && <Loader />}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin/*"
          element={
            <AdminOnlyRoute>
              <Admin getData={getData} />
            </AdminOnlyRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <LoggedInOnlyRoute>
              <Checkout />
            </LoggedInOnlyRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
