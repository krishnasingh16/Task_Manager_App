import { Task } from "../models/task.model.js";


export const CreateTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate, createBy, assignedTo, createdAt, updatedAt } = req.body;
        const userId = req.id; // isAuth middleware se aayega

        if (!title || !description || !status || !priority || !dueDate || !createBy || !assignedTo || !createdAt || !updatedAt) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            createdAt,
            createdBy: userId,
            updatedAt,
            assignedTo
        });

        return res.status(200).json({
            message: "New Task created successfully",
            task,
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


export const getAllTasks = async (req,res)=>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}}
            ]
        }
        const tasks = await Task.find(query)
        if(!tasks){
            return res.status(404).json({
                message:"Tasks not found",
                success:false
            })
        }
        return res.status(200).json({
            tasks,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
export const getTaskById = async (req,res)=>{
    try {
        const taskId = req.params.id
        const task = await Task.findById(taskId)
        if(!task){
            return res.status(404).json({
                message:"Tasks not found",
                success:false
            })
        }
        return res.status(200).json({task, success:true})

    } catch (error) {
        console.log(error);
        
    }
}

export const updateTask = async (req,res)=>{
    try {
        const {title , description ,status , priority , dueDate, createBy , assignedTo , tags, createdAt , updatedAt } = req.body
    

        const updateData = {title , description ,status , priority , dueDate, createBy , assignedTo , tags, createdAt , updatedAt };
        const task = await Task.findByIdAndUpdate(req.params.id,updateData,{new:true});
        if(!task){
            return res.status(404).json({
                message:"Task not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Task information updated",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}      
export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        // Task ko delete karo
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
