'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { OrganizationRole } from '@/types';
import {
  canAccessCRM,
  canEditCRM,
  canManageMembers,
  canChangeRoles,
  canRemoveMembers,
  canAccessFinance,
  canEditFinance,
  canAccessSettings,
  canViewAuditLogs,
  hasPermission,
} from '@/lib/rbac';

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  const { currentUser, currentOrganization } = context;
  const userRole = (currentUser?.role || 'MEMBER') as OrganizationRole;

  return {
    ...context,
    userRole,
    // Permission shortcuts
    permissions: {
      canAccessCRM: canAccessCRM(userRole),
      canEditCRM: canEditCRM(userRole),
      canManageMembers: canManageMembers(userRole),
      canInviteMembers: hasPermission(userRole, 'canInviteMembers'),
      canChangeRoles: canChangeRoles(userRole),
      canRemoveMembers: canRemoveMembers(userRole),
      canAccessFinance: canAccessFinance(userRole),
      canEditFinance: canEditFinance(userRole),
      canAccessSettings: canAccessSettings(userRole),
      canViewAuditLogs: canViewAuditLogs(userRole),
    },
  };
}
