import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../../Redux/store";
import { addStaff, fetchStaff, updateStaff } from "../../Redux/staffSlice";
import Popup from "../../Components/Popup";
import LoadingLayer from "../../Components/LoadingLayer";

export default function StaffManagement() {
  const { loading, members } = useSelector((state) => state.staff);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    store.dispatch(fetchStaff());
  }, []);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedMember(null);
    setShowPopup(false);
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setShowPopup(true);
  };

  return (
    <>
      {loading ? <LoadingLayer /> : ""}
      {showPopup ? (
        <StaffManagementPopup
          member={selectedMember}
          closeCallback={handleClosePopup}
        />
      ) : (
        ""
      )}
      <div>
        <div className="col-12 p-0 mb-3">
          <button
            className="btn btn-primary pl-4 pr-4"
            onClick={handleOpenPopup}>
            Add
          </button>
        </div>
      </div>
      <table className="table table-light table-borderless table-hover text-center mb-0">
        <thead className="thead-dark">
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {members.map((member, index) => (
            <StaffItem key={index} member={member} editCallback={handleEdit} />
          ))}
        </tbody>
      </table>
    </>
  );
}

function StaffItem({ member, editCallback }) {
  const { account, name, phone, address } = member;

  return (
    <tr>
      <td className="align-middle">{account.email}</td>
      <td className="align-middle">{name}</td>
      <td className="align-middle">{phone}</td>
      <td className="align-middle">{address}</td>
      <td className="align-middle">
        <button
          className="btn btn-sm btn-primary mr-2"
          onClick={() => {
            editCallback(member);
          }}>
          Edit
        </button>
      </td>
    </tr>
  );
}

function StaffManagementPopup({ member, closeCallback }) {
  const [memberData, setMemberData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (member) {
      setMemberData({ ...member });
    }
  }, [member]);

  const handleSave = () => {
    if (member) {
      store.dispatch(updateStaff(memberData));
      return closeCallback();
    }

    store.dispatch(addStaff(memberData));
    return closeCallback();
  };

  return (
    <Popup>
      <div className="row">
        {member ? (
          ""
        ) : (
          <>
            <div className="col-md-12 form-group">
              <h5>Account</h5>
            </div>
            <div className="col-md-6 form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Email"
                value={memberData.email}
                onChange={(evt) => {
                  setMemberData({ ...memberData, email: evt.target.value });
                }}
              />
            </div>
            <div className="col-md-6 form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Password"
                value={memberData.password}
                onChange={(evt) => {
                  setMemberData({ ...memberData, password: evt.target.value });
                }}
              />
            </div>
          </>
        )}
        <div className="col-md-12 form-group mt-1">
          <h5>Information</h5>
        </div>
        <div className="col-md-12 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            value={memberData.name}
            onChange={(evt) => {
              setMemberData({ ...memberData, name: evt.target.value });
            }}
          />
        </div>
        <div className="col-md-12 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Phone"
            value={memberData.phone}
            onChange={(evt) => {
              setMemberData({ ...memberData, phone: evt.target.value });
            }}
          />
        </div>
        <div className="col-md-12 form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Address"
            value={memberData.address}
            onChange={(evt) => {
              setMemberData({ ...memberData, address: evt.target.value });
            }}
          />
        </div>
      </div>
      <button
        className="btn btn-block btn-primary font-weight-bold py-2"
        onClick={handleSave}>
        Save
      </button>
      <button
        className="btn btn-block btn-secondary font-weight-bold py-2"
        onClick={closeCallback}>
        Cancel
      </button>
    </Popup>
  );
}
