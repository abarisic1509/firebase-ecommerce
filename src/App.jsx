import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useDispatch, useSelector } from "react-redux";

import "./App.scss";
import { AdminOnlyRoute, Footer, Header } from "./components";
import { Admin, Cart, Contact, Home, Login, Orders } from "./pages";
import { removeActiveUser, setActiveUser } from "./redux/features/authSlice";

function App() {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.userEmail);

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

  return (
    <BrowserRouter>
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
              {" "}
              <Admin />
            </AdminOnlyRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
