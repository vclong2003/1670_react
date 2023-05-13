import Footer from "../../Components/Footer";
import NavigationBar from "../../Components/NavigationBar";

export default function Stores() {
  return (
    <>
      <NavigationBar />
      <div className="container min-vh-100">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Stores location</span>
        </h2>
        <div className="row px-xl-5">
          <StoreItem />
          <StoreItem />
          <StoreItem />
          <StoreItem />
          <StoreItem />
        </div>
      </div>
      <Footer />
    </>
  );
}

function StoreItem() {
  return (
    <div className="col-lg-6 mb-4">
      <div className="bg-light p-30">
        <p className="mb-2">
          <i className="fa fa-map-marker-alt text-primary mr-3" />
          123 Street, New York, USA
        </p>

        <p className="mb-2">
          <i className="fa fa-phone-alt text-primary mr-3" />
          +012 345 67890
        </p>
      </div>
    </div>
  );
}
