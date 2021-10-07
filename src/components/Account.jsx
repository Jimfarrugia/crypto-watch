import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Account = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await logout();
      history.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  if (currentUser) console.log(currentUser.providerData[0].providerId);

  return (
    <div>
      <h2>My Account</h2>

      <button type="button" title="Sign Out" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Account;
