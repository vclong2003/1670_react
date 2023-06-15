import { useState } from "react";
import { useSelector } from "react-redux";
import store from "../../Redux/store";
import {
  addCategory,
  fetchCategories,
  updateCategory,
} from "../../Redux/categorySlice";
import LoadingLayer from "../../Components/LoadingLayer";
import { useEffect } from "react";
import Popup from "../../Components/Popup";

export default function CategoryManagement() {
  const { loading, items } = useSelector((state) => state.category);

  const [showPopUp, setShowPopUp] = useState(false);
  const [selecteCategory, setselecteCategory] = useState(null);



  useEffect(() => {
    store.dispatch(fetchCategories());
  }, []);

  const handleOpenPopup = () => {
    setShowPopUp(true);
  };

  const handleClosePopup = () => {
    setselecteCategory(null);
    setShowPopUp(false);
  };

  const handleEdit = (item) => {
    setselecteCategory(item);
    setShowPopUp(true);
  };

  return (
    <>
    {console.log(items)}
      {loading ? <LoadingLayer /> : ""}
      {showPopUp ? (
        <CategoryPopup
          item={selecteCategory}
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
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {items.map((item, index) => (
            <CategoryItem key={index} item={item} editCallback={handleEdit} />
          ))}
        </tbody>
      </table>
    </>
  );

  //
}

//
function CategoryItem({ item, editCallback }) {
  const { name, description } = item;
  return (
    <tr>
      <td className="align-middle">{item.id}</td>
      <td className="align-middle">{name}</td>
      <td
        className="align-middle "
        style={{
          maxWidth: "250px", //limit the width of the element to 250 pixels
          whiteSpace: "nowrap", //prevent line breaks
          overflow: "hidden", //hide any content that exceeds the defined width
          textOverflow: "ellipsis", //display three dots (...) when the text overflows
        }}
      >
        {description}
      </td>
      <td className="align-middle">
        <button
          className="btn btn-sm btn-primary mr-2"
          onClick={() => {
            editCallback(item);
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}

function CategoryPopup({ item, closeCallback }) {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (item) {
      setCategoryData({ ...item });
    }
  }, [item]);

  const handleSave = () => {
    if (item) {
      store.dispatch(updateCategory({ id: item.id, ...categoryData }));
      return closeCallback();
    }

    store.dispatch(addCategory(categoryData));
    return closeCallback();
  };

  return (
    <Popup>
      <div className="row" style={{ width: "40vw" }}>
        <div className="col-md-12 form-group">
          <input
            className="form-control mb-2"
            type="text"
            placeholder="Enter name"
            value={categoryData.name}
            onChange={(evt) => {
              setCategoryData({
                ...categoryData,
                name: evt.target.value,
              });
            }}
          />
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="6"
            placeholder="Enter Description"
            value={categoryData.description}
            onChange={(evt) => {
              setCategoryData({
                ...categoryData,
                description: evt.target.value,
              });
            }}
          />
        </div>
      </div>
      <button
        className="btn btn-block btn-primary font-weight-bold py-2"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        className="btn btn-block btn-secondary font-weight-bold py-2"
        onClick={closeCallback}
      >
        Cancel
      </button>
    </Popup>
  );
}
