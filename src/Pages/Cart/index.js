import { useSelector } from "react-redux";
import store from "../../Redux/store";
import { removeItemFromCart, updateItemInCart } from "../../Redux/cartSlice";
import { useEffect } from "react";
import { useState } from "react";

export default function Cart() {
  const { items } = useSelector((state) => state.cart);

  const [total, setTotal] = useState(0);

  // Calculate total price
  useEffect(() => {
    let tempTotal = 0;
    items.forEach((item) => {
      tempTotal += item.price * item.quantity;
    });
    setTotal(tempTotal);
  }, [items]);

  return (
    <>
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-light table-borderless table-hover text-center mb-0">
              <thead className="thead-dark">
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {items.map((item, index) => (
                  <CartItem
                    key={index}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-lg-4">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Cart Summary</span>
            </h5>
            <div className="bg-light p-30 mb-5">
              <div className="pt-2">
                <div className="d-flex justify-content-between mt-2">
                  <h5>Total</h5>
                  <h5>${total}</h5>
                </div>
                <button
                  className="btn btn-block btn-primary font-weight-bold my-3 py-3"
                  disabled={items.length === 0}>
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CartItem({ id, name, price, quantity }) {
  const handleRemoveItem = () => {
    store.dispatch(removeItemFromCart(id));
  };

  const handleIncreaseQuantity = () => {
    store.dispatch(updateItemInCart({ id: id, quantity: quantity + 1 }));
  };
  const handleDecreaseQuantity = () => {
    if (quantity === 1) return handleRemoveItem(); // Remove item if quantity is 1
    store.dispatch(updateItemInCart({ id: id, quantity: quantity - 1 }));
  };

  return (
    <tr>
      <td className="align-middle ">{name}</td>
      <td className="align-middle">${price}</td>
      <td className="align-middle">
        <div
          className="input-group quantity mx-auto"
          style={{ width: "100px" }}>
          <div className="input-group-btn">
            <button
              className="btn btn-sm btn-primary btn-minus"
              onClick={handleDecreaseQuantity}>
              <i className="fa fa-minus" />
            </button>
          </div>
          <input
            type="text"
            className="form-control form-control-sm bg-secondary border-0 text-center"
            value={quantity}
            readOnly
          />
          <div className="input-group-btn">
            <button
              className="btn btn-sm btn-primary btn-plus"
              onClick={handleIncreaseQuantity}>
              <i className="fa fa-plus" />
            </button>
          </div>
        </div>
      </td>
      <td className="align-middle">${quantity * price}</td>
      <td className="align-middle">
        <button className="btn btn-sm btn-danger" onClick={handleRemoveItem}>
          <i className="fa fa-times" />
        </button>
      </td>
    </tr>
  );
}
