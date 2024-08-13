// import React, { createContext, useEffect, useContext, useState } from 'react'

// const AuthContext = createContext()

// // Export the useAuth hook
// export const useAuth = () => useContext(AuthContext)

// const AuthProvider = ({ children = null }) => {
//     const [auth, setAuth] = useState({
//         user: null,
//         token: ""
//     });

//     useEffect(() => {
//         const data = localStorage.getItem('auth');
//         if (data) {
//             const parseData = JSON.parse(data);
//             setAuth({
//                 ...auth,
//                 user: parseData.user,
//                 'token':`Bearer ${parseData.token}`,
//             });
//         }
//         // eslint-disable-nextline
//     }, []);

//     return (
//         <AuthContext.Provider value={[auth, setAuth]}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
// // Export the AuthProvider component
// export default AuthProvider

import React, { createContext, useEffect, useContext, useState } from "react";

const AuthContext = createContext();

// Export the useAuth hook
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children = null }) => {
  const [auth, setAuth] = useState(() => {
    // Initialize state from localStorage if available
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      return JSON.parse(storedAuth);
    }
    return { user: null, token: "" };
  });

  useEffect(() => {
    // Save the auth state to localStorage whenever it changes
    if (auth.token) {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the AuthProvider component
export default AuthProvider;
