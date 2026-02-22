'use client';

import React, { createContext, useCallback, useState, useEffect } from 'react';
import { User, Organization, AuthContextType } from '@/types';
import { mockUsers, mockOrganization } from '@/lib/mock-data';

// Create context with undefined default
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state (simulated - in real app would validate token)
  useEffect(() => {
    const initializeAuth = () => {
      // For demo, use the first mock user (OWNER)
      const user = mockUsers[0];
      setCurrentUser(user);
      setOrganizations([mockOrganization]);
      setCurrentOrganization(mockOrganization);
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const switchOrganization = useCallback((orgId: string) => {
    const org = organizations.find((o) => o.id === orgId);
    if (org) {
      setCurrentOrganization(org);
      // In real app, would fetch new user with updated organization context
    }
  }, [organizations]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setCurrentOrganization(null);
    // In real app, would clear tokens and redirect to login
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        organizations,
        currentOrganization,
        loading,
        switchOrganization,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
