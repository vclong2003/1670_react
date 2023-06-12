import AuthorizedComponent from "../../Components/Authorization/authorizedComponent";
import PersonalInformation from "./personalInformation";
import Addresses from "./addresses";
import Orders from "./orders";

export default function Profile() {
  return (
    <div className="container-fluid">
      <PersonalInformation />
      <AuthorizedComponent requiredRoles={["CUSTOMER"]}>
        <Addresses />
      </AuthorizedComponent>
      <AuthorizedComponent requiredRoles={["CUSTOMER"]}>
        <Orders />
      </AuthorizedComponent>
    </div>
  );
}
