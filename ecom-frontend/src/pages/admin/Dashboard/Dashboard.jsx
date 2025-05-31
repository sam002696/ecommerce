import React, { useEffect } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import StatCard from "../../../components/admin/StatCard";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const { dashboardData } = useSelector((state) => state.adminDashboard);
  const dispatch = useDispatch();

  const stats = [
    { title: "Total Orders", value: dashboardData.orders_count || 0 },
    { title: "Active Users", value: dashboardData.users_count || 0 },
    { title: "Revenue", value: dashboardData.total_revenue || 0 },
    { title: "Products", value: dashboardData.products_count || 0 },
  ];

  useEffect(() => {
    dispatch({
      type: "FETCH_DASHBOARD_DATA",
    });
  }, [dispatch]);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
