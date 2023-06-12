import { useSelector } from "react-redux";
import store from "../../Redux/store";
import { signout } from "../../Redux/userSlice";

export default function PersonalInformation() {
  const { email } = useSelector((state) => state.user);

  return (
    <>
      <h4 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Personal Information</span>
      </h4>
      <div className="col-lg-12 bg-light mb-5 p-4">
        <h5 className="mb-3">
          Email: <span className="small">{email}</span>
        </h5>
        <div className="col-lg-12 p-0 d-flex justify-content-end">
          <button className="btn btn-primary pl-3 pr-3">Change password</button>
          <button
            className="btn btn-secondary pl-3 pr-3 ml-3"
            onClick={() => {
              store.dispatch(signout()).then(() => {
                window.location.href = "/";
              });
            }}>
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}
