'use client';

import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { PageHeader } from '@/components/ui-system/layout/PageHeader';
import { SectionCard } from '@/components/ui-system/layout/SectionCard';
import { PrimaryButton } from '@/components/ui-system/buttons/PrimaryButton';
import { SecondaryButton } from '@/components/ui-system/buttons/SecondaryButton';
import { DangerButton } from '@/components/ui-system/buttons/DangerButton';
import { ShortTextInput } from '@/components/ui-system/inputs/ShortTextInput';
import { LargeTextInput } from '@/components/ui-system/inputs/LargeTextInput';
import { ConfirmModal } from '@/components/ui-system/modal/ConfirmModal';
import { useAuth } from '@/hooks/useAuth';
import { mockOrganization, mockUsers } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { permissions, currentUser } = useAuth();
  const [orgData, setOrgData] = useState({
    name: mockOrganization.name,
    website: mockOrganization.website || '',
    description: mockOrganization.description || '',
  });

  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [isDeletingOrg, setIsDeletingOrg] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleUpdateOrganization = () => {
    toast.success('Organization updated successfully');
  };

  const handleUpdateProfile = () => {
    toast.success('Profile updated successfully');
  };

  const handleChangePassword = () => {
    if (passwordData.new !== passwordData.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordData.new.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    toast.success('Password changed successfully');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleDeleteOrganization = () => {
    toast.success('Organization deletion initiated. Please check your email for confirmation.');
    setIsDeletingOrg(false);
  };

  if (!permissions.canAccessSettings) {
    return (
      <div className="space-y-8">
        <PageHeader title="Settings" description="Access denied" />
        <SectionCard>
          <p className="text-center text-muted-foreground">
            You don't have permission to access settings
          </p>
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Manage your organization and account"
      />

      {/* Organization Settings */}
      {permissions.canAccessSettings && (
        <SectionCard
          title="Organization Information"
          description="Update your organization details"
        >
          <div className="space-y-4">
            <ShortTextInput
              label="Organization Name"
              value={orgData.name}
              onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
            />
            <ShortTextInput
              label="Website"
              type="url"
              placeholder="https://example.com"
              value={orgData.website}
              onChange={(e) => setOrgData({ ...orgData, website: e.target.value })}
            />
            <LargeTextInput
              label="Description"
              placeholder="Tell us about your organization..."
              value={orgData.description}
              onChange={(e) => setOrgData({ ...orgData, description: e.currentTarget.value })}
            />
            <div className="pt-4">
              <PrimaryButton onClick={handleUpdateOrganization}>
                Save Changes
              </PrimaryButton>
            </div>
          </div>
        </SectionCard>
      )}

      {/* Profile Settings */}
      <SectionCard
        title="Profile Information"
        description="Update your personal details"
      >
        <div className="space-y-4">
          <ShortTextInput
            label="Full Name"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
          />
          <ShortTextInput
            label="Email"
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            disabled
          />
          <div className="pt-4">
            <PrimaryButton onClick={handleUpdateProfile}>
              Save Changes
            </PrimaryButton>
          </div>
        </div>
      </SectionCard>

      {/* Change Password */}
      <SectionCard
        title="Change Password"
        description="Update your password to keep your account secure"
      >
        <div className="space-y-4">
          <ShortTextInput
            label="Current Password"
            type="password"
            value={passwordData.current}
            onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
          />
          <ShortTextInput
            label="New Password"
            type="password"
            value={passwordData.new}
            onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
          />
          <ShortTextInput
            label="Confirm Password"
            type="password"
            value={passwordData.confirm}
            onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
          />
          <div className="pt-4">
            <PrimaryButton onClick={handleChangePassword}>
              Update Password
            </PrimaryButton>
          </div>
        </div>
      </SectionCard>

      {/* Danger Zone */}
      {permissions.canAccessSettings && (
        <SectionCard
          title="Danger Zone"
          description="Irreversible actions"
          className="border-red-200 dark:border-red-900"
        >
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                  Delete Organization
                </h4>
                <p className="text-sm text-red-800 dark:text-red-200 mb-4">
                  Permanently delete your organization and all associated data. This action cannot be undone.
                </p>
                <DangerButton onClick={() => setIsDeletingOrg(true)}>
                  Delete Organization
                </DangerButton>
              </div>
            </div>
          </div>
        </SectionCard>
      )}

      {/* Delete Organization Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeletingOrg}
        onClose={() => setIsDeletingOrg(false)}
        title="Delete Organization"
        message="Are you sure you want to delete your organization? This action cannot be undone and all data will be permanently lost."
        confirmText="Delete Permanently"
        cancelText="Cancel"
        isDangerous
        onConfirm={handleDeleteOrganization}
      />
    </div>
  );
}
