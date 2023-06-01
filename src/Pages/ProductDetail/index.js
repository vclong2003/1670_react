import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../Redux/productSlice";
import { useEffect, useState } from "react";
import AuthorizedComponent from "../../Components/Authorization/authorizedComponent";
import store from "../../Redux/store";
import { addItemToCart } from "../../Redux/cartSlice";
export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { selectedItem } = useSelector((state) => state.product);


  useEffect(() => {
    store.dispatch(fetchProductById(id));
  }, [id]);

  const minus = () =>{
    if(quantity>1){
      setQuantity(quantity-1);
    }
  }

  const plus = () =>{
    if(quantity<selectedItem.quantity){
      setQuantity(quantity+1);
    }
    
  }

  return selectedItem ? (
    <div className="container-fluid pb-5">
      {console.log(selectedItem)}
      <div className="row px-xl-5">
        <div className="col-lg-4 mb-30">
          <img
            alt=""
            src={selectedItem.thumbnailUrl}
            className="img-fluid w-100"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-lg-8 h-auto mb-30">
          <div className="h-100 bg-light p-30">
            <h3>{selectedItem.name}</h3>
            <h4 className="font-weight-semi-bold mb-4">
              ${selectedItem.price}
            </h4>
            <p className="mb-4">
              Author: {selectedItem.author}
              <br />
              Publisher: {selectedItem.publisher}
              <br />
              Published:{" "}
              {new Date(selectedItem.publishcationDate).toDateString()}
              <br/>
              Quantity: {selectedItem.quantity}
            </p>

            {/* Add to cart buttons */}
            <AuthorizedComponent requiredRoles={["CUSTOMER"]}>
              <div className="d-flex align-items-center mb-4 pt-2">
                <div
                  className="input-group quantity mr-3"
                  style={{ width: "130px" }}>
                  <div className="input-group-btn">
                    <button className="btn btn-primary btn-minus"
                    onClick={minus}>
                      <i className="fa fa-minus" />
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control bg-secondary border-0 text-center"
                    value = {quantity}
                  />
                  <div className="input-group-btn">
                    <button className="btn btn-primary btn-plus"
                    onClick={plus}>
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                <button className="btn btn-primary px-3"                onClick={() => {
                  store.dispatch(addItemToCart({ id, quantity }));
                }}>
                  <i className="fa fa-shopping-cart mr-1" /> Add To Cart
                </button>
              </div>
            </AuthorizedComponent>
          </div>
        </div>
      </div>
      <div className="row px-xl-5">
        <div className="col">
          <div className="bg-light p-30">
            <div className="nav nav-tabs mb-4">
              <a
                className="nav-item nav-link text-dark active"
                data-toggle="tab"
                href="#tab-pane-1">
                Description
              </a>
            </div>

            <div className="tab-content">
              <div className="tab-pane fade show active" id="tab-pane-1">
                <h4 className="mb-3">Product Description</h4>
                <p>{selectedItem.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
