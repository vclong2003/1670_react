import { useSelector } from "react-redux";
import store from "../../Redux/store";
import { signout, updatePassword } from "../../Redux/userSlice";
import Popup from "../../Components/Popup";
import { useState } from "react";
import LoadingLayer from "../../Components/LoadingLayer";

export default function PersonalInformation() {
  const { email, loading } = useSelector((state) => state.user);

  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const hanldeSignout = () => {
    store
      .dispatch(signout())
      .unwrap()
      .then(() => {
        window.location.href = "/";
      });
  };

  return (
    <>
      {showPopup ? (
        <ChangePasswordPopup closeCallback={handleClosePopup} />
      ) : (
        ""
      )}
      {loading ? <LoadingLayer /> : ""}
      <h4 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Personal Information</span>
      </h4>
      <div className="col-lg-12 bg-light mb-5 p-4">
        <h5 className="mb-3">
          Email: <span className="small">{email}</span>
        </h5>
        <div className="col-lg-12 p-0 d-flex justify-content-end">
          <button
            className="btn btn-primary pl-3 pr-3"
            onClick={handleOpenPopup}>
            Change password
          </button>
          <button
            className="btn btn-secondary pl-3 pr-3 ml-3"
            onClick={hanldeSignout}>
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}

function ChangePasswordPopup({ closeCallback }) {
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    store
      .dispatch(updatePassword(formData))
      .unwrap()
      .then(() => {
        store
          .dispatch(signout())
          .unwrap()
          .then(() => {
            window.location.href = "/signin";
          });
      })
      .catch((err) => {
        setAlert(err);
      });
  };

  return (
    <Popup>
      <div className="col-md-12 form-group text-danger">{alert}</div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12 form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Old password"
              value={formData.oldPassword}
              onChange={(e) =>
                setFormData({ ...formData, oldPassword: e.target.value })
              }
            />
          </div>
          <div className="col-md-12 form-group">
            <input
              className="form-control"
              type="password"
              placeholder="New password"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
            />
          </div>
          <div className="col-md-12 form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Confirm new password"
              value={formData.confirmNewPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmNewPassword: e.target.value })
              }
            />
          </div>
        </div>
        <button
          className="btn btn-block btn-primary font-weight-bold py-2"
          type="submit"
          disabled={
            formData.oldPassword === "" ||
            formData.newPassword === "" ||
            formData.confirmNewPassword === "" ||
            formData.newPassword !== formData.confirmNewPassword
          }
          onSubmit={handleSubmit}>
          Save
        </button>
        <button
          className="btn btn-block btn-secondary font-weight-bold py-2"
          onClick={closeCallback}>
          Cancel
        </button>
      </form>
    </Popup>
  );
}
