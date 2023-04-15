import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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

function App() {
  let [currentUser, setCurrentUser] = useState(null);
  //this function will decode the user token
  // we want to call this function when the user log in
  const getUserData = async () => {
    //decode user token
    let token = localStorage.getItem("token");
    let decoded = jwt_decode(token);
    setCurrentUser(decoded);
  };

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "productDeatils/:id", element: <ProductDetails /> },
        { path: "brands", element: <Brands /> },
        { path: "brandProducts/:id", element: <BrandProducts /> },
        { path: "login", element: <Login getUserData={getUserData} /> },
        { path: "register", element: <Register /> },
        { path: "profile", element: <Profile /> },
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
  return (
    <>
      <div className="App">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}

export default App;
