import Footer from "../../Components/Footer";
import NavigationBar from "../../Components/NavigationBar";

export default function Products() {
  return (
    <>
      <NavigationBar />
      {/* Shop Start */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          {/* Shop Sidebar Start */}
          <div className="col-lg-3 col-md-4">
            {/* Category Start */}
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Category</span>
            </h5>
            <div className="bg-light p-4 mb-30">
              <form>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    defaultChecked
                    id="price-all"
                  />
                  <label className="custom-control-label" htmlFor="price-all">
                    All
                  </label>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-1"
                  />
                  <label className="custom-control-label" htmlFor="price-1">
                    Novel
                  </label>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-2"
                  />
                  <label className="custom-control-label" htmlFor="price-2">
                    Biography
                  </label>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-2"
                  />
                  <label className="custom-control-label" htmlFor="price-2">
                    Adult
                  </label>
                </div>
              </form>
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
                    <a className="dropdown-item" href="#">
                      Latest
                    </a>
                    <a className="dropdown-item" href="#">
                      Popularity
                    </a>
                    <a className="dropdown-item" href="#">
                      Best Rating
                    </a>
                  </div>
                </div>
              </div>

              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />

              <div className="col-12">
                <PaginationBar />
              </div>
            </div>
          </div>
          {/* Shop Product End */}
        </div>
      </div>
      {/* Shop End */}

      <Footer />
    </>
  );
}

function PaginationBar() {
  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className="page-item disabled">
          <a className="page-link" href="#">
            Previous
          </a>
        </li>
        <li className="page-item active">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
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
            <a className="btn btn-outline-dark btn-square" href>
              <i className="fa fa-shopping-cart" />
            </a>
            <a className="btn btn-outline-dark btn-square" href>
              <i className="fa fa-search" />
            </a>
          </div>
        </div>
        <div className="text-center py-4">
          <a className="h6 text-decoration-none text-truncate" href>
            Product Name Goes Here
          </a>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <h5>$123.00</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
