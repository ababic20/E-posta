import React from 'react';
import Inbox from './inbox/Inbox';


function App() {

  const userIdString = localStorage.getItem("userId");
  const userId = parseInt(userIdString!, 10);

  return (
    <div>
      {userId ? (
        <Inbox userId={userId}/>
      ) : (
        <p>Welcome. This is the homepage. Please log in to continue!</p>
      )}
    </div>
  );
}

export default App;
