import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import Layout from "./components/layout/Layout";
import error from "./images/error.svg";
import Brands from "./components/brands/Brands";
import ProductDetails from "./components/productDeatils/ProductDetails";
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "productDeatils/:id", element: <ProductDetails /> },
        { path: "brands", element: <Brands /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
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
