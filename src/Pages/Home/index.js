import Footer from "../../Components/Footer";
import NavigationBar from "../../Components/NavigationBar";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <Carousel />
      <Featured />
      <ProductGrid />
      <Footer />
    </>
  );
}

function Featured() {
  return (
    <div className="container-fluid pt-1">
      <div className="row px-xl-5">
        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div
            className="d-flex align-items-center bg-light mb-4"
            style={{ padding: "30px" }}>
            <h1 className="fa fa-check text-primary m-0 mr-3" />
            <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div
            className="d-flex align-items-center bg-light mb-4"
            style={{ padding: "30px" }}>
            <h1 className="fa fa-shipping-fast text-primary m-0 mr-2" />
            <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div
            className="d-flex align-items-center bg-light mb-4"
            style={{ padding: "30px" }}>
            <h1 className="fas fa-exchange-alt text-primary m-0 mr-3" />
            <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div
            className="d-flex align-items-center bg-light mb-4"
            style={{ padding: "30px" }}>
            <h1 className="fa fa-phone-volume text-primary m-0 mr-3" />
            <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

function Carousel() {
  return (
    <div className="container-fluid mb-3">
      <div className="row px-xl-5">
        <div className="col-lg-8">
          <div
            id="header-carousel"
            className="carousel slide carousel-fade mb-30 mb-lg-0"
            data-ride="carousel">
            <ol className="carousel-indicators">
              <li
                data-target="#header-carousel"
                data-slide-to={0}
                className="active"
              />
              <li data-target="#header-carousel" data-slide-to={1} />
              <li data-target="#header-carousel" data-slide-to={2} />
            </ol>
            <div className="carousel-inner">
              <div
                className="carousel-item position-relative active"
                style={{ height: "430px" }}>
                <img
                  alt=""
                  className="position-absolute w-100 h-100"
                  src="https://picsum.photos/500"
                  style={{ objectFit: "cover" }}
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "700px" }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                      Men Fashion
                    </h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                      Lorem rebum magna amet lorem magna erat diam stet. Sadips
                      duo stet amet amet ndiam elitr ipsum diam
                    </p>
                    <div
                      className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                      href="#">
                      Shop Now
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="carousel-item position-relative"
                style={{ height: "430px" }}>
                <img
                  alt=""
                  className="position-absolute w-100 h-100"
                  src="https://picsum.photos/500"
                  style={{ objectFit: "cover" }}
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "700px" }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                      Women Fashion
                    </h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                      Lorem rebum magna amet lorem magna erat diam stet. Sadips
                      duo stet amet amet ndiam elitr ipsum diam
                    </p>
                    <div
                      className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                      href="#">
                      Shop Now
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="carousel-item position-relative"
                style={{ height: "430px" }}>
                <img
                  alt=""
                  className="position-absolute w-100 h-100"
                  src="https://picsum.photos/500"
                  style={{ objectFit: "cover" }}
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "700px" }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                      Kids Fashion
                    </h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                      Lorem rebum magna amet lorem magna erat diam stet. Sadips
                      duo stet amet amet ndiam elitr ipsum diam
                    </p>
                    <div
                      className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                      href="#">
                      Shop Now
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="product-offer mb-30" style={{ height: "200px" }}>
            <img className="img-fluid" src="https://picsum.photos/500" alt="" />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Save 20%</h6>
              <h3 className="text-white mb-3">Special Offer</h3>
              <a href className="btn btn-primary">
                Shop Now
              </a>
            </div>
          </div>
          <div className="product-offer mb-30" style={{ height: "200px" }}>
            <img className="img-fluid" src="https://picsum.photos/500" alt="" />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Save 20%</h6>
              <h3 className="text-white mb-3">Special Offer</h3>
              <a href className="btn btn-primary">
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductGrid() {
  return (
    <div className="container">
      <div className="row pb-3">
        <div className="col-12 pb-1">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="ml-2">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
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
              <div className="btn-group ml-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-toggle="dropdown">
                  Showing
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="#">
                    10
                  </a>
                  <a className="dropdown-item" href="#">
                    20
                  </a>
                  <a className="dropdown-item" href="#">
                    30
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />

        <PaginationBar />
      </div>
    </div>
  );
}

function PaginationBar() {
  return (
    <div className="col-12">
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
    </div>
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
