import React, { useEffect, useState } from "react";
import '../styles/inbox.css';
import Message from "../models/Message";
import MessageCard from "./MessageCard";
import SideBar from "./Sidebar";
const messagesUrl = "http://localhost:3001/receivedMessages?id=";

interface InboxProps {
    userId : number
}

const Inbox : React.FC<InboxProps> = ({ userId }) => {

    const [messages, setMessages] = useState<Message[]>([]);
    const [viewDetails, setViewDetails] = useState(false);
    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const response = await fetch(messagesUrl + userId);
    
          if (!response.ok) {
            throw new Error("Failed to fetch");
          }
    
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error("Error fetching messages", error);
        }
      };
    
      fetchMessages();
    
    }, []);

    
    return (
        <div className="inbox-container">
          <div className="sidebar">
            <SideBar/>
          </div>
          <div className="main-content">
              <h1>Inbox</h1>
            <div className="message-list">
              {messages.map((message) => (
                <div key={message.id}>
                  <MessageCard message={message} displayButtons={true} displayColor={true}/>
                </div>
             ))}
            </div>
          </div>
        </div>
      );
      
}

export default Inbox;