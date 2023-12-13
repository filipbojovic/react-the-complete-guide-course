import React, { useState } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';


function App() {
  const [usersList, setUsersList] = useState([]);

  const usersListHandler = (userName, userAge) => {
    setUsersList((prevState) => { // whenever our state depends on the previous one, we should always use function
      console.log(userName, userAge);
      return [...prevState, { name: userName, age: userAge, id: Math.random().toString() }]; // copy the previous state and add the new user
    })
  }

  return (
    // <>
    <React.Fragment>
      <AddUser onAddUser={usersListHandler} />
      <UsersList users={usersList} />
    </React.Fragment> 
    // </> -> either use <> or <React.Fragment>. '<>' can be used only if project is setup so it supports it.
  );
}

export default App;
