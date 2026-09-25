import { Router } from 'express';
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../controllers/taskController.js';

const router = Router();
router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);
export default router;
