'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { PageHeader } from '@/components/ui-system/layout/PageHeader';
import { PrimaryButton } from '@/components/ui-system/buttons/PrimaryButton';
import { SearchBar } from '@/components/ui-system/search/SearchBar';
import { SectionCard } from '@/components/ui-system/layout/SectionCard';
import { BaseModal } from '@/components/ui-system/modal/BaseModal';
import { SecondaryButton } from '@/components/ui-system/buttons/SecondaryButton';
import { ShortTextInput } from '@/components/ui-system/inputs/ShortTextInput';
import { EmailInput } from '@/components/ui-system/inputs/EmailInput';
import { LargeTextInput } from '@/components/ui-system/inputs/LargeTextInput';
import { SelectInput } from '@/components/ui-system/inputs/SelectInput';
import { EmptyState } from '@/components/ui-system/feedback/EmptyState';
import { useAuth } from '@/hooks/useAuth';
import { mockLeads, mockUsers } from '@/lib/mock-data';
import { Lead, LeadStatus } from '@/types';
import { toast } from 'sonner';

const statusOptions = [
  { value: 'NEW', label: 'New' },
  { value: 'CONTACTED', label: 'Contacted' },
  { value: 'WON', label: 'Won' },
  { value: 'LOST', label: 'Lost' },
];

const userOptions = mockUsers.map((u) => ({ value: u.id, label: u.name }));

export default function CRMPage() {
  const { permissions } = useAuth();
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'NEW' as LeadStatus,
    assignedToId: '',
    notes: '',
  });

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      toast.error('Please fill in required fields');
      return;
    }

    if (editingId) {
      setLeads(
        leads.map((l) =>
          l.id === editingId
            ? { ...l, ...formData, updatedAt: new Date().toISOString() }
            : l
        )
      );
      toast.success('Lead updated');
    } else {
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        ...formData,
        organizationId: 'org-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setLeads([...leads, newLead]);
      toast.success('Lead created');
    }

    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      status: 'NEW',
      assignedToId: '',
      notes: '',
    });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleEdit = (lead: Lead) => {
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || '',
      company: lead.company || '',
      status: lead.status,
      assignedToId: lead.assignedToId || '',
      notes: lead.notes || '',
    });
    setEditingId(lead.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setLeads(leads.filter((l) => l.id !== id));
    toast.success('Lead deleted');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      status: 'NEW',
      assignedToId: '',
      notes: '',
    });
  };

  const getAssignedUserName = (userId?: string) => {
    if (!userId) return 'Unassigned';
    return mockUsers.find((u) => u.id === userId)?.name || 'Unknown';
  };

  const getStatusColor = (status: LeadStatus) => {
    const colors: Record<LeadStatus, string> = {
      NEW: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
      CONTACTED: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
      WON: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      LOST: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    };
    return colors[status];
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="CRM"
        description="Manage your sales leads"
        action={
          permissions.canEditCRM ? (
            <PrimaryButton
              onClick={() => setIsModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Lead
            </PrimaryButton>
          ) : null
        }
      />

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SearchBar placeholder="Search leads..." onSearch={setSearchTerm} value={searchTerm} />
        <SelectInput
          placeholder="All Statuses"
          options={[{ value: '', label: 'All Statuses' }, ...statusOptions]}
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </div>

      {/* Leads Table */}
      {filteredLeads.length > 0 ? (
        <SectionCard title="Leads">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Phone</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Assigned To</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Created</th>
                  {permissions.canEditCRM && (
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-4 py-4 font-medium">{lead.name}</td>
                    <td className="px-4 py-4">{lead.email}</td>
                    <td className="px-4 py-4">{lead.phone || '-'}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">{getAssignedUserName(lead.assignedToId)}</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    {permissions.canEditCRM && (
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(lead)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-950 hover:text-red-600 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      ) : (
        <EmptyState
          title="No leads found"
          description={
            searchTerm
              ? 'Try adjusting your search criteria'
              : 'Create your first lead to get started'
          }
          action={
            permissions.canEditCRM ? (
              <PrimaryButton onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
                Add Lead
              </PrimaryButton>
            ) : null
          }
        />
      )}

      {/* Lead Modal */}
      <BaseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? 'Edit Lead' : 'Add New Lead'}
        size="lg"
        footer={
          <>
            <SecondaryButton onClick={handleCloseModal}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleSave}>
              {editingId ? 'Update Lead' : 'Create Lead'}
            </PrimaryButton>
          </>
        }
      >
        <div className="space-y-4">
          <ShortTextInput
            label="Lead Name"
            placeholder="Company or person name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <EmailInput
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <ShortTextInput
            label="Phone"
            placeholder="+1-555-0000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <ShortTextInput
            label="Company"
            placeholder="Company name"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
          <SelectInput
            label="Status"
            options={statusOptions}
            value={formData.status}
            onChange={(v) => setFormData({ ...formData, status: v as LeadStatus })}
          />
          <SelectInput
            label="Assign To"
            options={[{ value: '', label: 'Unassigned' }, ...userOptions]}
            value={formData.assignedToId}
            onChange={(v) => setFormData({ ...formData, assignedToId: v })}
          />
          <LargeTextInput
            label="Notes"
            placeholder="Add notes about this lead..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.currentTarget.value })}
          />
        </div>
      </BaseModal>
    </div>
  );
}
