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
                  value={categoryData.name}
                  onChange={(evt) => {
                    setCategoryData({
                      ...categoryData,
                      name: evt.target.value,
                    });
                  }}
                />
                <input
                  className="form-control mt-3 "
                  type="text"
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
          </div>
        </div>
      </div>
    </Popup>
  );
}
