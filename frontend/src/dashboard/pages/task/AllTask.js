import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { endpoint } from '../../../utils/APIRoutes';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaEye } from 'react-icons/fa';

const TaskList = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const token = localStorage.getItem("logindataen");
  const role = localStorage.getItem("role");

  const { data, isLoading, refetch } = useQuery(
    ['get_all_tasks'],
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
  const totalPages = Math.ceil(allTasks.length / itemsPerPage);

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`${endpoint.delete_task}/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Task deleted successfully");
      refetch();
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  const handleEdit = (taskId) => {
    navigate(`/task/edit/${taskId}`);
  };

  const handleView = (taskId) => {
    navigate(`/task/view/${taskId}`);
  };

  return (
    <div className="p-2">
      <div className="bg-gray-800 rounded-lg shadow-lg p-3 text-white border border-gray-700 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">Task List</h2>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg p-3 text-white border border-gray-700 overflow-x-auto">
        {isLoading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">S.No.</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Created At</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {allTasks
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((task, index) => (
                  <tr key={task._id} className="hover:bg-gray-700">
                    <td className="px-4 py-2">{(page - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-4 py-2">{task.title}</td>
                    <td className="px-4 py-2">{task.description}</td>
                    <td className="px-4 py-2">{task.status}</td>
                    <td className="px-4 py-2">
                      {moment(task.createdAt).format("DD-MM-YYYY HH:mm")}
                    </td>
                    <td className="px-4 py-2 space-x-3">
                      <button
                        onClick={() => handleView(task._id)}
                        className="text-green-400 hover:underline"
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEdit(task._id)}
                        className="text-blue-400 hover:underline"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      {role==="admin" && (
                        <button
                        onClick={() => handleDelete(task._id)}
                        className="text-red-500 hover:underline"
                        title="Delete"
                      >
                        Delete
                      </button>
                      )}
                      
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>

          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num + 1}
              onClick={() => setPage(num + 1)}
              className={`px-3 py-1 rounded ${
                page === num + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-600 text-white hover:bg-gray-500'
              }`}
            >
              {num + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
