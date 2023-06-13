import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchProducts } from "../../Redux/productSlice";
import AuthorizedComponent from "../../Components/Authorization/authorizedComponent";
import { addItemToCart } from "../../Redux/cartSlice";
import store from "../../Redux/store";

export default function Product() {
  const url = useLocation();
  const category = new URLSearchParams(url.search).get("category");
  const search = new URLSearchParams(url.search).get("search");

  useEffect(() => {
    window.scrollTo(0, 0);
    store.dispatch(fetchProducts({ category, search }));
  }, [category, search]);

  return (
    <>
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-3 col-md-4">
            <CategoryFilter />
          </div>
          <div className="col-lg-9 col-md-8">
            <div className="row pb-3">
              <ProductList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CategoryFilter() {
  const categories = useSelector((state) => state.category.items);
  return (
    <>
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Category</span>
      </h5>
      <div className="bg-light mb-30 d-flex flex-column">
        <Link className="text-dark nav-item nav-link bg-light p-3" to="">
          All
        </Link>

        {categories.map((category, index) => (
          <CategoryItem key={index} name={category.name} id={category.id} />
        ))}
      </div>
    </>
  );
}

function CategoryItem({ id, name }) {
  return (
    <Link
      className="text-dark nav-item nav-link bg-light p-3"
      to={{ search: `category=${id}` }}>
      {name}
    </Link>
  );
}

function ProductList() {
  const { items, loading } = useSelector((state) => state.product);

  return (
    <>
      <div className="col-12 pb-1">
        <div className="d-flex align-items-center mb-4">
          <button
            type="button"
            className="btn btn-sm btn-light dropdown-toggle pl-3 pr-3 p-2 mr-3"
            data-toggle="dropdown">
            Sorting
          </button>
          {loading ? <div className="spinner-border text-primary" /> : ""}
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item">Latest</Link>
            <Link className="dropdown-item">Name A-Z</Link>
            <Link className="dropdown-item">Price: Low to High</Link>
          </div>
        </div>
      </div>

      {items.map((item, index) => (
        <ProductItem
          key={index}
          id={item.id}
          thumbnailUrl={item.thumbnailUrl}
          name={item.name}
          author={item.author}
          price={item.price}
        />
      ))}

      {items.length === 0 && !loading ? (
        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">No product found!</div>
      ) : (
        ""
      )}
    </>
  );
}

function ProductItem({ id, thumbnailUrl, name, author, price }) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
      <div className="product-item bg-light mb-4">
        <div className="product-img position-relative overflow-hidden">
          <div className="embed-responsive embed-responsive-1by1">
            <img
              className="img-fluid w-100 embed-responsive-item"
              src={thumbnailUrl}
              alt=""
              style={{ objectFit: "contain" }}
            />
          </div>

          <div className="product-action">
            {/* Cart button */}
            <AuthorizedComponent requiredRoles={["CUSTOMER"]}>
              <Link
                className="btn btn-outline-dark btn-square"
                onClick={() => {
                  store.dispatch(addItemToCart({ id }));
                }}>
                <i className="fa fa-shopping-cart" />
              </Link>
            </AuthorizedComponent>
            <Link to={`${id}`} className="btn btn-outline-dark btn-square">
              <i className="fa fa-info" />
            </Link>
          </div>
        </div>
        <div className="text-center py-4">
          <Link
            className="h6 text-decoration-none text-truncate d-inline-block w-100 pl-3 pr-3"
            to={`${id}`}>
            {name}
          </Link>
          <div className="d-flex align-items-center justify-content-center d-inline-block w-100 pl-3 pr-3">
            <p>{author}</p>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <small>${price}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
