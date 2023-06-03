import { useEffect, useState } from "react";
import Popup from "../../Components/Popup";
import "react-quill/dist/quill.snow.css"; // Css for rich text editor
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import DateTimeConverter from "../../Components/Converter/dateTimeConverter";
import store from "../../Redux/store";
import { addProduct, fetchProducts } from "../../Redux/productSlice";
import LoadingLayer from "../../Components/LoadingLayer";

export default function ProductManagement() {
  const [showPopup, setShowpopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { items, loading } = useSelector((state) => state.product);

  useEffect(() => {
    store.dispatch(fetchProducts({ category: null, search: null }));
  }, []);

  const handleOpenPopup = () => {
    setShowpopup(true);
  };
  const handleClosePopup = () => {
    setSelectedItem(null);
    setShowpopup(false);
  };
  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowpopup(true);
  };

  return (
    <>
      {loading ? <LoadingLayer /> : ""}
      {showPopup ? (
        <ProductManagementPopup
          item={selectedItem}
          closeCallback={handleClosePopup}
        />
      ) : (
        ""
      )}
      <div className="col-12 p-0 mb-3">
        <button className="btn btn-primary pl-4 pr-4" onClick={handleOpenPopup}>
          Add
        </button>
      </div>
      <table className="table table-light table-borderless table-hover text-center mb-0">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Publishcation Date</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {items.map((item, index) => (
            <ProductItem key={index} item={item} editCallback={handleEdit} />
          ))}
        </tbody>
      </table>
    </>
  );
}

function ProductItem({ item, editCallback }) {
  const { name, author, publisher, publishcationDate, price, quantity } = item;
  return (
    <tr>
      <td className="align-middle">{name}</td>
      <td className="align-middle">{author}</td>
      <td className="align-middle">{publisher}</td>
      <td className="align-middle">{DateTimeConverter(publishcationDate)}</td>
      <td className="align-middle">${price}</td>
      <td className="align-middle">{quantity}</td>
      <td className="align-middle">
        <button
          className="btn btn-sm btn-primary mr-2"
          onClick={() => {
            editCallback(item);
          }}>
          Edit
        </button>
      </td>
    </tr>
  );
}

function ProductManagementPopup({ item, closeCallback }) {
  const categories = useSelector((state) => state.category.items);

  const [thumbnailFile, setThumbnailFile] = useState(null); //thumbnail file to be uploaded to Firebase, process locally
  const [productData, setProductData] = useState({
    categoryId: categories[0].id, //default category will be the first category in the list
    thumbnailUrl: "",
    name: "",
    author: "",
    publisher: "",
    publishcationDate: "",
    description: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (item) {
      setProductData({
        ...item,
        publishcationDate: new Date(item.publishcationDate) //convert date
          .toISOString()
          .split("T")[0],
      });
    }
  }, [item]);

  const handleSave = () => {
    store.dispatch(addProduct({ productData, thumbnailFile }));
    return closeCallback();
  };

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
            value={productData.name}
            onChange={(evt) => {
              setProductData({ ...productData, name: evt.target.value });
            }}
          />
        </div>
        <div className="col-md-6 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Author"
            value={productData.author}
            onChange={(evt) => {
              setProductData({ ...productData, author: evt.target.value });
            }}
          />
        </div>
        <div className="col-md-6 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Publisher"
            value={productData.publisher}
            onChange={(evt) => {
              setProductData({ ...productData, publisher: evt.target.value });
            }}
          />
        </div>
        <div className="col-md-6 form-group">
          <input
            className="form-control"
            type="date"
            placeholder="Publishcation date"
            value={productData.publishcationDate}
            onChange={(evt) => {
              setProductData({
                ...productData,
                publishcationDate: evt.target.value,
              });
            }}
          />
        </div>
        <div className="col-md-6 form-group">
          <select
            className="form-control"
            placeholder="Category"
            value={productData.categoryId}
            onChange={(evt) => {
              setProductData({ ...productData, categoryId: evt.target.value });
            }}>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 form-group">
          <input
            className="form-control"
            type="number"
            placeholder="Price"
            value={productData.price}
            onChange={(evt) => {
              setProductData({ ...productData, price: evt.target.value });
            }}
          />
        </div>
        <div className="col-md-3 form-group">
          <input
            className="form-control"
            type="number"
            placeholder="Quantity"
            value={productData.quantity}
            onChange={(evt) => {
              setProductData({ ...productData, quantity: evt.target.value });
            }}
          />
        </div>
        <div className="col-md-6 form-group">
          <input
            type="file"
            accept="image/*"
            title="Thumbnail"
            onChange={(evt) => {
              setThumbnailFile(evt.target.files[0]);
            }}
          />
        </div>
        <div className="col-md-6 form-group">
          <img
            src={productData.thumbnailUrl}
            alt="Thumbnail"
            className="mw-100"
          />
        </div>
        <div className="col-md-12 p-0">
          <RichTextEditor
            value={productData.description}
            setValueCallback={(value) => {
              setProductData({ ...productData, description: value });
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

function RichTextEditor({ value, setValueCallback }) {
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
        onChange={setValueCallback}
        placeholder="Description"
        modules={{
          toolbar: toolbarComponents,
        }}
      />
    </div>
  );
}
