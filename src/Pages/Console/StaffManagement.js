import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../../Redux/store";
import { addStaff, fetchStaffs, updateStaff } from "../../Redux/staffSlice";
import Modal from 'react-modal';
export default function StaffManagement() {

  const { items } = useSelector((state) => state.staff);

  const [staff, setStaff] = useState({
    name: "",
    phonenumber: "",
    email: "",
    password: "",
    address: ""
});
  const [showModal, setShowModal] = useState(false);
  const handleSubmitForm = () =>{
    setStaff({
       name: "",
       phonenumber: "",
       email: "",
       password: "",
       address: ""
  })
  }
  useEffect(()=>{
    store.dispatch(fetchStaffs())
  }, [])

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const customStyles = {
    content: {
      top: '12%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '50%',
      transform: 'translate(-40%, -10%)',
    },
  };


  return (
    <>
      <div>
      <div className="col-12 p-0 mb-3">
        <button
          className="btn btn-primary pl-4 pr-4" onClick={handleOpenModal}
        >
          Add
        </button>
      </div>
        <Modal isOpen={showModal} onRequestClose={handleCloseModal} style={customStyles}>
          <div className="header-modal">
            <div className="header-title"><h2 class="">Add Staff Information</h2></div>
            <div className="header-close" onClick={handleCloseModal}>X</div>
          </div>
          <div className="wrap-form-add-staff">
                <div class="formbold-form-title">
                </div>

                <div class="formbold-input-flex">
                  <div>
                    <label for="Name" class="formbold-form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="formbold-form-input"
                      value={staff.name}
                      onChange={(evt) => {
                        setStaff({ ...staff, name: evt.target.value});
                        console.log(staff);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label for="phone" class="formbold-form-label"> Phone number </label>
                    <input
                      type="text"
                      name="phonenumber"
                      id="phone"
                      class="formbold-form-input"
                      value={staff.phonenumber}
                      onChange={(evt) => {
                        setStaff({ ...staff, phonenumber: evt.target.value});
                        console.log(staff);
                      }}
                      required
                    />
                  </div>
                </div>

                <div class="formbold-input-flex">
                  <div>
                    <label for="email" class="formbold-form-label"> Email </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      class="formbold-form-input"
                      onChange={(evt) => {
                        setStaff({ ...staff, email: evt.target.value});
                        console.log(staff);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label for="email" class="formbold-form-label"> Password </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      class="formbold-form-input"
                      onChange={(evt) => {
                        setStaff({ ...staff, password: evt.target.value});
                        console.log(staff);
                      }}
                      required
                    />
                  </div>
                </div>

                <div class="formbold-mb-3">
                  <label for="address" class="formbold-form-label">
                    Street Address
                  </label>
                  <textarea
                    type="text"
                    name="address"
                    id="address"
                    class="formbold-form-input"
                    onChange={(evt) => {
                      setStaff({ ...staff, address: evt.target.value});
                      console.log(staff);
                    }}
                    required
                  />  
                </div>
                <div class="formbold-mb-3">
                  <button class="formbold-btn"
                    onClick={()=>{store.dispatch(addStaff({
                      name: staff.name,
                      phone: staff.phonenumber,
                      address: staff.address,
                      email: staff.email,
                      password: staff.password
                    }))
                    handleCloseModal();
                    handleSubmitForm();
                  }}
                  >Submit</button>
                </div>        
          </div>
        </Modal>
      </div>
      <table className="table table-light table-borderless table-hover text-center mb-0">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {items.map((item) => (
            <StaffItem
            id = {item.id} 
            name={item.name}
            phone = {item.phone}
            address = {item.address}
            accountId = {item.accountId}/>
          ))}
          {console.log(items)}
        </tbody>
      </table>
    </>
  );
}

function StaffItem({id,name, phone, address, accountId}) {
  const [staffDetail, setStaffDetail] = useState({
    name: name,
    phone: phone,
    address: address,
    accountId: accountId,
  })
  const [showModal, setShowModal] = useState(false);
  const customStyles = {
    content: {
      top: '12%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '50%',
      transform: 'translate(-40%, -10%)',
    },
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <tr>
      <td className="align-middle">{staffDetail.accountId}</td>
      <td className="align-middle">{staffDetail.name}</td>
      <td className="align-middle">{staffDetail.phone}</td>
      <td className="align-middle">
        {address}
      </td>
      <td className="align-middle">
        <button className="btn btn-sm btn-primary mr-2" onClick={handleOpenModal}
        >Edit</button>
          <Modal isOpen={showModal} onRequestClose={handleCloseModal} style={customStyles}>
          <div className="header-modal">
            <div className="header-title"><h2 class="">Edit Staff #{staffDetail.accountId}</h2></div>
            <div className="header-close" onClick={handleCloseModal}>X</div>
          </div>
          <div className="wrap-form-add-staff">
                <div class="formbold-form-title">
                </div>

                <div class="formbold-input-flex">
                  <div>
                    <label for="Name" class="formbold-form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="formbold-form-input"
                      value={staffDetail.name}
                      onChange={(evt) => {
                        setStaffDetail({ ...staffDetail, name: evt.target.value});
                      }}
                    />
                  </div>
                  <div>
                    <label for="phone" class="formbold-form-label"> Phone number </label>
                    <input
                      type="text"
                      name="phonenumber"
                      id="phone"
                      class="formbold-form-input"
                      value={staffDetail.phone}
                      onChange={(evt) => {
                        setStaffDetail({ ...staffDetail, phone: evt.target.value});
                      }}
                    />
                  </div>
                </div>
                <div class="formbold-mb-3">
                  <label for="address" class="formbold-form-label">
                    Street Address
                  </label>
                  <textarea
                    type="text"
                    name="address"
                    id="address"
                    class="formbold-form-input"
                    value={staffDetail.address}
                    onChange={(evt) => {
                      setStaffDetail({ ...staffDetail, address: evt.target.value});
                    }}
                  />  
                </div>
                <div class="formbold-mb-3">
                  <button class="formbold-btn"
                    onClick={()=>{store.dispatch(updateStaff({
                      accountId: staffDetail.accountId,
                      name: staffDetail.name,
                      phone: staffDetail.phone,
                      address: staffDetail.address
                    }))
                    handleCloseModal();
                  }}
                  >Submit</button>
                </div>        
          </div>
        </Modal>
      </td>
    </tr>
  );
}
