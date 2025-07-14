import React, { useEffect, useState } from "react";
import "./navbar.css";

const Notification = "/img/notification.svg";
const Message = "/img/message.svg";
const Settings = "/img/settings.svg";

interface NotificationData {
  senderName: string;
  type: number;
}

interface NavbarProps {
  socket: any;
}

const Navbar: React.FC<NavbarProps> = ({ socket }) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (data: NotificationData) => {
      setNotifications((prev) => [...prev, data]);
    };

    socket.on("getNotification", handleNotification);

    // Cleanup function to remove event listener
    return () => {
      socket.off("getNotification", handleNotification);
    };
  }, [socket]);

  const displayNotification = ({ senderName, type }: NotificationData) => {
    let action: string;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post.`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <span className="logo">Lama App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Notification} className="iconImg" alt="" />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Message} className="iconImg" alt="" />
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Settings} className="iconImg" alt="" />
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n, index) => (
            <div key={index}>{displayNotification(n)}</div>
          ))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;