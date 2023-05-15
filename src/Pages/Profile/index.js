import Footer from "../../Components/Footer";
import NavigationBar from "../../Components/NavigationBar";

export default function Profile() {
  return (
    <>
      <NavigationBar />
      <div className="container-fluid">
        <h3 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-secondary pr-3">Personal Information</span>
        </h3>
        <PersonalInformation />
        <h3 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-secondary pr-3">Your orders</span>
        </h3>
        <AllOrders />
      </div>
      <Footer />
    </>
  );
}

function PersonalInformation() {
  return (
    <div className="col-lg-12 bg-light mb-5 p-4">
      <h5 className="mb-3">
        Email: <span className="small">vclong2003@gmail.com</span>
      </h5>
      <h5 className="mb-3">
        Name: <span className="small">Tony Stark</span>
        <button className="btn btn-sm btn-primary ml-2">
          <i className="far fa-edit" />
        </button>
      </h5>
      <div className="col-lg-12 p-0 d-flex justify-content-end">
        <button className="btn btn-primary pl-3 pr-3">Change password</button>
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
