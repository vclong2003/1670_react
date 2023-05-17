import { NavLink, Route, Routes } from "react-router-dom";
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
            <TabItem name="Orders" target="manage_orders" />
            <TabItem name="Products" target="manage_products" />
            <TabItem name="Categories" target="manage_categories" />
            <TabItem name="Stores" target="manage_stores" />
          </div>
          <div className="col-lg-10 p-0">
            <Routes>
              <Route path="manage_orders" element={<OrderManagement />} />
              <Route path="manage_products" element={<ProductManagement />} />
              <Route
                path="manage_categories"
                element={<CategoryManagement />}
              />
              <Route path="manage_stores" element={<StoreManagement />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

function TabItem({ name, target }) {
  return (
    <NavLink
      to={target}
      className={({ isActive }) =>
        isActive
          ? "bg-primary nav-item nav-link p-3"
          : "bg-white nav-item nav-link p-3"
      }>
      <h6 className="text-dark m-0">{name}</h6>
    </NavLink>
  );
}
