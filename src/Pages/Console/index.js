import CategoryManagement from "./CategoryManagement";
import OrderManagement from "./OrderManagement";
import ProductManagement from "./ProductManagement";
import StoreManagement from "./StoreManagement";

export default function Console() {
  return (
    <>
      <div className="container-fluid">
        <h5 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-secondary pr-3">Management Console</span>
        </h5>
        <div className="row px-xl-4">
          <div className="col-lg-2">
            <div className="bg-primary text-secondary p-3">
              <h6 className="text-dark m-0">Orders</h6>
            </div>
            <div className="bg-light text-secondary p-3">
              <h6 className="text-dark m-0">Products</h6>
            </div>
            <div className="bg-light text-secondary p-3">
              <h6 className="text-dark m-0">Users</h6>
            </div>
            <div className="bg-light text-secondary p-3">
              <h6 className="text-dark m-0">Stores</h6>
            </div>
            <div className="bg-light text-secondary p-3">
              <h6 className="text-dark m-0">Categories</h6>
            </div>
          </div>
          <div className="col-lg-10 p-0">
            <OrderManagement />
            {/* <ProductManagement /> */}
            {/* <StoreManagement /> */}
            {/* <CategoryManagement /> */}
          </div>
        </div>
      </div>
    </>
  );
}
