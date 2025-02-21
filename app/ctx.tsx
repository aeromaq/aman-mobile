import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the Auth Context Type
interface AuthContextType {
  signIn: () => void;
  signOut: () => void;
  session: string | null;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use session
export const useSession = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

// Define the Session Provider
const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<string | null>(null);

  const signIn = () => setSession('user-session-token'); // Placeholder authentication logic
  const signOut = () => setSession(null);

  return (
    <AuthContext.Provider value={{ signIn, signOut, session }}>
      {/* ✅ Ensure Only JSX is Rendered */}
      <>{children}</>
    </AuthContext.Provider>
  );
};

// ✅ Default export
export default SessionProvider;
