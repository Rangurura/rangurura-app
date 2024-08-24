"use client";
import { useState, useEffect } from "react";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { ApiEndpoint } from "@/constants";

type Notification = {
  id: string;
  message: string;
  recipient: {
    name: string;
    email: string;
  };
  createdAt: string[];
  read: boolean;
};

const fetchNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await ApiEndpoint.get("/notifs/all");
    const data = response.data;
    if (data.success && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.error("Fetched data is not in the expected format", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching notifications", error);
    return [];
  }
};

const Page = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await fetchNotifications();
      setNotifications(data);
      setLoading(false);
    };
    loadNotifications();
  }, []);

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const markSingleAsRead = (notificationId: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full h-[90%] flex items-center justify-between mt-4">
      <div className="w-full h-full">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-[1.5rem] font-extrabold">Notifications</h1>
          {notifications.length > 0 && (
            <button
              type="button"
              className="text-[90%] bg-gradient-to-r from-gray-400 to-gray-300 flex items-center gap-2 text-white font-bold py-2 px-4 rounded-md"
              onClick={markAllAsRead}
            >
              <MdOutlineMarkEmailRead />
              Mark All As Read
            </button>
          )}
        </div>
        <div className="w-full h-[90%] overflow-y-auto my-4 notifications-container">
          {notifications.length === 0 ? (
            <div className="flex">
              <p className="text-gray-500 text-lg text-center">No notifications available.</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const [header, ...descriptionLines] =
                notification.message.split("\n");
              const description = descriptionLines.join("\n");

              return (
                <div
                  key={notification.id}
                  className={`w-[99%] px-2 py-3 border-l-5 rounded-r-lg ${
                    notification.read
                      ? "bg-[#e5eef9] border-l-[#8a8c8a5b]"
                      : "bg-white border-l-[#00FF00]"
                  } my-2`}
                >
                  <header className="w-full flex justify-between pb-2">
                    <p className="text-[80%]">{header}</p>
                    <p className="text-[80%]">
                      {notification.createdAt.join(" ")}
                    </p>
                  </header>
                  <p className="text-[90%] relative w-full">
                    {description.split("\n").map((line, index) => (
                      <h6 key={index} className="m-0">
                        {line}
                      </h6>
                    ))}
                    {!notification.read && (
                      <button
                        onClick={() => markSingleAsRead(notification.id)}
                        className="p-2 text-[80%] rounded-xl absolute right-0 bottom-[-0.5rem] bg-gradient-to-tl from-gray-500 to-gray-200 hover:from-blue-500 flex items-center gap-2"
                      >
                        <MdOutlineMarkEmailRead />
                        Mark as Read
                      </button>
                    )}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
