import "./App.css";
import {
  BrowserRouter,
  Link,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
  useNavigate,
} from "react-router-dom";
import Home from "./components/home/Home.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import Layout from "./components/layout/Layout";
import error from "./images/error.svg";
import Brands from "./components/brands/Brands";
import ProductDetails from "./components/productDeatils/ProductDetails";
import BrandProducts from "./components/brandProducts/BrandProducts";
import Profile from "./components/profile/Profile";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import Cart from "./components/cart/Cart";
import CartContextProvider from "./context/CartContext";
import Payment from "./components/payment/Payment";
import AllOrders from "./components/allOrders/AllOrders";
import { Offline, Online } from "react-detect-offline";

function App() {
  let [currentUser, setCurrentUser] = useState(null);

  // let navigate = useNavigate();
  //this function will decode the user token
  // we want to call this function when the user log in
  const getUserData = async () => {
    //decode user token
    let token = localStorage.getItem("token");
    let decoded = jwt_decode(token);
    setCurrentUser(decoded);
  };

  const clearUserData = async () => {
    //when the user log out, we need to clear their data and the localStorage
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  // create a functional component to use for nested protected routes
  function ProtectedRoutes({ children }) {
    if (currentUser == null) {
      return (
        // (window.location.href = "/login");
        // window.location.assign("/login")
        <Navigate to="/login" replace={true} />
      );
    } else {
      console.log(currentUser);

      return <>{children}</>;
    }
  }
  const router = createHashRouter([
    {
      path: "",
      element: (
        <Layout currentUser={currentUser} clearUserData={clearUserData} />
      ),
      children: [
        // { path: "", element: <Home /> },
        {
          path: "home",
          element: (
            <CartContextProvider>
              <Home />
            </CartContextProvider>
          ),
        },
        {
          path: "productDeatils/:id",
          element: (
            // <ProtectedRoutes>
            <CartContextProvider>
              <ProductDetails />
            </CartContextProvider>
            // </ProtectedRoutes>
          ),
        },
        { path: "brands", element: <Brands /> },
        {
          path: "brandProducts/:id",
          element: (
            <ProtectedRoutes>
              <CartContextProvider>
                <BrandProducts />
              </CartContextProvider>
            </ProtectedRoutes>
          ),
        },
        { path: "login", element: <Login getUserData={getUserData} /> },
        { path: "register", element: <Register /> },
        {
          path: "profile",
          element: (
            <ProtectedRoutes>
              <CartContextProvider>
                {" "}
                <Profile currentUser={currentUser} />
              </CartContextProvider>
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <CartContextProvider>
                <Cart currentUser={currentUser} />
              </CartContextProvider>
            </ProtectedRoutes>
          ),
        },
        {
          path: "payment",
          element: (
            <ProtectedRoutes>
              <CartContextProvider>
                <Payment />
              </CartContextProvider>
            </ProtectedRoutes>
          ),
        },
        {
          path: "allOrders",
          element: (
            <ProtectedRoutes>
              <AllOrders currentUser={currentUser} />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/*",
          element: (
            <div className="d-flex justify-content-center">
              <img className="" src={error} alt="404-error" />
            </div>
          ),
        },
      ],
    },
  ]);

  useEffect(() => {
    // if the token is stored and the currentUser is null
    if (localStorage.getItem("token") != null && currentUser == null) {
      getUserData();
    }
  }, [currentUser]);
  return (
    <>
      <Offline>
        <div className="alert alert-danger text-center">
          <h4>You are offline Now</h4>
        </div>
      </Offline>
      {/* <Online> */}{" "}
      <div className="App">
        <RouterProvider router={router}></RouterProvider>
      </div>
      {/* </Online> */}
    </>
  );
}

export default App;
