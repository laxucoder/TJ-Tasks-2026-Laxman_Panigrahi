import mongoose from 'mongoose';
import Task from '../models/Task.js';

const validateId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getTasks = async (_req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (error) { next(error); }
};

export const getTask = async (req, res, next) => {
  try {
    if (!validateId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid task ID.' });
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found.' });
    res.json({ success: true, data: task });
  } catch (error) { next(error); }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const task = await Task.create({ title, description, status, priority, dueDate: dueDate || null });
    res.status(201).json({ success: true, data: task });
  } catch (error) { next(error); }
};

export const updateTask = async (req, res, next) => {
  try {
    if (!validateId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid task ID.' });
    const allowed = ['title', 'description', 'status', 'priority', 'dueDate'];
    const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    if ('dueDate' in updates && !updates.dueDate) updates.dueDate = null;
    const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ success: false, message: 'Task not found.' });
    res.json({ success: true, data: task });
  } catch (error) { next(error); }
};

export const deleteTask = async (req, res, next) => {
  try {
    if (!validateId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid task ID.' });
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found.' });
    res.json({ success: true, message: 'Task deleted successfully.' });
  } catch (error) { next(error); }
};
