'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { PageHeader } from '@/components/ui-system/layout/PageHeader';
import { StatsCard } from '@/components/ui-system/layout/StatsCard';
import { PrimaryButton } from '@/components/ui-system/buttons/PrimaryButton';
import { SearchBar } from '@/components/ui-system/search/SearchBar';
import { SectionCard } from '@/components/ui-system/layout/SectionCard';
import { BaseModal } from '@/components/ui-system/modal/BaseModal';
import { SecondaryButton } from '@/components/ui-system/buttons/SecondaryButton';
import { ShortTextInput } from '@/components/ui-system/inputs/ShortTextInput';
import { NumberInput } from '@/components/ui-system/inputs/NumberInput';
import { DateInput } from '@/components/ui-system/inputs/DateInput';
import { SelectInput } from '@/components/ui-system/inputs/SelectInput';
import { LargeTextInput } from '@/components/ui-system/inputs/LargeTextInput';
import { useAuth } from '@/hooks/useAuth';
import { mockFinanceTransactions, mockMonthlySummaries, mockUsers } from '@/lib/mock-data';
import { FinanceTransaction, TransactionType } from '@/types';
import { toast } from 'sonner';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const typeOptions = [
  { value: 'INCOME', label: 'Income' },
  { value: 'EXPENSE', label: 'Expense' },
];

const incomeCategories = [
  { value: 'Sales', label: 'Sales' },
  { value: 'Consulting', label: 'Consulting' },
  { value: 'Support', label: 'Support' },
  { value: 'Other', label: 'Other' },
];

const expenseCategories = [
  { value: 'Salaries', label: 'Salaries' },
  { value: 'Software', label: 'Software' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Operations', label: 'Operations' },
  { value: 'Other', label: 'Other' },
];

export default function FinancePage() {
  const { currentUser, permissions } = useAuth();
  const [transactions, setTransactions] = useState<FinanceTransaction[]>(mockFinanceTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: 'INCOME' as TransactionType,
    category: '',
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const totalIncome = transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpense;

  const chartData = mockMonthlySummaries.map((m) => ({
    month: m.month.substring(0, 3),
    income: m.totalIncome,
    expense: m.totalExpense,
  }));

  const filteredTransactions = transactions.filter(
    (t) =>
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (!formData.category || formData.amount <= 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingId) {
      setTransactions(
        transactions.map((t) =>
          t.id === editingId
            ? { ...t, ...formData, updatedAt: new Date().toISOString() }
            : t
        )
      );
      toast.success('Transaction updated');
    } else {
      const newTransaction: FinanceTransaction = {
        id: `txn-${Date.now()}`,
        ...formData,
        organizationId: 'org-1',
        createdById: currentUser?.id || '1',
        createdAt: new Date().toISOString(),
      };
      setTransactions([...transactions, newTransaction]);
      toast.success('Transaction added');
    }

    setFormData({
      type: 'INCOME',
      category: '',
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleEdit = (transaction: FinanceTransaction) => {
    setFormData({
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date.split('T')[0],
    });
    setEditingId(transaction.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    toast.success('Transaction deleted');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      type: 'INCOME',
      category: '',
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const getCategoryOptions = () => {
    return formData.type === 'INCOME' ? incomeCategories : expenseCategories;
  };

  const getTransactionColor = (type: TransactionType) => {
    return type === 'INCOME'
      ? 'text-green-600 dark:text-green-400'
      : 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Finance"
        description="Track income and expenses"
        action={
          permissions.canEditFinance ? (
            <PrimaryButton
              onClick={() => setIsModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Transaction
            </PrimaryButton>
          ) : null
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          label="Total Income"
          value={`$${(totalIncome / 1000).toFixed(1)}K`}
          isPositive
        />
        <StatsCard
          label="Total Expense"
          value={`$${(totalExpense / 1000).toFixed(1)}K`}
          isPositive={false}
        />
        <StatsCard
          label="Net Profit"
          value={`$${(netProfit / 1000).toFixed(1)}K`}
          isPositive={netProfit >= 0}
        />
      </div>

      {/* Monthly Overview Chart */}
      <SectionCard title="Monthly Summary">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                }}
              />
              <Legend />
              <Bar dataKey="income" fill="#10b981" name="Income" />
              <Bar dataKey="expense" fill="#ef4444" name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {/* Search */}
      <SearchBar placeholder="Search transactions..." onSearch={setSearchTerm} value={searchTerm} />

      {/* Transactions Table */}
      <SectionCard title="Transactions">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Amount</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Description</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Created By</th>
                {permissions.canEditFinance && (
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.type === 'INCOME'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-4 py-4">{transaction.category}</td>
                  <td className={`px-4 py-4 font-medium ${getTransactionColor(transaction.type)}`}>
                    {transaction.type === 'INCOME' ? '+' : '-'}$
                    {transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-4">{transaction.description}</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {mockUsers.find((u) => u.id === transaction.createdById)?.name || 'Unknown'}
                  </td>
                  {permissions.canEditFinance && (
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(transaction)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(transaction.id)}
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

      {/* Transaction Modal */}
      <BaseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? 'Edit Transaction' : 'Add Transaction'}
        size="md"
        footer={
          <>
            <SecondaryButton onClick={handleCloseModal}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleSave}>
              {editingId ? 'Update' : 'Add'} Transaction
            </PrimaryButton>
          </>
        }
      >
        <div className="space-y-4">
          <SelectInput
            label="Type"
            options={typeOptions}
            value={formData.type}
            onChange={(v) => {
              setFormData({ ...formData, type: v as TransactionType, category: '' });
            }}
            required
          />
          <SelectInput
            label="Category"
            options={getCategoryOptions()}
            value={formData.category}
            onChange={(v) => setFormData({ ...formData, category: v })}
            required
          />
          <NumberInput
            label="Amount"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
            required
            min={0}
          />
          <DateInput
            label="Date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <LargeTextInput
            label="Description"
            placeholder="Add details..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.currentTarget.value })}
          />
        </div>
      </BaseModal>
    </div>
  );
}
