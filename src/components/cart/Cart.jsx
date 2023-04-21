import React, { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import $ from "jquery";

export default function Cart({ currentUser }) {
  const {
    cartProducts,
    numberOfCartItems,
    totalCartPrice,
    deleteProductFromCart,
  } = useContext(cartContext);

  const deleteProductFromUserCart = async (productId) => {
    deleteProductFromCart(productId);
    const result = deleteProductFromCart(productId);
    if (await result) {
      $(`#deleteProductInCartMsg${productId}`).fadeIn(4000, () => {
        setTimeout(() => {
          $(`#deleteProductInCartMsg${productId}`).fadeOut(3000);
          $(`#deleteButton${productId}`).hide();
        });
      });
    } else {
      console.log("nothing to remove!!");
    }
  };
  return (
    <>
      {cartProducts == null ? (
        <LoadingScreen />
      ) : (
        <div className="container py-5 text-center">
          <h2 className="text-center">{currentUser.name}' Cart</h2>
          <h3>
            Total price:<span className="text-primary"> ${totalCartPrice}</span>
          </h3>
          <div className="row">
            {cartProducts.map((product, index) => (
              <div className="col-md-3 ">
                <div className="product bg-light" key={index}>
                  <img
                    className="w-50"
                    src={product.product.imageCover}
                    alt={product.product.title}
                  />
                  <h2 className="w-100">
                    Title:{product.product.title.slice(0, 10)}
                  </h2>
                  <h5>Count {product.count}</h5>
                  <h5>Price: {product.price}</h5>
                  <button
                    id={`deleteButton${product._id}`}
                    className="deleteButton btn btn-danger m-4"
                    onClick={() =>
                      deleteProductFromUserCart(product.product._id)
                    }
                  >
                    Remove
                  </button>
                  <div
                    style={{ display: "none" }}
                    id={`deleteProductInCartMsg${product.title}`}
                    className="alert alert-danger text-center w-100"
                  >
                    The product has been removed from you cart!
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
