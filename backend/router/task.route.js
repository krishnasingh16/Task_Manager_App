import express from "express";
import {
    CreateTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../controllers/task.controller.js";
import isAuth from "../middleware/isAuthenticated.js";

const router = express.Router();
router.route("/create").post(isAuth, CreateTask);
router.route("/").get(isAuth, getAllTasks);
router.route("/:id").get(isAuth, getTaskById);
router.route("/update/:id").put(isAuth, updateTask);
router.route("/delete/:id").delete(isAuth, deleteTask);

export default router;
