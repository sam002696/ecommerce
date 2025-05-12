import React from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import StatCard from "../../../components/admin/StatCard";

const Dashboard = () => {
  const stats = [
    { title: "Total Orders", value: 120 },
    { title: "Active Users", value: 45 },
    { title: "Revenue", value: "$3,200" },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>

      {/* Add more sections like charts, recent orders, etc. here */}
    </AdminLayout>
  );
};

export default Dashboard;
