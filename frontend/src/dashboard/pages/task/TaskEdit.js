import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../../../utils/APIRoutes";

const TaskEdit = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("logindataen");
  const role = localStorage.getItem("role");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "low",
    dueDate: "",
    assignedTo: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`${endpoint.task_by_id}/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const task = res.data.task;

        setFormData({
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate?.substring(0, 10) || "",
          assignedTo: task.assignedTo,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load task");
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${endpoint.update_task}/${taskId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Task updated successfully");
      navigate("/tasklist");
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError("Update failed");
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="p-4 mx-auto text-white">
      <h2 className="text-2xl font-bold mb-6 text-black">Edit Task</h2>

      {error && <div className="mb-4 p-2 bg-red-600 rounded">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {" "}
        {role === "admin" && (
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-300">Status</label>
          <select
            name="status"
            className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        {role === "admin" && (
        <>
         <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-300">Priority</label>
          <select
            name="priority"
            className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-300">Due Date</label>
          <input
            type="date"
            name="dueDate"
            className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-300">
            Assigned To (User ID)
          </label>
          <input
            type="text"
            name="assignedTo"
            className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.assignedTo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-300">
            Description
          </label>
          <input
            name="description"
            rows={4}
            className="p-2 rounded bg-gray-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        </>
      )}
        <div className="md:col-span-2 flex w justify-end">
          <button
            type="submit"
            className=" bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded text-white font-semibold transition"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskEdit;
