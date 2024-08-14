import React, { useEffect, useState } from 'react';
import { BsPersonCircle, BsJustify, BsFillBellFill } from 'react-icons/bs';
import axios from 'axios';
import { Modal, Badge, Button } from 'react-bootstrap';

function AdminHeader({ OpenMenu }) {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch notifications when the component mounts
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/admin/notifications');
        // Ensure notifications is always an array
        setNotifications(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        // Handle error or show a user-friendly message
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleBellClick = () => {
    setShowModal(true);
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.put(`http://localhost:9001/api/admin/notifications/${notificationId}/read`);
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== notificationId)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
      // Handle error or show a user-friendly message
    }
  };

  const unreadCount = notifications.length;

  return (
    <header className='header' style={{marginTop:"10px"}}>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenMenu} />
      </div>

      <div className='header-right'>
        <div className="notification-icon" onClick={handleBellClick}>
          <BsFillBellFill className='icon' />
          {unreadCount > 0 && (
            <Badge pill variant="danger" className="notification-badge">
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>

      {/* Notifications Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification._id} className="notification-item">
                <p>{notification.message}</p>
                <Button variant="outline-primary" onClick={() => handleMarkAsRead(notification._id)}>
                  Mark as Read
                </Button>
              </div>
            ))
          ) : (
            <p>No new notifications.</p>
          )}
        </Modal.Body>
      </Modal>
    </header>
  );
}

export default AdminHeader;
