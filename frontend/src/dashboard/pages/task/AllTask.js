import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { endpoint } from '../../../utils/APIRoutes';
import CustomTable from '../../../Shared/CustomTable';
import CustomToPagination from '../../../Shared/Pagination';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Required for navigation
import { FaEdit, FaEye, FaRecycle } from 'react-icons/fa';

const TaskList = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const token = localStorage.getItem("logindataen");

  // ✅ Fetch tasks
  const { data, isLoading, refetch } = useQuery(
    ['get_all_tasks', page],
    async () => {
      const res = await axios.get(endpoint?.get_task, {
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

  const allTasks = data?.tasks || [];

  // ✅ Handle Delete Task
  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`${endpoint.delete_task}/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Task deleted successfully");
      refetch(); // ✅ Refresh the list
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  // ✅ Handle Edit Task
  const handleEdit = (taskId) => {
    navigate(`/task/edit/${taskId}`); // ✅ You’ll create this route
  };

  // ✅ Handle View Task
  const handleView = (taskId) => {
    navigate(`/task/view/${taskId}`); // ✅ You’ll create this route
  };

  // ✅ Table Head
  const tablehead = [
    <span>S.No.</span>,
    <span>Title</span>,
    <span>Description</span>,
    <span>Status</span>,
    <span>Created At</span>,
    <span>Actions</span>,
  ];

  // ✅ Table Rows
  const tablerow = allTasks
    ?.slice((page - 1) * 10, page * 10)
    .map((task, index) => [
      <span>{(page - 1) * 10 + index + 1}</span>,
      <span>{task.title}</span>,
      <span>{task.description}</span>,
      <span>{task.status}</span>,
      <span>{moment(task.createdAt).format("DD-MM-YYYY HH:mm")}</span>,
      <span className="space-x-2">
        <button
          onClick={() => handleView(task._id)}
          className="text-green-400 hover:underline"
        >
          <FaEye/>
        </button>
        <button
          onClick={() => handleEdit(task._id)}
          className="text-blue-400 hover:underline"
        >
          <FaEdit/>
        </button>
        <button
          onClick={() => handleDelete(task._id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </span>,
    ]);

  return (
    <div className="p-2">
      <div className="bg-gray-800 rounded-lg shadow-lg p-3 text-white border border-gray-700 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">Task List</h2>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg p-3 text-white border border-gray-700">
        <CustomTable tablehead={tablehead} tablerow={tablerow} isLoading={isLoading} />

        <CustomToPagination
          page={page}
          setPage={setPage}
          data={{ totalCount: allTasks.length }}
        />
      </div>
    </div>
  );
};

export default TaskList;
