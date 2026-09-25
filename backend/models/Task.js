import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true, minlength: 2, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 500, default: '' },
    status: { type: String, enum: ['Todo', 'In Progress', 'Completed'], default: 'Todo' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    dueDate: { type: Date, default: null }
  },
  { timestamps: true }
);

taskSchema.index({ status: 1, priority: 1, dueDate: 1 });
export default mongoose.model('Task', taskSchema);
