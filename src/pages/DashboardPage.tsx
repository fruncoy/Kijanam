import React from 'react';
import { Users, Package, DollarSign, Briefcase } from 'lucide-react';
import { StatsCard } from '../components/StatsCard';

export function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Projects"
          value={24}
          icon={Briefcase}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Fundis"
          value={156}
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Inventory Count"
          value={1234}
          icon={Package}
          trend={{ value: 3, isPositive: false }}
        />
        <StatsCard
          title="Pending Payments"
          value="$45,678"
          icon={DollarSign}
          trend={{ value: 5, isPositive: true }}
        />
      </div>
    </div>
  );
}