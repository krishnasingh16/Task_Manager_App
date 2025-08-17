import React, { useState } from 'react';
import axios from 'axios';
import { endpoint } from '../../../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';

const TaskCreate = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("logindataen");

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'low',
    dueDate: '', 
    assignedTo: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, status, priority, dueDate, assignedTo } = formData;

    if (!title || !description || !status || !priority || !dueDate || !assignedTo) {
      setError("Please fill in all required fields.");
      return;
    }

    const today = new Date().setHours(0, 0, 0, 0);
    const selectedDate = new Date(dueDate).setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setError("Due date cannot be in the past.");
      return;
    }

    try {
      await axios.post(endpoint.create_task, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      alert("Task created successfully ✅");
      navigate("/tasklist");
      window.location.reload();
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Task creation failed ❌");
    }
  };

  return (
    <div className="p-4  mx-auto text-white">
      <h2 className="text-2xl font-bold mb-6 text-black">Create New Task</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-600 rounded text-sm font-semibold">
          {error}
        </div>
      )}

<form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg border border-gray-700 shadow">
  <div className="flex gap-6">
    <div className="flex-1">
      <label className="block mb-1 font-medium">Title <span className="text-red-500">*</span></label>
      <input
        type="text"
        name="title"
        required
        className="w-full p-2 rounded bg-gray-700 text-white"
        value={formData.title}
        onChange={handleChange}
      />
    </div>

    <div className="flex-1">
      <label className="block mb-1 font-medium">Description <span className="text-red-500">*</span></label>
      <input
        type="text"
        name="description"
        required
        className="w-full p-2 rounded bg-gray-700 text-white"
        value={formData.description}
        onChange={handleChange}
      />
    </div>
  </div>

  <div className="grid grid-cols-2 gap-6">
    <div>
      <label className="block mb-1 font-medium">Status <span className="text-red-500">*</span></label>
      <select
        name="status"
        className="w-full p-2 rounded bg-gray-700 text-white"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <div>
      <label className="block mb-1 font-medium">Priority <span className="text-red-500">*</span></label>
      <select
        name="priority"
        className="w-full p-2 rounded bg-gray-700 text-white"
        value={formData.priority}
        onChange={handleChange}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>

    <div>
      <label className="block mb-1 font-medium">Due Date <span className="text-red-500">*</span></label>
      <input
        type="date"
        name="dueDate"
        required
        className="w-full p-2 rounded bg-gray-700 text-white"
        value={formData.dueDate}
        onChange={handleChange}
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Assigned To (User ID) <span className="text-red-500">*</span></label>
      <input
        type="text"
        name="assignedTo"
        required
        className="w-full p-2 rounded bg-gray-700 text-white"
        value={formData.assignedTo}
        onChange={handleChange}
      />
    </div>
  </div>

  <div className="md:col-span-2 flex w justify-end">
    <button
      type="submit"
      className=" bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded text-white font-semibold transition"
    >
      Create Task
    </button>
  </div>
</form>

    </div>
  );
};

export default TaskCreate;
