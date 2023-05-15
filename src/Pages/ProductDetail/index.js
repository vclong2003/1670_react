import Footer from "../../Components/Footer";
import NavigationBar from "../../Components/NavigationBar";

export default function ProductDetail() {
  return (
    <>
      <NavigationBar />
      <div className="container-fluid pb-5">
        <div className="row px-xl-5">
          <div className="col-lg-4 mb-30">
            <img
              alt=""
              src="https://picsum.photos/500"
              className="img-fluid w-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="col-lg-8 h-auto mb-30">
            <div className="h-100 bg-light p-30">
              <h3>Product Name Goes Here</h3>
              <h4 className="font-weight-semi-bold mb-4">$150.00</h4>
              <p className="mb-4">
                Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr
                erat diam stet sit clita ea. Sanc ipsum et, labore clita lorem
                magna duo dolor no sea Nonumy
              </p>

              <div className="d-flex align-items-center mb-4 pt-2">
                <div
                  className="input-group quantity mr-3"
                  style={{ width: "130px" }}>
                  <div className="input-group-btn">
                    <button className="btn btn-primary btn-minus">
                      <i className="fa fa-minus" />
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control bg-secondary border-0 text-center"
                    defaultValue={1}
                  />
                  <div className="input-group-btn">
                    <button className="btn btn-primary btn-plus">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                <button className="btn btn-primary px-3">
                  <i className="fa fa-shopping-cart mr-1" /> Add To Cart
                </button>
              </div>
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
                <a
                  className="nav-item nav-link text-dark"
                  data-toggle="tab"
                  href="#tab-pane-2">
                  Availability
                </a>
              </div>

              <div className="tab-content">
                <div className="tab-pane fade show active" id="tab-pane-1">
                  <h4 className="mb-3">Product Description</h4>
                  <p>
                    Eos no lorem eirmod diam diam, eos elitr et gubergren diam
                    sea. Consetetur vero aliquyam invidunt duo dolores et duo
                    sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod
                    consetetur invidunt sed sed et, lorem duo et eos elitr,
                    sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed
                    tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing,
                    eos dolores sit no ut diam consetetur duo justo est, sit
                    sanctus diam tempor aliquyam eirmod nonumy rebum dolor
                    accusam, ipsum kasd eos consetetur at sit rebum, diam kasd
                    invidunt tempor lorem, ipsum lorem elitr sanctus eirmod
                    takimata dolor ea invidunt.
                  </p>
                </div>
                <div className="tab-pane fade" id="tab-pane-2">
                  <div className="row">
                    <div className="col-md-12">
                      <h4 className="mb-4">Stores have this book</h4>
                      <div className="media mb-4 bg-secondary p-4">
                        <div className="media-body">
                          <h5>
                            <i className="fa fa-map-marker-alt mr-2" /> 123
                            Street, New York, USA
                          </h5>
                          <h6>
                            <i className="fa fa-phone-alt mr-2" />
                            <i>0888827768</i>
                          </h6>
                          <small>5 items available</small>
                        </div>
                      </div>
                      <div className="media mb-4 bg-secondary p-4">
                        <div className="media-body">
                          <h5>
                            <i className="fa fa-map-marker-alt mr-2" /> 123
                            Street, New York, USA
                          </h5>
                          <h6>
                            <i className="fa fa-phone-alt mr-2" />
                            <i>0888827768</i>
                          </h6>
                          <small>5 items available</small>
                        </div>
                      </div>
                      <div className="media mb-4 bg-secondary p-4">
                        <div className="media-body">
                          <h5>
                            <i className="fa fa-map-marker-alt mr-2" /> 123
                            Street, New York, USA
                          </h5>
                          <h6>
                            <i className="fa fa-phone-alt mr-2" />
                            <i>0888827768</i>
                          </h6>
                          <small>5 items available</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
