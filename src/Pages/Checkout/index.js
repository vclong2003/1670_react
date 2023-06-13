import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../../Redux/store";
import { addAddress, fetchAddresses } from "../../Redux/addressSlice";
import { addOrder } from "../../Redux/orderSlice";
import LoadingLayer from "../../Components/LoadingLayer";
import { Link, useNavigate } from "react-router-dom";
import AuthorizedPage from "../../Components/Authorization/authorizedPage";
import Popup from "../../Components/Popup";

export default function Checkout() {
  const navigate = useNavigate();
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
      .then(() => {
        navigate("/profile");
      });
  };

  return (
    <AuthorizedPage requiredRoles={["CUSTOMER"]}>
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
                      value="Bank transfer"
                      onChange={handleSelectPayment}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="banktransfer">
                      Bank transfer
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
    </AuthorizedPage>
  );
}

function Addresses({ handleSelect }) {
  const { items } = useSelector((state) => state.address);

  const [showAddAddress, setShowAddAddress] = useState(false);
  const hanldeOpenAddPopup = () => {
    setShowAddAddress(true);
  };
  const handleCloseAddPopup = () => {
    setShowAddAddress(false);
  };

  useEffect(() => {
    store.dispatch(fetchAddresses());
  }, []);

  return (
    <>
      {showAddAddress ? (
        <AddAddressPopup closeCallback={handleCloseAddPopup} />
      ) : (
        ""
      )}
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Shipping Address</span>
      </h5>
      <div className="bg-light p-30">
        {items.map((item, index) => (
          <AddressItem key={index} item={item} handleSelect={handleSelect} />
        ))}
        <button
          className="btn btn-primary font-weight-bold p-2 pl-4 pr-4 mr-3"
          onClick={hanldeOpenAddPopup}>
          Add new address
        </button>
        <Link
          to="/profile"
          className="btn btn-secondary font-weight-bold p-2 pl-4 pr-4">
          Manage address
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

function AddAddressPopup({ closeCallback }) {
  const { loading } = useSelector((state) => state.address);
  const [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  const handleSave = () => {
    store.dispatch(addAddress(data));
    return closeCallback();
  };

  return (
    <Popup>
      {loading ? <LoadingLayer /> : ""}
      <div className="row">
        <div className="col-md-12 form-group">
          <h4>Add address</h4>
        </div>
        <div className="col-md-12 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            value={data.name}
            onChange={(evt) => {
              setData({ ...data, name: evt.target.value });
            }}
          />
        </div>
        <div className="col-md-12 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Phone"
            value={data.phone}
            onChange={(evt) => {
              setData({ ...data, phone: evt.target.value });
            }}
          />
        </div>
        <div className="col-md-12 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Address"
            value={data.address}
            onChange={(evt) => {
              setData({ ...data, address: evt.target.value });
            }}
          />
        </div>
        <div className="col-md-12 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="City"
            value={data.city}
            onChange={(evt) => {
              setData({ ...data, city: evt.target.value });
            }}
          />
        </div>
        <div className="col-md-12 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Country"
            value={data.country}
            onChange={(evt) => {
              setData({ ...data, country: evt.target.value });
            }}
          />
        </div>
      </div>
      <button
        className="btn btn-block btn-primary font-weight-bold py-2"
        onClick={handleSave}
        disabled={
          !data.name ||
          !data.phone ||
          !data.address ||
          !data.city ||
          !data.country
        }>
        Save
      </button>
      <button
        className="btn btn-block btn-secondary font-weight-bold py-2"
        onClick={closeCallback}>
        Cancel
      </button>
    </Popup>
  );
}
