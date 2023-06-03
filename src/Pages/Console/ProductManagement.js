import { useState } from "react";
import Popup from "../../Components/Popup";
import "react-quill/dist/quill.snow.css"; // Css for rich text editor
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";

export default function ProductManagement() {
  const [showPopup, setShowpopup] = useState(false);

  const { items, loading } = useSelector((state) => state.product);

  return (
    <>
      {/* <ProductManagementPopup /> */}
      <div className="col-12 p-0 mb-3">
        <button className="btn btn-primary pl-4 pr-4">Add</button>
      </div>
      <table className="table table-light table-borderless table-hover text-center mb-0">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Publishcation Date</th>
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

function ProductItem({ item }) {
  // const { id, name, author, publisher, publishcationDate, price } = item;

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

function ProductManagementPopup({ closeCallback }) {
  return (
    <Popup>
      <div className="row">
        <div className="col-md-12 form-group">
          <h4>Add product</h4>
        </div>
        <div className="col-md-6 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Product name"
          />
        </div>
        <div className="col-md-6 form-group">
          <input className="form-control" type="text" placeholder="Author" />
        </div>
        <div className="col-md-6 form-group">
          <input className="form-control" type="text" placeholder="Publisher" />
        </div>
        <div className="col-md-6 form-group">
          <input
            className="form-control"
            type="date"
            placeholder="Publishcation date"
          />
        </div>
        <div className="col-md-6 form-group">
          <select
            className="form-control"
            placeholder="Category"
            onChange={(evt) => {
              console.log(evt.target.value);
            }}>
            <option className="form-control" value="1">
              Category 1
            </option>
            <option className="form-control" value="2">
              Category 2
            </option>
          </select>
        </div>
        <div className="col-md-6 form-group">
          <input className="form-control" type="number" placeholder="Price" />
        </div>
        <div className="col-md-6 form-group">
          <input type="file" accept="image/*" title="Thumbnail" />
        </div>
        <div className="col-md-12 p-0">
          <RichTextEditor />
        </div>
      </div>
      <button className="btn btn-block btn-primary font-weight-bold py-2">
        Save
      </button>
      <button className="btn btn-block btn-secondary font-weight-bold py-2">
        Cancel
      </button>
    </Popup>
  );
}

function RichTextEditor() {
  const [value, setValue] = useState("");

  const toolbarComponents = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ];

  return (
    <div className="col-md-12 form-group">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Description"
        modules={{
          toolbar: toolbarComponents,
        }}
      />
    </div>
  );
}
