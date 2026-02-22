'use client';

import React from 'react';
import { TrendingUp, Users, DollarSign, PieChart } from 'lucide-react';
import { PageHeader } from '@/components/ui-system/layout/PageHeader';
import { StatsCard } from '@/components/ui-system/layout/StatsCard';
import { SectionCard } from '@/components/ui-system/layout/SectionCard';
import {
  mockMonthlySummaries,
  mockLeads,
  mockFinanceTransactions,
  mockUsers,
} from '@/lib/mock-data';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function DashboardPage() {
  const totalIncome = mockFinanceTransactions
    .filter((t) => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = mockFinanceTransactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpense;
  const activeLeads = mockLeads.filter((l) => l.status !== 'LOST').length;

  // Chart data
  const chartData = mockMonthlySummaries.map((m) => ({
    month: m.month.substring(0, 3),
    income: m.totalIncome,
    expense: m.totalExpense,
    profit: m.netProfit,
  }));

  // Recent activities
  const recentActivities = [
    { action: 'New lead created', details: 'David Solutions', time: '2 hours ago' },
    { action: 'Income recorded', details: '+$5,000', time: '5 hours ago' },
    { action: 'Member invited', details: 'emma@company.com', time: '1 day ago' },
    { action: 'Expense added', details: '-$8,000 Marketing', time: '2 days ago' },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Overview of your business metrics"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Total Revenue"
          value={`$${(totalIncome / 1000).toFixed(1)}K`}
          change="+12% from last month"
          isPositive
          icon={<DollarSign className="h-6 w-6" />}
        />
        <StatsCard
          label="Total Expenses"
          value={`$${(totalExpense / 1000).toFixed(1)}K`}
          change="+8% from last month"
          isPositive={false}
          icon={<PieChart className="h-6 w-6" />}
        />
        <StatsCard
          label="Net Profit"
          value={`$${(netProfit / 1000).toFixed(1)}K`}
          change="+15% from last month"
          isPositive
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <StatsCard
          label="Active Leads"
          value={activeLeads}
          change={`${mockLeads.length} total`}
          isPositive
          icon={<Users className="h-6 w-6" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <SectionCard title="Monthly Overview" description="Income vs Expenses">
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
                <Bar dataKey="income" fill="#3b82f6" name="Income" />
                <Bar dataKey="expense" fill="#ef4444" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* Profit Trend */}
        <SectionCard title="Profit Trend" description="Monthly net profit">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* Recent Activities */}
      <SectionCard title="Recent Activities">
        <div className="space-y-4">
          {recentActivities.map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between pb-4 border-b border-border last:pb-0 last:border-b-0">
              <div>
                <p className="font-medium text-foreground">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.details}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
