"use client";
import { useState, useEffect } from "react";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { ApiEndpoint } from "@/constants";
import { useRouter } from "next/navigation";

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
      return data.data.reverse();
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
      })),
    );
  };

  const markSingleAsRead = (notificationId: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const navigate = useRouter();
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
              <p className="text-gray-500 text-lg text-center">
                No notifications available.
              </p>
            </div>
          ) : (
            notifications.map((notification: any) => {
              const [header, ...descriptionLines] =
                notification.message.split("\n");
              const description = descriptionLines.join("\n");
              console.log("notifications", notification);
              return (
                <div
                  key={notification.id}
                  className={`w-[99%] px-2 h-20 py-2 border-l-5 rounded-r-lg my-5 relative ${
                    notification.read
                      ? "bg-[#e5eef9] border-l-[#8a8c8a5b]"
                      : "bg-white border-l-[#00FF00]"
                  }`}
                >
                  <header className="w-full flex justify-between pb-2">
                    <p className="text-base">
                      Problem has been marked as {notification?.problem?.status}
                      !
                    </p>
                    <p className="text-base">{notification.formattedDate}</p>
                  </header>
                  <p className="text-base">{notification.message}</p>
                  <div className="text-[90%] h-full  w-full">
                    {description.split("\n").map((line: any, index: any) => (
                      <h6 key={index} className="m-0">
                        {line}
                      </h6>
                    ))}
                    <div className="absolute right-2 bottom-1 flex gap-3 items-center">
                      {notification.type == "SOLUTION" &&
                        notification.problem && (
                          <button
                            onClick={() =>
                              navigate.push(
                                `/app/citizen/notifications/${notification?.problem?.id}`,
                              )
                            }
                            className="p-2 text-[80%] rounded-xl bg-gradient-to-tl from-gray-500 to-gray-200 hover:from-blue-500 flex items-center gap-2"
                          >
                            <MdOutlineMarkEmailRead />
                            View More
                          </button>
                        )}
                      {!notification.read && (
                        <button
                          onClick={() => markSingleAsRead(notification.id)}
                          className="p-2 text-[80%] rounded-xl bg-gradient-to-tl from-gray-500 to-gray-200 hover:from-blue-500 flex items-center gap-2"
                        >
                          <MdOutlineMarkEmailRead />
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
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
