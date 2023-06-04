import { useSelector } from "react-redux";
import AuthorizedComponent from "../../Components/Authorization/authorizedComponent";
import { useEffect, useState } from "react";
import store from "../../Redux/store";
import { fetchConsoleOrders, fetchOrderItems, updateOrderStatus } from "../../Redux/orderSlice";
import Modal from 'react-modal';
import LoadingLayer from "../../Components/LoadingLayer";
import '../../Assets/CSS/orderFormModal.css';
export default function OrderManagement() {
  const {orders} = useSelector((state) => state.order);
  
  useEffect(() => {
    store.dispatch(fetchConsoleOrders());
  }, []);
  console.log(orders)
  return (
    <>
      <table className="table table-light table-borderless table-hover text-center mb-0">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="align-middle">
        {orders.map((order) => (
            <OrderItem 
              key = {order.id}
              id = {order.id}
              name = {order.name}
              address = {order.address}
              phone = {order.phone}
              city = {order.city}
              country = {order.country}
              date = {order.date}
              method = {order.paymentMethod}
              status = {order.status}
            />
        ))}
        </tbody>
      </table>
    </>
  );
}

function OrderItem(props) {
  const view = "VIEW"
  const setStatus = "SET STATUS"
  return (
    <tr>
      <td className="align-middle">{props.id}</td>
      <td className="align-middle">{props.date}</td>
      <td className="align-middle">{props.address}</td>
      <td className="align-middle">{props.phone}</td>
      <td className="align-middle">{props.status}</td>
      <td className="align-middle">
      <AuthorizedComponent requiredRoles={["MANAGER"]}>
      <OrderDetail order = {props} content = {view}></OrderDetail>
      </ AuthorizedComponent>  
        <AuthorizedComponent requiredRoles={["STAFF"]}>
          <OrderDetail order = {props} content = {setStatus}></OrderDetail>
        </AuthorizedComponent>
      </td>
    </tr>
  );
}

function OrderDetail(props){
  const {orderItems, loading} = useSelector((state) => state.order);
  const [showPopup, setShowPopup] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [status, setStatus] = useState("Pending");

  console.log(orderItems)
  const handleOpenPopup = () => {
    setModalIsOpen(true)
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setModalIsOpen(false)
    setShowPopup(false);
  };
  const handleStatusChange = (event) => {
      setStatus(event.target.value);
  }
  const handleUpdateStatus = () =>{
    store.dispatch(updateOrderStatus({ id: props.order.id, status: status}))
  }
  console.log(status)
  const customStyles = {
    content: {
      top: '30%',
      left: '45%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '50%',
      transform: 'translate(-40%, -10%)',
    },
  };
  return (
    <div>
    <button className="btn btn-sm btn-primary mr-2" onClick={()=>{handleOpenPopup(); store.dispatch(fetchOrderItems(props.order.id))}}>{props.content}</button>
    {loading ? <LoadingLayer/> : ""}
    {showPopup ? (
    <Modal ariaHideApp={false} style={customStyles} isOpen={modalIsOpen} onRequestClose={handleClosePopup}>
    <div className="row">
        <>
          <div className="col-md-12 form-group order-form-header">
            <h5>Order Information</h5>
          </div>
        </>
      <div className="wrap-order-form">
        <div className="wrap-input-order">
          <div className="col-md-12 form-group">
            <input
              className="form-control"
              type="text"
              value={props.order.name}
              disabled
            />
          </div>
          <div className="col-md-12 form-group">
            <input
              className="form-control"
              type="text"
              value={props.order.date}
              disabled
            />
          </div>
          <div className="col-md-12 form-group">
            <input
              className="form-control"
              type="text"
              value={props.order.address}
              disabled
            />
          </div>
          <div className="col-md-12 form-group">
            <input
              className="form-control"
              type="text"
              value={props.order.phone}
              disabled
            />
          </div>
          <div className="col-md-12 form-group">
            <input
              className="form-control"
              type="text"
              value={props.order.city}
              disabled
            />
          </div>
          <div className="col-md-12 form-group">
            <input
              className="form-control"
              type="text"
              value={props.order.country}
              disabled
            />
          </div>
          <div className="col-md-12 form-group">
            <input
              className="form-control"
              type="text"
              value={props.order.status}
              disabled
            />
          </div>
          <div className="col-md-12 form-group">
            <input
              className="form-control"
              type="text"
              value={props.order.method}
              disabled
            />
          </div>
          <AuthorizedComponent requiredRoles={["STAFF"]}>
            <div className="col-md-12 form-group">
              <select defaultValue={status}
                  onChange={(e) => handleStatusChange(e)} className="form-control">
                  <option key={1} value={"Pending"} >
                    Pending
                  </option>
                  <option key={2} value={"Completed"} >
                  Completed
                  </option>
                  <option key={3} value={"Delivery"} >
                  Delivery
                  </option>
                  <option key={4} value={"Canceled"} >
                  Canceled
                  </option>
              </select>
            </div>
          </AuthorizedComponent>
        </div>
        <div className="wrap-order-items">
        <div className="bg-light mb-5">
            <div className="border-bottom">
              <h6 className="mb-3">Products</h6>
              {orderItems === undefined ? <LoadingLayer/> : orderItems.map((item) => (
                <div key={item.productName} className="d-flex justify-content-between">
                    <p>{item.productName} x {item.quantity}</p>
                    <p>${item.price * item.quantity}</p>
                </div>
              ))}

            </div>
            <div className="pt-2">
              <div className="d-flex justify-content-between mt-2">
                <h5>Total</h5>
                {loading ? <LoadingLayer/> : <h5>${orderItems.reduce((sum, item) => sum + item.price*item.quantity, 0)}</h5>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="wrap-button-order">
      <AuthorizedComponent requiredRoles={["STAFF"]}>
      {props.order.status == "Completed" || props.order.status == "Canceled" ? "" :      <button
        className="btn btn-block btn-primary font-weight-bold py-2" onClick={handleUpdateStatus}>
        Update Status
      </button>}

      </AuthorizedComponent>
      <button onClick={() => setModalIsOpen(false)}
        className="btn btn-block btn-secondary font-weight-bold py-2">
        Cancel
      </button>
    </div>

    </Modal>
      ) : (
        ""
      )}

  </div>
  )
}