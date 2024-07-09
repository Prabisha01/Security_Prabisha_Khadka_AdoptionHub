import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getallnotification } from '../apis/Api';
import UpNavbar from '../components/UpNavbar';
import Navbar from '../components/Navbar';

const NotificationComponent = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user._id : null;
  const [notifications, setNotifications] = useState([]);
  const [isNewNotificationReceived, setIsNewNotificationReceived] = useState(false);

  useEffect(() => {
    if (!userId) {
      return;
    }

    // Fetch all notifications when the component mounts
    fetchAllNotifications();

    // Poll the server for new notifications every 30 seconds
    const notificationPollingInterval = setInterval(fetchAllNotifications, 10000);

    // Clear the interval when the component unmounts
    return () => clearInterval(notificationPollingInterval);
  }, [userId]);

  // Function to fetch all notifications
  const fetchAllNotifications = async () => {
    try {
      const response = await getallnotification();
      const { notifications: allNotifications, unreadCount: newUnreadCount } = response.data;
      console.log('Fetched all notifications:', allNotifications);

      // Compare with the existing notifications to find new ones
      const newNotifications = allNotifications.filter(
        (newNotification) => !notifications.some((oldNotification) => oldNotification._id === newNotification._id)
      );

      if (newNotifications.length > 0 && !isNewNotificationReceived) {
        setNotifications((prevNotifications) => [...prevNotifications, ...newNotifications]);
  

        // Show toast only when new notifications are received
        toast.info(`New Notification Received`);
        setIsNewNotificationReceived(true);
      }
    } catch (error) {
      console.error('Error fetching all notifications:', error.message);
    }
  };

  return (
    <>
      <div>
        <UpNavbar />
      </div>
      <div>
        <Navbar />
      </div>
      <div>
        <h2>Notifications</h2>
       
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id} className={`notification-item${notification.completed ? ' completed' : ''}`}>
              <div>
                <strong>{notification.title}</strong>
                <p>{notification.description}</p>
                <small>{new Date(notification.createdAt).toLocaleString()}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NotificationComponent;
