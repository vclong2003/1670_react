import { useSelector } from "react-redux";
import AuthorizedComponent from "../../Components/Authorization/authorizedComponent";
import { useEffect, useState } from "react";
import store from "../../Redux/store";
import LoadingLayer from "../../Components/LoadingLayer";
import {
  fetchAllOrders,
  fetchOrderById,
  updateOrderStatus,
} from "../../Redux/orderSlice";
import Popup from "../../Components/Popup";
import DateTimeConverter from "../../Components/Converter/dateTimeConverter";

export default function OrderManagement() {
  const { orders, loading } = useSelector((state) => state.order);

  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    store.dispatch(fetchAllOrders());
  }, []);

  const handleOpenOrderDetail = (id) => {
    store
      .dispatch(fetchOrderById(id))
      .unwrap()
      .then((data) => {
        setSelectedOrder(data);
        setShowOrderDetail(true);
      });
  };

  const handleCloseOrderDetail = () => {
    setSelectedOrder(null);
    setShowOrderDetail(false);
  };

  return (
    <>
      {loading ? <LoadingLayer /> : ""}
      {showOrderDetail ? (
        <OrderDetailPopup
          order={selectedOrder}
          closeCallback={handleCloseOrderDetail}
        />
      ) : (
        ""
      )}
      <table className="table table-light table-borderless table-hover text-center mb-0">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {orders.map((order, index) => (
            <Order
              key={index}
              order={order}
              openDetailCallback={handleOpenOrderDetail}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

function Order({ order, openDetailCallback }) {
  return (
    <tr>
      <td className="align-middle">{order.id}</td>
      <td className="align-middle">{DateTimeConverter(order.date)}</td>
      <td className="align-middle">{order.name + ", " + order.phone}</td>
      <td className="align-middle">{order.status}</td>
      <td className="align-middle">
        <button
          className="btn btn-primary"
          onClick={() => {
            openDetailCallback(order.id);
          }}>
          Detail
        </button>
      </td>
    </tr>
  );
}

function OrderDetailPopup({ order, closeCallback }) {
  const updating = useSelector((state) => state.order.updating);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState(order.status);

  // Calculate total price
  useEffect(() => {
    let tempTotal = 0;

    order.items.forEach((item) => {
      tempTotal += item.price * item.quantity;
    });

    setTotal(tempTotal);
  }, [order]);

  const handleSaveStatus = () => {
    store.dispatch(updateOrderStatus({ id: order.id, status: status }));
  };

  return (
    <Popup>
      {console.log(order)}
      {updating ? <LoadingLayer /> : ""}
      <div className="row">
        <div className="col-md-12 d-flex justify-content-between">
          <h4 className="section-title position-relative text-uppercase mb-3">
            Order #{order.id}
          </h4>
          <button className="btn btn-secondary" onClick={closeCallback}>
            <i className="fas fa-times" />
          </button>
        </div>
        <div className="col-md-12">
          <div className="border-bottom">
            <h6 className="mb-3">Products</h6>

            {order.items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
          </div>
          <div className="border-bottom">
            <div className="d-flex justify-content-between mt-3 mb-4">
              <h5>Total</h5>
              <h5>${total}</h5>
            </div>
          </div>
          <div className="border-bottom">
            <div className="d-flex justify-content-between mt-3 mb-4">
              <h5>Shipping address</h5>
              <h6>
                {order.name}, {order.phone} -{" "}
                {order.address + ", " + order.city + ", " + order.country}
              </h6>
            </div>
            <div className="d-flex justify-content-between mt-1 mb-4">
              <h5>Payment method</h5>
              <h6>{order.paymentMethod}</h6>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <h5>Status</h5>
            <AuthorizedComponent roles={["MANAGER"]}>
              <h6>{order.status}</h6>
            </AuthorizedComponent>
            <AuthorizedComponent roles={["STAFF"]}>
              <div className="d-flex">
                <OrderStatusButton
                  status={status}
                  statusChangeCallback={setStatus}
                />
                <button
                  className="btn btn-primary ml-3 pl-4 pr-4"
                  onClick={handleSaveStatus}>
                  Save
                </button>
              </div>
            </AuthorizedComponent>
          </div>
        </div>
      </div>
    </Popup>
  );
}

function OrderItem({ item }) {
  return (
    <div className="d-flex justify-content-between">
      <p>
        {item.name} x {item.quantity}
      </p>
      <p>${item.price * item.quantity}</p>
    </div>
  );
}

const OrderStatusButton = ({ status, statusChangeCallback }) => {
  return (
    <select
      className="form-control"
      onChange={(e) => statusChangeCallback(e.target.value)}
      value={status}>
      <option value="Pending">Pending</option>
      <option value="Processing">Processing</option>
      <option value="Delivering">Delivering</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  );
};
