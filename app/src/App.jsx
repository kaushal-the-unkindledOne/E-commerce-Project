import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pagess/Home.jsx";
import Header from "./componenets/Header.jsx";
import Products from "./pagess/Products.jsx";
import Login from "./pagess/Login.jsx";
import Register from "./pagess/Register.jsx";
import Verify from "./pagess/verify.jsx";
import { UserData } from "./context/UserContext.jsx";
import Loader from "./componenets/Loader.jsx";
import Account from "./pagess/Account.jsx";
import ProductDetails from "./pagess/ProductDetails.jsx";
import Cart from "./pagess/Cart.jsx";
import CheckOut from "./pagess/CheckOut.jsx";
import Payment from "./pagess/Payment.jsx";
import OrderSuccess from "./pagess/OrderSuccess.jsx";
import Orders from "./pagess/Orders.jsx";
import OrderPage from "./pagess/OrderPage.jsx";
import DashBoard from "./admin/DashBoard.jsx";

const App = () => {
  const { loading, isAuth, user } = UserData();
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} />
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Login />}
            />
            <Route
              path="/checkout"
              element={isAuth ? <CheckOut /> : <Login />}
            />
            <Route
              path="/payment/:id"
              element={isAuth ? <Payment /> : <Login />}
            />
            <Route
              path="/ordersuccess"
              element={isAuth ? <OrderSuccess /> : <Login />}
            />
            <Route
              path="/order/:id"
              element={isAuth ? <OrderPage /> : <Login />}
            />
            <Route
              path="/admin/dashboard"
              element={isAuth ? <DashBoard user={user} /> : <Login />}
            />
            <Route path="/orders" element={isAuth ? <Orders /> : <Login />} />
            <Route path="/cart" element={isAuth ? <Cart /> : <Login />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route path="/verify/" element={isAuth ? <Home /> : <Verify />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
