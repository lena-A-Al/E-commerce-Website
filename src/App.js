import "./App.css";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
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

  // create a component to use for nested routes
  function Test({ children }) {
    return <>{currentUser && children}</>;
  }
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <Layout currentUser={currentUser} clearUserData={clearUserData} />
      ),
      children: [
        { path: "", element: <Home /> },
        { path: "home", element: <Home /> },
        {
          path: "productDeatils/:id",
          element: (
            <Test>
              <ProductDetails />
            </Test>
          ),
        },
        { path: "brands", element: <Brands /> },
        { path: "brandProducts/:id", element: <BrandProducts /> },
        { path: "login", element: <Login getUserData={getUserData} /> },
        { path: "register", element: <Register /> },
        { path: "profile", element: <Profile currentUser={currentUser} /> },
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
      <div className="App">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}

export default App;
