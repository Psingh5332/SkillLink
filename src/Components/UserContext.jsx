import defautlProfileImage from './../assets/user-default.png';
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // will hold { username, email, token, etc. }

  export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: '',
    userName: '',
    fullName:'',
    email:'',
    profileImageUrl: defautlProfileImage, // default value
    // add more fields as needed
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);