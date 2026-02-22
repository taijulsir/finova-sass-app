'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui-system/layout/PageHeader';
import { SectionCard } from '@/components/ui-system/layout/SectionCard';
import { SearchBar } from '@/components/ui-system/search/SearchBar';
import { SelectInput } from '@/components/ui-system/inputs/SelectInput';
import { useAuth } from '@/hooks/useAuth';
import { mockAuditLogs } from '@/lib/mock-data';

const moduleOptions = [
  { value: '', label: 'All Modules' },
  { value: 'ORGANIZATION', label: 'Organization' },
  { value: 'MEMBERS', label: 'Members' },
  { value: 'CRM', label: 'CRM' },
  { value: 'FINANCE', label: 'Finance' },
  { value: 'SUBSCRIPTION', label: 'Subscription' },
  { value: 'SETTINGS', label: 'Settings' },
];

const actionIcons: Record<string, string> = {
  CREATE: '➕',
  UPDATE: '✏️',
  DELETE: '🗑️',
  INVITE: '📧',
  REMOVE: '❌',
  ROLE_CHANGE: '👤',
  LOGIN: '🔓',
  LOGOUT: '🔒',
};

export default function AuditPage() {
  const { permissions } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState('');

  if (!permissions.canViewAuditLogs) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Audit Logs"
          description="Access denied"
        />
        <SectionCard>
          <p className="text-center text-muted-foreground">
            You don't have permission to view audit logs
          </p>
        </SectionCard>
      </div>
    );
  }

  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch = log.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = !moduleFilter || log.module === moduleFilter;
    return matchesSearch && matchesModule;
  });

  const getActionColor = (action: string) => {
    const colors: Record<string, string> = {
      CREATE: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      UPDATE: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
      DELETE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
      INVITE: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
      REMOVE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
      ROLE_CHANGE: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
      LOGIN: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      LOGOUT: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100',
    };
    return colors[action] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Audit Logs"
        description="Track all organization activities"
      />

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SearchBar
          placeholder="Search by user email..."
          onSearch={setSearchTerm}
          value={searchTerm}
        />
        <SelectInput
          options={moduleOptions}
          value={moduleFilter}
          onChange={setModuleFilter}
        />
      </div>

      {/* Audit Logs */}
      <SectionCard title="Activity Log">
        <div className="space-y-4">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-4 pb-4 border-b border-border last:pb-0 last:border-b-0"
              >
                <div className="text-2xl">{actionIcons[log.action] || '🔔'}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{log.userEmail}</p>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground">
                        {log.module}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {log.resourceType && `Modified ${log.resourceType}`}
                    {log.changes && (
                      <span className="ml-2">
                        • {JSON.stringify(log.changes).substring(0, 50)}...
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No audit logs found
            </div>
          )}
        </div>
      </SectionCard>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SectionCard title="Total Actions">
          <p className="text-3xl font-bold">{mockAuditLogs.length}</p>
        </SectionCard>
        <SectionCard title="Active Users">
          <p className="text-3xl font-bold">
            {new Set(mockAuditLogs.map((l) => l.userId)).size}
          </p>
        </SectionCard>
        <SectionCard title="Most Active Module">
          <p className="text-3xl font-bold">
            {
              Object.entries(
                mockAuditLogs.reduce(
                  (acc, log) => {
                    acc[log.module] = (acc[log.module] || 0) + 1;
                    return acc;
                  },
                  {} as Record<string, number>
                )
              ).sort((a, b) => b[1] - a[1])[0]?.[0]
            }
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
