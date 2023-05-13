import Footer from "../../Components/Footer";
import NavigationBar from "../../Components/NavigationBar";

export default function OrderDetail() {
  return (
    <>
      <NavigationBar />

      <div className="container">
        <h5 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-secondary pr-3">Order detail</span>
        </h5>
        <div className="bg-light p-30 mb-5">
          <div className="border-bottom">
            <h6 className="mb-3">Products</h6>

            <OrderItem />
            <OrderItem />
          </div>
          <div className="border-bottom pt-3 pb-2">
            <div className="d-flex justify-content-between mb-3">
              <h6>Subtotal</h6>
              <h6>$150</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6 className="font-weight-medium">Shipping</h6>
              <h6 className="font-weight-medium">$10</h6>
            </div>
          </div>
          <div className="pt-2">
            <div className="d-flex justify-content-between mt-2">
              <h5>Total</h5>
              <h5>$160</h5>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function OrderItem() {
  return (
    <div className="d-flex justify-content-between">
      <p>Product Name 1</p>
      <p>$150</p>
    </div>
  );
}
