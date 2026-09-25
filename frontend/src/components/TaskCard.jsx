import { CalendarDays, Check, Circle, Clock3, Pencil, Trash2 } from 'lucide-react';
const priorityClass = { High: 'badge-red', Medium: 'badge-amber', Low: 'badge-green' };
const statusClass = { Todo: 'badge-slate', 'In Progress': 'badge-blue', Completed: 'badge-green' };
export default function TaskCard({ task, onEdit, onDelete, onComplete }) {
  const due = task.dueDate ? new Date(task.dueDate) : null;
  const overdue = due && task.status !== 'Completed' && due < new Date(new Date().setHours(0,0,0,0));
  return <article className={`card group transition hover:-translate-y-0.5 hover:shadow-lg ${task.status === 'Completed' ? 'opacity-80' : ''}`}>
    <div className="flex items-start justify-between gap-3"><div className="min-w-0"><div className="mb-2 flex flex-wrap items-center gap-2"><span className={`badge ${priorityClass[task.priority]}`}>{task.priority}</span><span className={`badge ${statusClass[task.status]}`}>{task.status}</span></div><h3 className={`text-lg font-bold text-slate-900 dark:text-white ${task.status === 'Completed' ? 'line-through' : ''}`}>{task.title}</h3>{task.description && <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{task.description}</p>}</div></div>
    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800"><div className={`flex items-center gap-1.5 text-xs font-medium ${overdue ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'}`}>{due ? <><CalendarDays size={15}/>{overdue ? 'Overdue' : due.toLocaleDateString(undefined,{month:'short',day:'numeric'})}</> : <><Circle size={14}/>No due date</>}</div><div className="flex items-center gap-1"><button onClick={() => onComplete(task)} className="icon-btn" title={task.status === 'Completed' ? 'Mark as todo' : 'Mark completed'}>{task.status === 'Completed' ? <Clock3 size={17}/> : <Check size={17}/>}</button><button onClick={() => onEdit(task)} className="icon-btn" title="Edit"><Pencil size={17}/></button><button onClick={() => onDelete(task)} className="icon-btn text-rose-500" title="Delete"><Trash2 size={17}/></button></div></div>
  </article>;
}
