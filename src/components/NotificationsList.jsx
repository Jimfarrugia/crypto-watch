import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { doc, setDoc, arrayRemove } from "@firebase/firestore";
import { NotificationsListStyled } from "./styled/NotificationsList.styled";
import {
  currencySymbol,
  formatPriceNumber,
  capitalizeFirstLetter,
} from "../helpers";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

const NotificationsList = ({ notifications, vsCurrency }) => {
  const { currentUser } = useAuth();
  // TODO - Add error/success alerts

  const sortNotifications = array =>
    array.sort((a, b) => a.name.localeCompare(b.name));

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
          sortNotifications(notifications).map((notification, index) => (
            <li key={`${index}-${notification.id}`}>
              <img
                src={notification.image}
                alt={`${notification.name} logo`}
                height="32"
                width="32"
                loading="lazy"
              />
              <div>
                <h4>{notification.name}</h4>
                <p>
                  <span>{capitalizeFirstLetter(notification.type)} </span>
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
