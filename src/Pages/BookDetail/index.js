import Footer from "../../Components/Footer";
import NavigationBar from "../../Components/NavigationBar";

export default function BookDetail() {
  return (
    <>
      <NavigationBar />
      <div className="container-fluid pb-5">
        <div className="row px-xl-5">
          <div className="col-lg-5 mb-30">
            <img
              alt=""
              src="https://picsum.photos/500"
              className="img-fluid w-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="col-lg-7 h-auto mb-30">
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
                  <p>
                    Dolore magna est eirmod sanctus dolor, amet diam et eirmod
                    et ipsum. Amet dolore tempor consetetur sed lorem dolor sit
                    lorem tempor. Gubergren amet amet labore sadipscing clita
                    clita diam clita. Sea amet et sed ipsum lorem elitr et, amet
                    et labore voluptua sit rebum. Ea erat sed et diam takimata
                    sed justo. Magna takimata justo et amet magna et.
                  </p>
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
