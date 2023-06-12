import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingLayer from "../../Components/LoadingLayer";
import { signin } from "../../Redux/userSlice";
import store from "../../Redux/store";

export default function Signin() {
  const { loading } = useSelector((state) => state.user);

  const [error, setError] = useState(null);
  // Signin form data
  const [data, setData] = useState({ email: "", password: "" });

  const handleSigninForm = async (evt) => {
    evt.preventDefault();
    store
      .dispatch(signin(data))
      .unwrap()
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => {
        setError(err);
      });
  };
  return (
    <>
      {loading ? <LoadingLayer /> : ""}
      <div className="container-fluid ">
        <div className="row">
          <div className="col-4" />
          <div className="col-4">
            <div className="col-12 d-flex justify-content-center p-30">
              <Link to="/" className="text-decoration-none">
                <span className="h1 text-uppercase text-primary bg-dark px-2">
                  Book
                </span>
                <span className="h1 text-uppercase text-dark bg-primary px-2 ">
                  Shop
                </span>
              </Link>
            </div>
            <div className="col-12">
              <form className="bg-light p-30 mb-5" onSubmit={handleSigninForm}>
                <div className="row">
                  <div className="col-12 form-group">
                    <label>Email</label>
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Example@mail.com"
                      value={data.email}
                      onChange={(evt) => {
                        setData({ ...data, email: evt.target.value });
                      }}
                    />
                  </div>
                  <div className="col-12 form-group">
                    <label>Password</label>
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Your password"
                      value={data.password}
                      onChange={(evt) => {
                        setData({ ...data, password: evt.target.value });
                      }}
                    />
                  </div>
                  <div className="col-md-12 form-group text-danger">
                    {error}
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-block btn-primary font-weight-bold">
                  Signin
                </button>
                <Link
                  to="/signup"
                  className="text-decoration-none btn-block btn">
                  Don't have an account? Click here
                </Link>
              </form>
            </div>
          </div>
          <div className="col-4" />
        </div>
      </div>
    </>
  );
}
