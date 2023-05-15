export default function OrderManagement() {
  return (
    <>
      <div className="col-12 p-0 mb-3">
        <button className="btn btn-primary pl-4 pr-4">Add</button>
      </div>
      <table className="table table-light table-borderless table-hover text-center mb-0">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Email</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          <OrderItem />
          <OrderItem />
          <OrderItem />
        </tbody>
      </table>
    </>
  );
}

function OrderItem() {
  return (
    <tr>
      <td className="align-middle">1</td>
      <td className="align-middle">2023-09-10</td>
      <td className="align-middle">vclong2003@gmail.com</td>
      <td className="align-middle">99$</td>
      <td className="align-middle">Pending</td>
      <td className="align-middle">
        <button className="btn btn-sm btn-secondary mr-2">View</button>
        <button className="btn btn-sm btn-primary mr-2">Set status</button>
        <button className="btn btn-sm btn-danger">Delete</button>
      </td>
    </tr>
  );
}
