import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../../Redux/store";
import { fetchAddresses } from "../../Redux/addressSlice";
import { addOrder } from "../../Redux/orderSlice";
import LoadingLayer from "../../Components/LoadingLayer";
import { Link } from "react-router-dom";

export default function Checkout() {
  const [addresses, setAddresses] = useState();
  const [payment, setPayment] = useState();
  const { loading } = useSelector((state) => state.order);
  const cartItems = useSelector((state) => state.cart.items);

  const handleSelectAddress = (e) => {
    setAddresses(e.target.value);
  };

  const handleSelectPayment = (e) => {
    setPayment(e.target.value);
  };

  const handlePlaceOrder = () => {
    store
      .dispatch(
        addOrder({ shippingAddressId: addresses, paymentMethod: payment })
      )
      .unwrap()
      .then((newOrderId) => {
        console.log(newOrderId);
      });
  };

  return (
    <>
      {loading ? <LoadingLayer /> : ""}
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <Addresses handleSelect={handleSelectAddress} />
          </div>
          <div className="col-lg-4">
            <OrderSummary />
            <div className="mb-5">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Payment</span>
              </h5>
              <div className="bg-light p-30">
                <div className="form-group">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="directcheck"
                      value="Pay when received"
                      onChange={handleSelectPayment}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="directcheck">
                      Pay when received
                    </label>
                  </div>
                </div>
                <div className="form-group mb-4">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="banktransfer"
                      value="Bank Transfer"
                      onChange={handleSelectPayment}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="banktransfer">
                      Bank Transfer
                    </label>
                  </div>
                </div>
                <button
                  className="btn btn-block btn-primary font-weight-bold py-3"
                  disabled={!addresses || !payment || cartItems.length === 0}
                  onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Addresses({ handleSelect }) {
  const { items } = useSelector((state) => state.address);

  useEffect(() => {
    store.dispatch(fetchAddresses());
  }, []);

  return (
    <>
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Shipping Address</span>
      </h5>
      <div className="bg-light p-30">
        {items.map((item, index) => (
          <AddressItem key={index} item={item} handleSelect={handleSelect} />
        ))}
        <Link
          to="/profile"
          className="btn btn-primary font-weight-bold p-2 pl-4 pr-4">
          Manage
        </Link>
      </div>
    </>
  );
}

function AddressItem({ item, handleSelect }) {
  return (
    <div className="form-group mb-30">
      <div className="custom-control custom-radio">
        <input
          type="radio"
          className="custom-control-input"
          name="address"
          id={item.id}
          value={item.id}
          onChange={handleSelect}
        />
        <label className="custom-control-label" htmlFor={item.id}>
          {item.name}, {item.phone} -{" "}
          {item.address + ", " + item.city + ", " + item.country}
        </label>
      </div>
    </div>
  );
}

function OrderSummary() {
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
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Order Total</span>
      </h5>
      <div className="bg-light p-30 mb-5">
        <div className="border-bottom">
          <h6 className="mb-3">Products</h6>

          {items.map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
        </div>
        <div className="border-bottom pt-3 pb-2">
          <div className="d-flex justify-content-between mb-3">
            <h6>Subtotal</h6>
            <h6>$150</h6>
          </div>
          <div className="d-flex justify-content-between">
            <h6 className="font-weight-medium">Shipping</h6>
            <h6 className="font-weight-medium">$10</h6>
          </div>
        </div>
        <div className="pt-2">
          <div className="d-flex justify-content-between mt-2">
            <h5>Total</h5>
            <h5>${total}</h5>
          </div>
        </div>
      </div>
    </>
  );
}

function OrderItem({ item }) {
  return (
    <div className="d-flex justify-content-between">
      <p>{item.name}</p>
      <p>${item.price}</p>
    </div>
  );
}
