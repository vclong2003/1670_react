// import { useSelector } from "react-redux";
// import AuthorizedComponent from "../../Components/Authorization/authorizedComponent";
// import { useEffect, useState } from "react";
// import store from "../../Redux/store";
// import { fetchConsoleOrders, fetchOrderItems, fetchOrders } from "../../Redux/orderSlice";
// import Modal from 'react-modal';
// import LoadingLayer from "../../Components/LoadingLayer";
// export default function OrderManagement() {
//   const {orders} = useSelector((state) => state.order);

//   useEffect(() => {
//     store.dispatch(fetchConsoleOrders());
//   }, []);

//   return (
//     <>
//       <table className="table table-light table-borderless table-hover text-center mb-0">
//         <thead className="thead-dark">
//           <tr>
//             <th>ID</th>
//             <th>Date</th>
//             <th>Address</th>
//             <th>Phone</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody className="align-middle">
//         {orders.map((order) => (
//             <OrderItem
//               key = {order.id}
//               id = {order.id}
//               name = {order.name}
//               address = {order.address}
//               phone = {order.phone}
//               city = {order.city}
//               country = {order.country}
//               date = {order.date}
//               fee = {order.shippingFee}
//             />
//         ))}
//         </tbody>
//       </table>
//     </>
//   );
// }

// function OrderItem(props) {
//   const view = "VIEW"
//   const setStatus = "SET STATUS"
//   return (
//     <tr>
//       <td className="align-middle">{props.id}</td>
//       <td className="align-middle">{props.date}</td>
//       <td className="align-middle">{props.address}</td>
//       <td className="align-middle">{props.phone}</td>
//       <td className="align-middle">
//       <AuthorizedComponent requiredRoles={["MANAGER"]}>
//       <OrderDetail order = {props} content = {view}></OrderDetail>
//       </ AuthorizedComponent>
//         <AuthorizedComponent requiredRoles={["STAFF"]}>
//           <OrderDetail order = {props} content = {setStatus}></OrderDetail>
//         </AuthorizedComponent>
//       </td>
//     </tr>
//   );
// }

// function OrderDetail(props){
//   const {orderItems, loading} = useSelector((state) => state.order);
//   const [showPopup, setShowPopup] = useState(false);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   useEffect(()=>{
//     store.dispatch(fetchOrderItems(props.order.id))
//   }, [])
//   const handleOpenPopup = () => {
//     setModalIsOpen(true)
//     setShowPopup(true);
//   };
//   const handleClosePopup = () => {
//     setModalIsOpen(false)
//     setShowPopup(false);
//   };

//   const customStyles = {
//     content: {
//       top: '30%',
//       left: '45%',
//       right: 'auto',
//       bottom: 'auto',
//       marginRight: '-50%',
//       width: '60%',
//       transform: 'translate(-40%, -10%)',
//     },
//   };
//   return (
//     <div>
//     <button className="btn btn-sm btn-primary mr-2" onClick={handleOpenPopup}>{props.content}</button>
//     {loading ? <LoadingLayer/> : ""}
//     {showPopup ? (
//     <Modal ariaHideApp={false} style={customStyles} isOpen={modalIsOpen} onRequestClose={handleClosePopup}>
//     <div className="row">
//         <>
//           <div className="col-md-12 form-group order-form-header">
//             <h5>Order Information</h5>
//           </div>
//         </>
//       <div className="wrap-order-form">
//         <div className="wrap-input-order">
//           <div className="col-md-12 form-group">
//             <input
//               className="form-control"
//               type="text"
//               value={props.order.name}
//               disabled
//             />
//           </div>
//           <div className="col-md-12 form-group">
//             <input
//               className="form-control"
//               type="text"
//               value={props.order.date}
//               disabled
//             />
//           </div>
//           <div className="col-md-12 form-group">
//             <input
//               className="form-control"
//               type="text"
//               value={props.order.address}
//               disabled
//             />
//           </div>
//           <div className="col-md-12 form-group">
//             <input
//               className="form-control"
//               type="text"
//               value={props.order.phone}
//               disabled
//             />
//           </div>
//           <div className="col-md-12 form-group">
//             <input
//               className="form-control"
//               type="text"
//               value={props.order.city}
//               disabled
//             />
//           </div>
//           <div className="col-md-12 form-group">
//             <input
//               className="form-control"
//               type="text"
//               value={props.order.country}
//               disabled
//             />
//           </div>
//         </div>
//         <div className="wrap-order-items">
//         <div className="bg-light mb-5">
//             <div className="border-bottom">
//               <h6 className="mb-3">Products</h6>
//               {orderItems.map((item) => (
//                 <div key={item.productName} className="d-flex justify-content-between">
//                     <p>{item.productName} x {item.quantity}</p>
//                     <p>${item.price * item.quantity}</p>
//                 </div>
//               ))}

//             </div>
//             <div className="border-bottom pt-3 pb-2">
//               <div className="d-flex justify-content-between mb-3">
//                 <h6>Subtotal</h6>
//                 <h6>${orderItems.reduce((sum, item) => sum + item.price*item.quantity, 0)}</h6>
//               </div>
//               <div className="d-flex justify-content-between">
//                 <h6 className="font-weight-medium">Shipping Fee</h6>
//                 <h6 className="font-weight-medium">${props.order.fee}</h6>
//               </div>
//             </div>
//             <div className="pt-2">
//               <div className="d-flex justify-content-between mt-2">
//                 <h5>Total</h5>
//                 <h5>${orderItems.reduce((sum, item) => sum + item.price*item.quantity, 0) + props.order.fee}</h5>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="wrap-button-order">
//       <AuthorizedComponent requiredRoles={["STAFF"]}>
//       <button
//         className="btn btn-block btn-primary font-weight-bold py-2">
//         Confirm to complete
//       </button>
//       </AuthorizedComponent>
//       <button onClick={() => setModalIsOpen(false)}
//         className="btn btn-block btn-secondary font-weight-bold py-2">
//         Cancel
//       </button>
//     </div>

//     </Modal>
//       ) : (
//         ""
//       )}

//   </div>
//   )
// }
