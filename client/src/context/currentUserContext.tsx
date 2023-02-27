import { createContext, useContext } from 'react';

export interface CurrentUserType {
  username: string;
  isLoggedin: boolean;
}

export interface CurrentUserContextType {
  user: CurrentUserType;
  setUser: (currentUser: CurrentUserType) => void;
}

export const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

export const useCurrentUser = () => {
  const currentUserContext = useContext(CurrentUserContext);

  if (!currentUserContext) {
    throw new Error('useCurrentUser has to be used within <CurrentUserContext.Provider>');
  }

  return currentUserContext;
};
