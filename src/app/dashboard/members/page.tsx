'use client';

import React, { useState } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { PageHeader } from '@/components/ui-system/layout/PageHeader';
import { PrimaryButton } from '@/components/ui-system/buttons/PrimaryButton';
import { SearchBar } from '@/components/ui-system/search/SearchBar';
import { SectionCard } from '@/components/ui-system/layout/SectionCard';
import { BaseModal } from '@/components/ui-system/modal/BaseModal';
import { SecondaryButton } from '@/components/ui-system/buttons/SecondaryButton';
import { EmailInput } from '@/components/ui-system/inputs/EmailInput';
import { SelectInput } from '@/components/ui-system/inputs/SelectInput';
import { useAuth } from '@/hooks/useAuth';
import { mockUsers } from '@/lib/mock-data';
import { OrganizationRole } from '@/types';
import { toast } from 'sonner';

const roleOptions = [
  { value: 'OWNER', label: 'Owner' },
  { value: 'ADMIN', label: 'Admin' },
  { value: 'MEMBER', label: 'Member' },
];

export default function MembersPage() {
  const { permissions } = useAuth();
  const [members, setMembers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ email: '', role: 'MEMBER' });

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInvite = () => {
    if (!formData.email) {
      toast.error('Please enter an email');
      return;
    }

    toast.success(`Invitation sent to ${formData.email}`);
    setFormData({ email: '', role: 'MEMBER' });
    setIsModalOpen(false);
  };

  const handleRemoveMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
    toast.success('Member removed');
  };

  const handleChangeRole = (id: string, newRole: OrganizationRole) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, role: newRole } : m)));
    toast.success('Role updated');
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Members"
        description="Manage your team members"
        action={
          permissions.canInviteMembers ? (
            <PrimaryButton
              onClick={() => setIsModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Invite Member
            </PrimaryButton>
          ) : null
        }
      />

      {/* Search Bar */}
      <SearchBar placeholder="Search members..." onSearch={setSearchTerm} value={searchTerm} />

      {/* Members Table */}
      <SectionCard title="Team Members">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Email</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Role</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Joined</th>
                {permissions.canManageMembers && (
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">
                        {member.avatar}
                      </div>
                      {member.name}
                    </div>
                  </td>
                  <td className="px-4 py-4">{member.email}</td>
                  <td className="px-4 py-4">
                    {permissions.canChangeRoles ? (
                      <select
                        value={member.role}
                        onChange={(e) => handleChangeRole(member.id, e.target.value as OrganizationRole)}
                        className="px-2 py-1 rounded border border-input bg-background text-sm"
                      >
                        {roleOptions.map((role) => (
                          <option key={role.value} value={role.value}>
                            {role.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="px-2 py-1 rounded-md bg-muted text-sm font-medium">
                        {member.role}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    {new Date(member.joinedAt).toLocaleDateString()}
                  </td>
                  {permissions.canManageMembers && (
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          disabled={member.role === 'OWNER' && !permissions.canRemoveMembers}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {permissions.canRemoveMembers && member.role !== 'OWNER' && (
                          <button
                            onClick={() => handleRemoveMember(member.id)}
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-950 hover:text-red-600 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Invite Modal */}
      <BaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Invite Member"
        size="sm"
        footer={
          <>
            <SecondaryButton onClick={() => setIsModalOpen(false)}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleInvite}>Send Invitation</PrimaryButton>
          </>
        }
      >
        <div className="space-y-4">
          <EmailInput
            label="Email Address"
            placeholder="member@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <SelectInput
            label="Role"
            options={roleOptions}
            value={formData.role}
            onChange={(role) => setFormData({ ...formData, role })}
            required
          />
        </div>
      </BaseModal>
    </div>
  );
}
