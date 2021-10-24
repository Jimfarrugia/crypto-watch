import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { doc, setDoc, arrayRemove } from "@firebase/firestore";
import { NotificationsListStyled } from "./styled/NotificationsList.styled";
import { currencySymbol, formatPriceNumber } from "../helpers";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

const NotificationsList = ({ notifications, vsCurrency }) => {
  const { currentUser } = useAuth();
  // TODO - Add error/success alerts

  const handleRemoveNotification = async notification => {
    try {
      const payload = { notifications: arrayRemove(notification) };
      const docRef = doc(db, "users", currentUser.uid);
      await setDoc(docRef, payload, { merge: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NotificationsListStyled>
      <ul>
        {notifications &&
          notifications.map((notification, index) => (
            <li key={`${index}-${notification.id}`}>
              <img
                src={notification.image}
                alt={`${notification.name} logo`}
                height="64"
                width="64"
                loading="lazy"
              />
              <div>
                <h4>{notification.name}</h4>
                <p>
                  {(notification.type === "above" && ">") ||
                    (notification.type === "below" && "<")}{" "}
                  {currencySymbol(vsCurrency)}
                  {formatPriceNumber(notification.threshold)}
                </p>
              </div>
              <div>
                <button
                  type="button"
                  title={`Remove ${notification.name} Notification`}
                  onClick={() => handleRemoveNotification(notification)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </NotificationsListStyled>
  );
};

export default NotificationsList;
