import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { endpoint } from "../utils/APIRoutes";
import { FaTasks, FaClock, FaCheckCircle, FaClipboardList } from "react-icons/fa";

const Dashboard = () => {
  const token = localStorage.getItem("logindataen");

  const { data, isLoading, error } = useQuery(
    ["get_task_counts"],
    async () => {
      const res = await axios.get(endpoint?.task_counts, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading task counts.</div>;

  const counts = data?.counts || {};  

  const statCards = [
    { title: "Total Tasks", value: counts.totalTasks ?? 0, icon: <FaTasks /> },
    { title: "Pending Tasks", value: counts.totalPending ?? 0, icon: <FaClock /> },
    { title: "In Progress Tasks", value: counts.totalInProgress ?? 0, icon: <FaClipboardList /> },
    { title: "Completed Tasks", value: counts.totalCompleted ?? 0, icon: <FaCheckCircle /> },
  ];

  return (
    <div className="lg:flex h-screen font-sans bg-[#f1f5f9]">
      <main className="flex-1 overflow-y-auto max-h-screen example">
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 lg:px-6 pb-6">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-gold-color text-black p-6 rounded-xl shadow flex items-center justify-between "
            >
              <div className="text-2xl">{card.icon}</div>
              <div>
                <div className="text-sm font-normal">{card.title}</div>
                <div className="text-xl font-bold">{card.value}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
