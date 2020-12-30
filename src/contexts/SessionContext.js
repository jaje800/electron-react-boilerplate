import React, { createContext, useState } from 'react';
export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {

  const [keepSignedIn, setKeepSignedIn] = useState('false');

  return (
    <SessionContext.Provider
      value={{
        keepSignedIn,
        setKeepSignedIn,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
export default SessionContextProvider;
