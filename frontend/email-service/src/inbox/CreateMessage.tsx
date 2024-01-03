import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./Sidebar";
import "../styles/createmessage.css"

const CreateMessage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [recipient, setRecipient] = useState('');
    const sendMessageUrl = "http://localhost:3001/send";
    const sender = localStorage.getItem("email");
    const navigate = useNavigate();

    const handleCreateMessage = async () => {
        const response = await fetch(sendMessageUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ title, content, recipient, sender }),
        })
        if(response.ok) {
            // neki feedback
            navigate("/");
        }
        else {
            console.log("Error sending message")
        }
    }

    return (
  <div className="create-message-container">
    <div className="sidebar">
      <SideBar />
    </div>
    <div className="form-container">
      <h1 className="heading">Create a new Message</h1>
      <input
        type="text"
        placeholder="Recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input"
      />
      <textarea
        placeholder="Content ..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="input content-input custom-textarea"
      />
      <button onClick={handleCreateMessage} className="button">
        Send
      </button>
    </div>
  </div>
);


}

export default CreateMessage;