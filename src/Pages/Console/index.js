import Footer from "../../Components/Footer";
import NavigationBar from "../../Components/NavigationBar";

export default function Console() {
  return (
    <>
      <NavigationBar />
      <div className="container-fluid">
        <h5 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-secondary pr-3">Management Console</span>
        </h5>
        <div className="row px-xl-3">
          <div className="col-lg-3">
            <div
              className="bg-primary text-secondary"
              style={{ padding: "5%", textAlign: "center" }}>
              <h6 className="text-dark m-0">Orders</h6>
            </div>
            <div
              className="bg-light text-secondary"
              style={{ padding: "5%", textAlign: "center" }}>
              <h6 className="text-dark m-0">Products</h6>
            </div>
            <div
              className="bg-light text-secondary"
              style={{ padding: "5%", textAlign: "center" }}>
              <h6 className="text-dark m-0">Users</h6>
            </div>
            <div
              className="bg-light text-secondary"
              style={{ padding: "5%", textAlign: "center" }}>
              <h6 className="text-dark m-0">Stores</h6>
            </div>
            <div
              className="bg-light text-secondary"
              style={{ padding: "5%", textAlign: "center" }}>
              <h6 className="text-dark m-0">Categories</h6>
            </div>
          </div>
          <div className="col-lg-9 p-4 bg-light"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}
