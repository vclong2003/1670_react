import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingLayer from "../../Components/LoadingLayer";
import { signin } from "../../Redux/userSlice";

export default function Signin() {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [data, setData] = useState({ email: "", password: "" });

  const handleSigninForm = async (evt) => {
    evt.preventDefault();
    dispatch(signin(data));
  };
  return (
    <>
      {loading ? <LoadingLayer /> : ""}
      <div className="container-fluid ">
        <div className="row">
          <div className="col-lg-4" />
          <div className="col-lg-4">
            <div className="row d-flex justify-content-center p-30">
              <Link className="text-decoration-none">
                <span className="h1 text-uppercase text-primary bg-dark px-2">
                  Book
                </span>
                <span className="h1 text-uppercase text-dark bg-primary px-2 ">
                  Shop
                </span>
              </Link>
            </div>
            <div className="row">
              <form className="bg-light p-30 mb-5" onSubmit={handleSigninForm}>
                <div className="row">
                  <div className="col-md-12 form-group">
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
                  <div className="col-md-12 form-group">
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
                </div>
                <button
                  type="submit"
                  className="btn btn-block btn-primary font-weight-bold py-2">
                  Signin
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-4" />
        </div>
      </div>
    </>
  );
}
