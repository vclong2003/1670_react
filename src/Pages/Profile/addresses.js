import { useEffect, useState } from "react";
import store from "../../Redux/store";
import {
  addAddress,
  fetchAddresses,
  removeAddress,
  updateAddress,
} from "../../Redux/addressSlice";
import { useSelector } from "react-redux";
import LoadingLayer from "../../Components/LoadingLayer";
import Popup from "../../Components/Popup";

export default function Addresses() {
  const [showPopup, setShowPopup] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const { items, loading } = useSelector((state) => state.address);

  useEffect(() => {
    store.dispatch(fetchAddresses());
  }, []);

  const handleClosePopup = () => {
    setEditItem(null);
    setShowPopup(false);
  };

  const handleAddItem = () => {
    setEditItem(null);
    setShowPopup(true);
  };

  const handleEditItem = (item) => {
    setEditItem(item);
    setShowPopup(true);
  };

  return (
    <>
      {loading ? <LoadingLayer /> : ""}
      {showPopup ? (
        <AddressPopup editItem={editItem} closeCallback={handleClosePopup} />
      ) : (
        ""
      )}
      <h4 className="section-title position-relative text-uppercase">
        <span className="bg-secondary pr-3">Addresses</span>
      </h4>
      <div className="container-fluid d-flex justify-content-end align-items-center mb-3">
        <button
          className="btn btn-sm btn-primary font-weight-bold p-2 pl-4 pr-4"
          onClick={handleAddItem}>
          Add
        </button>
      </div>

      <table className="table table-light table-borderless table-hover text-center mb-5">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>City</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {items.map((item, index) => (
            <AddressItem
              key={index}
              item={item}
              editCallback={handleEditItem}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

function AddressItem({ item, editCallback }) {
  const { id, name, address, phone, city, country } = item;

  const handleDelete = () => {
    store.dispatch(removeAddress(id));
  };

  return (
    <tr>
      <td className="align-middle">{name}</td>
      <td className="align-middle">{address}</td>
      <td className="align-middle">{phone}</td>
      <td className="align-middle"> {city}</td>
      <td className="align-middle">{country}</td>
      <td className="align-middle">
        <button
          className="btn btn-sm btn-primary font-weight-bold"
          onClick={() => {
            editCallback(item);
          }}>
          Edit
        </button>
        <button
          className="btn btn-sm btn-secondary font-weight-bold ml-3"
          onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}

function AddressPopup({ editItem, closeCallback }) {
  const [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    if (editItem) {
      setData({ ...data, ...editItem });
    }
  }, [editItem]);

  const handleSave = () => {
    if (editItem) {
      store.dispatch(updateAddress(data));
      return closeCallback();
    }

    store.dispatch(addAddress(data));
    return closeCallback();
  };

  return (
    <Popup>
      <div className="row">
        <div className="col-md-12 form-group">
          <h4>{editItem ? "Edit address" : "Add address"}</h4>
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
        onClick={handleSave}>
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
