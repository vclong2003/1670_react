import Footer from "../../Components/Footer";
import NavigationBar from "../../Components/NavigationBar";

export default function MyOrders() {
  return (
    <>
      <NavigationBar />
      <div className="container">
        <h5 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-secondary pr-3">All orders</span>
        </h5>
        <AllOrders />
      </div>
      <Footer />
    </>
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
      <td className="align-middle">2077 - sj ifiwe rfi fr</td>
      <td className="align-middle">$150</td>
      <td className="align-middle">$150</td>
      <td className="align-middle">
        <button className="btn btn-sm btn-primary font-weight-bold">
          View
        </button>
      </td>
    </tr>
  );
}
