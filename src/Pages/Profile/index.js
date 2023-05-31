import { useDispatch, useSelector } from "react-redux";
import LoadingLayer from "../../Components/LoadingLayer";
import { signout } from "../../Redux/userSlice";

export default function Profile() {
  const { loading } = useSelector((state) => state.user);

  return (
    <>
      {loading ? <LoadingLayer /> : ""}
      <div className="container-fluid">
        <h4 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-secondary pr-3">Personal Information</span>
        </h4>
        <PersonalInformation />
        <h4 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-secondary pr-3">Your orders</span>
        </h4>
        <AllOrders />
      </div>
    </>
  );
}

function PersonalInformation() {
  const { email } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    <div className="col-lg-12 bg-light mb-5 p-4">
      <h5 className="mb-3">
        Email: <span className="small">{email}</span>
      </h5>
      <div className="col-lg-12 p-0 d-flex justify-content-end">
        <button className="btn btn-primary pl-3 pr-3">Change password</button>
        <button
          className="btn btn-secondary pl-3 pr-3 ml-3"
          onClick={() => {
            dispatch(signout());
          }}>
          Sign out
        </button>
      </div>
    </div>
  );
}

function AllOrders() {
  return (
    <table className="table table-light table-borderless table-hover text-center mb-0">
      <thead className="thead-dark">
        <tr>
          <th>Date placed</th>
          <th>Status</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className="align-middle">
        <Order />
        <Order />
        <Order />
        <Order />
      </tbody>
    </table>
  );
}

function Order() {
  return (
    <tr>
      <td className="align-middle">2077 - 03 - 99</td>
      <td className="align-middle">Pending</td>
      <td className="align-middle">$150</td>
      <td className="align-middle">
        <button className="btn btn-sm btn-primary font-weight-bold">
          View
        </button>
      </td>
    </tr>
  );
}
