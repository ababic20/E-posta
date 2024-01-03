import React from "react";
import Message from "../models/Message";
import { NavLink, useNavigate } from "react-router-dom";

interface MessageCardProps {
  message: Message;
  displayButtons: boolean;
  displayColor: boolean;
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  displayButtons,
  displayColor,
}) => {
  const updateMessageStatusUrl =
    "http://localhost:3001/updateMessageStatus?id=";
  const navigate = useNavigate();

  const truncateContent = (content: string): string => {
    const maxLength = 36;
    return content.length > maxLength
      ? `${content.slice(0, maxLength)}...`
      : content;
  };

  const handleMarkAsRead = async () => {
    const id = message.id;
    const response = await fetch(updateMessageStatusUrl + id);
    if (response.ok) {
      window.location.reload();
    } else {
      console.log("Error sending message");
    }
  };

  const toggleViewDetails = () => {
    message.read = true;
    navigate(`/message/${message.id}`, { state: { message } });
  }


  return (
    <div className="message-card">
      <div
        className="card"
        style={{
          width: "18rem",
          backgroundColor: !displayColor
            ? "#ffffff"
            : message.read
            ? "#ffffff"
            : "#F9E79F",
          marginBottom: "10px",
        }}
      >
        <div className="card-body">
          <h5 className="card-title">{message.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{message.sender}</h6>
          <p className="card-text overflow-hidden text-nowrap">
            {truncateContent(message.content)}
          </p>
          <button
            className="card-link"
            style={{
              color: "#121212",
              fontWeight: "bold",
            }}
            onClick={toggleViewDetails}
          >
            Open
          </button>
          {displayButtons &&
            (message.read ? (
              ""
            ) : (
              <button
                className="card-link"
                onClick={handleMarkAsRead}
                style={{
                  color: "#121212",
                  fontWeight: "bold",
                }}
              >
                Mark as Read
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
