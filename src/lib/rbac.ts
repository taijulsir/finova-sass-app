import { OrganizationRole, PermissionSet } from '@/types';

// Permission matrix by role
const PERMISSION_MATRIX: Record<OrganizationRole, PermissionSet> = {
  OWNER: {
    canManageOrganization: true,
    canManageMembers: true,
    canInviteMembers: true,
    canRemoveMembers: true,
    canChangeRoles: true,
    canAccessCRM: true,
    canEditCRM: true,
    canAccessFinance: true,
    canEditFinance: true,
    canViewSubscription: true,
    canViewAuditLogs: true,
    canAccessSettings: true,
  },
  ADMIN: {
    canManageOrganization: false,
    canManageMembers: true,
    canInviteMembers: true,
    canRemoveMembers: false,
    canChangeRoles: false,
    canAccessCRM: true,
    canEditCRM: true,
    canAccessFinance: true,
    canEditFinance: true,
    canViewSubscription: true,
    canViewAuditLogs: true,
    canAccessSettings: false,
  },
  MEMBER: {
    canManageOrganization: false,
    canManageMembers: false,
    canInviteMembers: false,
    canRemoveMembers: false,
    canChangeRoles: false,
    canAccessCRM: true,
    canEditCRM: false,
    canAccessFinance: true,
    canEditFinance: false,
    canViewSubscription: true,
    canViewAuditLogs: false,
    canAccessSettings: false,
  },
};

/**
 * Get permissions for a given role
 */
export function getPermissions(role: OrganizationRole): PermissionSet {
  return PERMISSION_MATRIX[role];
}

/**
 * Check if a user has a specific permission
 */
export function hasPermission(
  role: OrganizationRole,
  permission: keyof PermissionSet
): boolean {
  const permissions = getPermissions(role);
  return permissions[permission] === true;
}

/**
 * Check if user can perform action on CRM
 */
export function canAccessCRM(role: OrganizationRole): boolean {
  return hasPermission(role, 'canAccessCRM');
}

/**
 * Check if user can edit CRM
 */
export function canEditCRM(role: OrganizationRole): boolean {
  return hasPermission(role, 'canEditCRM');
}

/**
 * Check if user can manage members
 */
export function canManageMembers(role: OrganizationRole): boolean {
  return hasPermission(role, 'canManageMembers');
}

/**
 * Check if user can change roles
 */
export function canChangeRoles(role: OrganizationRole): boolean {
  return hasPermission(role, 'canChangeRoles');
}

/**
 * Check if user can remove members
 */
export function canRemoveMembers(role: OrganizationRole): boolean {
  return hasPermission(role, 'canRemoveMembers');
}

/**
 * Check if user can access finance
 */
export function canAccessFinance(role: OrganizationRole): boolean {
  return hasPermission(role, 'canAccessFinance');
}

/**
 * Check if user can edit finance
 */
export function canEditFinance(role: OrganizationRole): boolean {
  return hasPermission(role, 'canEditFinance');
}

/**
 * Check if user can access organization settings
 */
export function canAccessSettings(role: OrganizationRole): boolean {
  return hasPermission(role, 'canAccessSettings');
}

/**
 * Check if user can view audit logs
 */
export function canViewAuditLogs(role: OrganizationRole): boolean {
  return hasPermission(role, 'canViewAuditLogs');
}

/**
 * Get all roles that can be assigned to a new member
 * OWNER can assign any role
 * ADMIN cannot assign OWNER or ADMIN roles
 * MEMBER cannot assign any roles
 */
export function getAssignableRoles(userRole: OrganizationRole): OrganizationRole[] {
  switch (userRole) {
    case 'OWNER':
      return ['OWNER', 'ADMIN', 'MEMBER'];
    case 'ADMIN':
      return ['MEMBER'];
    case 'MEMBER':
      return [];
    default:
      return [];
  }
}
