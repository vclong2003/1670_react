export default function ProductManagement() {
  return (
    <>
      <div className="col-12 p-0 mb-3">
        <button className="btn btn-primary pl-4 pr-4">Add</button>
      </div>
      <table className="table table-light table-borderless table-hover text-center mb-0">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </tbody>
      </table>
    </>
  );
}

function ProductItem() {
  return (
    <tr>
      <td className="align-middle">The Casual Vacancy</td>
      <td className="align-middle">J.K. Rowling</td>
      <td className="align-middle">49$</td>
      <td className="align-middle">
        <button className="btn btn-sm btn-secondary mr-2">View</button>
        <button className="btn btn-sm btn-primary mr-2">Edit</button>
        <button className="btn btn-sm btn-danger">Delete</button>
      </td>
    </tr>
  );
}
