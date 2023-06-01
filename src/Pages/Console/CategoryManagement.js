import { useState } from "react";
import { useSelector } from "react-redux";
import store from "../../Redux/store";
import { addCategory } from "../../Redux/categorySlice";

export default function CategoryManagement() {
  const { items } = useSelector((state) => state.category);

  const [showAddPopUp, setShowAddPopUp] = useState(false);

  return (
    <>
      {showAddPopUp ? (
        <Popup
          closeCallback={() => {
            setShowAddPopUp(false);
          }}
        />
      ) : (
        ""
      )}
      <div className="col-12 p-0 mb-3">
        <button
          className="btn btn-primary pl-4 pr-4"
          onClick={() => {
            setShowAddPopUp(true);
          }}
        >
          Add
        </button>
      </div>
      <table className="table table-light table-borderless table-hover text-center mb-0">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {items.map((item, index) => (
            <CategoryItem key={index} name={item.name} id={item.id} />
          ))}
        </tbody>
      </table>
    </>
  );
}

function CategoryItem({ id, name }) {
  return (
    <tr>
      <td className="align-middle">{id}</td>
      <td className="align-middle">{name}</td>
      <td className="align-middle">
        <button className="btn btn-sm btn-primary mr-2">Edit</button>
        <button className="btn btn-sm btn-danger">Delete</button>
      </td>
    </tr>
  );
}

function Popup({ closeCallback }) {
  const [name, setName] = useState("");

  return (
    <div
      className="fixed-top"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="row"
        style={{
          boxShadow:
            "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div className="p-30">
          <div className="row">
            <div className="col-md-12 form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(evt) => {
                  setName(evt.target.value);
                }}
              />
            </div>
          </div>
          <button
            className="btn btn-block btn-primary font-weight-bold py-2"
            onClick={() => {
              store.dispatch(addCategory(name));
            }}
          >
            Save
          </button>
          <button
            className="btn btn-block btn-secondary font-weight-bold py-2"
            onClick={closeCallback}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
