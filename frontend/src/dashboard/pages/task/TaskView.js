import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { endpoint } from '../../../utils/APIRoutes';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const TaskView = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const token = localStorage.getItem("logindataen");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`${endpoint.task_by_id}/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTask(res.data.task);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch task details");
      }
    };

    fetchTask();
  }, [taskId, token]);

  if (!task) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-900 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">Task Details</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">Title</h3>
          <p className="text-gray-300">{task.title}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Description</h3>
          <p className="text-gray-300 whitespace-pre-line">{task.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold">Status</h3>
            <p className="text-gray-300">{task.status}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Priority</h3>
            <p className="text-gray-300">{task.priority}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Assigned To</h3>
            <p className="text-gray-300">{task.assignedTo}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Due Date</h3>
            <p className="text-gray-300">{moment(task.dueDate).format("DD-MM-YYYY")}</p>
          </div>

          <div className="col-span-2">
            <h3 className="text-xl font-semibold">Created At</h3>
            <p className="text-gray-300">{moment(task.createdAt).format("DD-MM-YYYY HH:mm")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskView;
