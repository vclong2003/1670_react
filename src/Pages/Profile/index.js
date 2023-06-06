import { useSelector } from "react-redux";
import LoadingLayer from "../../Components/LoadingLayer";
import AuthorizedComponent from "../../Components/Authorization/authorizedComponent";
import PersonalInformation from "./personalInformation";
import Addresses from "./addresses";
import Orders from "./orders";

export default function Profile() {
  const { loading } = useSelector((state) => state.user);

  return (
    <>
      {loading ? <LoadingLayer /> : ""}
      <div className="container-fluid">
        <PersonalInformation />
        <AuthorizedComponent requiredRoles={["CUSTOMER"]}>
          <Addresses />
        </AuthorizedComponent>
        <AuthorizedComponent requiredRoles={["CUSTOMER"]}>
          <Orders />
        </AuthorizedComponent>
      </div>
    </>
  );
}
