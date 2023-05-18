import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Product() {
  return (
    <>
      {/* Shop Start */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          {/* Shop Sidebar Start */}
          <div className="col-lg-3 col-md-4">
            {/* Category Start */}
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Category</span>
            </h5>
            <div className="bg-light p-4 mb-30 d-flex flex-column">
              <Link className=" text-decoration-none text-dark mb-2 p-1" to="">
                All
              </Link>
              <CategoryItem name="Novel" id="1" />
              <CategoryItem name="Sci-fi" id="2" />
            </div>
            {/* Category End */}
          </div>
          {/* Shop Sidebar End */}
          {/* Shop Product Start */}
          <div className="col-lg-9 col-md-8">
            <div className="row pb-3">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <button
                    type="button"
                    className="btn btn-sm btn-light dropdown-toggle pl-3 pr-3 p-2"
                    data-toggle="dropdown">
                    Sorting
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <Link className="dropdown-item">Latest</Link>
                    <Link className="dropdown-item">Name A-Z</Link>
                    <Link className="dropdown-item">Price: Low to High</Link>
                  </div>
                </div>
              </div>

              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
            </div>
          </div>
          {/* Shop Product End */}
        </div>
      </div>
      {/* Shop End */}
    </>
  );
}

function CategoryItem({ name, id }) {
  return (
    <Link
      className=" text-decoration-none text-dark mb-2 p-1"
      to={{ search: `category=${id}` }}>
      {name}
    </Link>
  );
}

function ProductItem() {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
      <div className="product-item bg-light mb-4">
        <div className="product-img position-relative overflow-hidden">
          <img
            className="img-fluid w-100"
            src="https://picsum.photos/200"
            alt=""
          />
          <div className="product-action">
            <Link className="btn btn-outline-dark btn-square">
              <i className="fa fa-shopping-cart" />
            </Link>
            <Link to="2" className="btn btn-outline-dark btn-square">
              <i className="fa fa-info" />
            </Link>
          </div>
        </div>
        <div className="text-center py-4">
          <Link className="h6 text-decoration-none text-truncate" to="1">
            Product Name Goes Here
          </Link>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <p>Conan Doyle</p>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <small>$99.99</small>
          </div>
        </div>
      </div>
    </div>
  );
}
