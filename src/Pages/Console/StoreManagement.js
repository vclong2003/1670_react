export default function StoreManagement() {
  return (
    <>
      <div className="col-12 p-0 mb-3">
        <button className="btn btn-primary pl-4 pr-4">Add</button>
      </div>
      <table className="table table-light table-borderless table-hover text-center mb-0">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Onwer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          <StoreItem />
          <StoreItem />
          <StoreItem />
        </tbody>
      </table>
    </>
  );
}

function StoreItem() {
  return (
    <tr>
      <td className="align-middle">1</td>
      <td className="align-middle">123 Street, New York, USA</td>
      <td className="align-middle">0248278241</td>
      <td className="align-middle">
        Vu Cong Long
        <br />
        vclong2003@gmail.com
      </td>
      <td className="align-middle">
        <button className="btn btn-sm btn-primary mr-2">Edit</button>
        <button className="btn btn-sm btn-danger">Delete</button>
      </td>
    </tr>
  );
}
