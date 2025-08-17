import { Task } from "../models/task.model.js";

// ✅ GET TASK COUNTS (total, pending, completed)
export const getTaskCounts = async (req, res) => {
    try {
      const totalTasks = await Task.countDocuments();
  
      const totalPending = await Task.countDocuments({ status: "pending" });
      const totalInProgress = await Task.countDocuments({ status: "in progress" });
      const totalCompleted = await Task.countDocuments({ status: "completed" });
  
      return res.status(200).json({
        success: true,
        counts: {
          totalTasks,
          totalPending,
          totalInProgress,
          totalCompleted,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  
// ✅ CREATE TASK
export const CreateTask = async (req, res) => {
    try {
      const { title, description, status, priority, dueDate, assignedTo } = req.body;
  
      // Yahan `req.id` use karo jo authenticated user ka id hai
      const createdBy = req.id;
  
      if (!createdBy) {
        return res.status(401).json({
          message: "User not authenticated",
          success: false,
        });
      }
  
      // Validate assignedTo: must be valid ObjectId string (24 hex characters)
      if (assignedTo && !assignedTo.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          message: "Invalid assignedTo user ID",
          success: false,
        });
      }
  
      const task = await Task.create({
        title,
        description,
        status,
        priority,
        dueDate,
        assignedTo,
        createdBy,
      });
  
      res.status(201).json({ success: true, task });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  


// ✅ GET ALL TASKS
export const getAllTasks = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    };

    const tasks = await Task.find(query);

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({
        message: "Tasks not found",
        success: false
      });
    }

    return res.status(200).json({
      tasks,
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

// ✅ GET TASK BY ID
export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        success: false
      });
    }

    return res.status(200).json({ task, success: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

// ✅ UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo, tags } = req.body;

    const updateData = {
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      tags,
      updatedAt: new Date()
    };

    const task = await Task.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        success: false
      });
    }

    return res.status(200).json({
      message: "Task information updated",
      success: true,
      task
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

// ✅ DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
        success: false
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
      success: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};
