import { useState } from "react";

export default function ProductManagement() {

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
        >Add</button>
      </div>
      <table className="table table-light table-borderless table-hover text-center mb-0">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Author</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </tbody>
      </table>
    </>
  );
}

function Popup({ closeCallback }) {
  const [data, setData] = useState({
    name: "",
    author: "",
    publisher: "",
    publishcationDate: "",
    description: "",
    price: 0,
    quantity: 0,
    thumbnailUrl: ""
  });
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        zIndex: "10",
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
              <h1 className="add-product">Add Product Form</h1>
              <label className="lable-input-add-product">Name: </label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter name"
                onChange={(evt) => {
                  setData({ ...data, name: evt.target.value});
                  console.log(data.name);
                }}
              />
              <label className="lable-input-add-product">Author: </label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter name"
              />
              <label className="lable-input-add-product">Publisher: </label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter name"
              />
              <label className="lable-input-add-product">Publishcaion Date: </label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter name"
              />
              <label className="lable-input-add-product">Description: </label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter name"
              />
              <label className="lable-input-add-product">Price: </label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter name"
              />
              <label className="lable-input-add-product">Quantity: </label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter name"
              />
              <label className="lable-input-add-product">URL: </label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter name"
              />
            </div>
          </div>
          <button className="btn btn-block btn-primary font-weight-bold py-2">
            OK
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

function ProductItem() {
  return (
    <tr>
      <td className="align-middle">1</td>
      <td className="align-middle">The Casual Vacancy</td>
      <td className="align-middle">J.K. Rowling</td>
      <td className="align-middle">49$</td>
      <td className="align-middle">
        <button className="btn btn-sm btn-secondary mr-2">View</button>
        <button className="btn btn-sm btn-primary mr-2">Edit</button>
        <button className="btn btn-sm btn-danger">Delete</button>
      </td>
    </tr>
  );
}
