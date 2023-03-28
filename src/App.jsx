import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "./App.scss";
import { Footer, Header } from "./components";
import { Admin, Cart, Contact, Home, Login, Orders } from "./pages";
import { auth } from "./firebase/config";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
