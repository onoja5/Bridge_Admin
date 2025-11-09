import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // ✅ Add your states here
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Add your side effects or initialization logic here
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        // ✅ Add other context values you want to share here
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
