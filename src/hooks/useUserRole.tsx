import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'administrator' | 'doctor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface UserRoleContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  hasAccess: (requiredRole?: UserRole) => boolean;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export function UserRoleProvider({ children }: { children: ReactNode }) {
  // Static demo user - can be changed for testing
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: '1',
    name: 'Dr. John Smith',
    email: 'john.smith@hospital.com',
    role: 'doctor' // Change to 'administrator' to test admin access
  });

  const hasAccess = (requiredRole?: UserRole) => {
    if (!currentUser) return false;
    if (currentUser.role === 'administrator') return true;
    if (!requiredRole) return true;
    return currentUser.role === requiredRole;
  };

  return (
    <UserRoleContext.Provider value={{ currentUser, setCurrentUser, hasAccess }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
}