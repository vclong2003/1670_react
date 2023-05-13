export default function Signup() {
  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-lg-4" />
        <div className="col-lg-4">
          <div className="row d-flex justify-content-center p-30">
            <a href className="text-decoration-none">
              <span className="h1 text-uppercase text-primary bg-dark px-2">
                Book
              </span>
              <span className="h1 text-uppercase text-dark bg-primary px-2 ">
                Shop
              </span>
            </a>
          </div>
          <div className="row">
            <div className="bg-light p-30 mb-5">
              <div className="row">
                <div className="col-md-12 form-group">
                  <label>Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Your name"
                  />
                </div>
                <div className="col-md-12 form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Example@mail.com"
                  />
                </div>
                <div className="col-md-12 form-group">
                  <label>Password</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Your password"
                  />
                </div>
              </div>
              <button className="btn btn-block btn-primary font-weight-bold py-2">
                Create new account
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-4" />
      </div>
    </div>
  );
}
