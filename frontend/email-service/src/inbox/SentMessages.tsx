import React, { useEffect, useState } from "react";
import Message from "../models/Message";
import '../styles/sentmessages.css'
import SideBar from "./Sidebar";
import MessageCard from "./MessageCard";

const SentMessages = () => {

    const [sentMessages, setSentMessages] = useState<Message[]>([]);
    const userIdString = localStorage.getItem("userId");
    const userId = parseInt(userIdString!, 10);
    const sentMessagesUrl = "http://localhost:3001/sentMessages?id=";

    useEffect(() => {
        const fetchMessages = async () => {
          try {
            const response = await fetch(sentMessagesUrl + userId);
      
            if (!response.ok) {
              throw new Error("Failed to fetch");
            }
      
            const data = await response.json();
            setSentMessages(data);
          } catch (error) {
            console.error("Error fetching messages", error);
          }
        };
      
        fetchMessages();
      
      }, []);


      return (
        <div className="inbox-container">
          <div className="sidebar">
            <SideBar />
          </div>
          <div className="main-content">
            <h1>Sent Messages</h1>
            <div className="message-list">
              {sentMessages.length > 0 ? (
                sentMessages.map((message) => (
                  <div key={message.id}>
                    <MessageCard message={message} displayButtons={false} displayColor={false}/>
                  </div>
                ))
              ) : (
                <p>No messages</p>
              )}
            </div>
          </div>
        </div>
      );
      

}

export default SentMessages;