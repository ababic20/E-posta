import React from "react";
import '../styles/sidebar.css'

const SideBar = () => {
    return (
        <div className="sidebar">
          <ul>
            <li><a href="/sent">Sent</a><br/></li>
            <li><a href="/">Received</a><br/></li>
            <li><a href="/create-message">Create Message</a><br/></li>
          </ul>
        </div>
      );
}

export default SideBar;