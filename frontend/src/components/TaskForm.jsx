import { useEffect, useState } from 'react';
const blank = { title: '', description: '', status: 'Todo', priority: 'Medium', dueDate: '' };
export default function TaskForm({ initial, onSubmit, onCancel, saving }) {
  const [form, setForm] = useState(initial || blank);
  const [error, setError] = useState('');
  useEffect(() => setForm(initial || blank), [initial]);
  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const submit = async (e) => { e.preventDefault(); if (!form.title.trim()) return setError('Task title is required.'); setError(''); await onSubmit({ ...form, title: form.title.trim(), description: form.description.trim(), dueDate: form.dueDate || null }); };
  return <form onSubmit={submit} className="space-y-4">
    {error && <div className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">{error}</div>}
    <div><label className="label">Title</label><input autoFocus name="title" value={form.title} onChange={change} maxLength={120} className="input" placeholder="e.g. Finish portfolio homepage"/></div>
    <div><label className="label">Description</label><textarea name="description" value={form.description} onChange={change} maxLength={500} rows="3" className="input resize-none" placeholder="Add a short description..."/></div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3"><div><label className="label">Status</label><select name="status" value={form.status} onChange={change} className="input"><option>Todo</option><option>In Progress</option><option>Completed</option></select></div><div><label className="label">Priority</label><select name="priority" value={form.priority} onChange={change} className="input"><option>Low</option><option>Medium</option><option>High</option></select></div><div><label className="label">Due date</label><input type="date" name="dueDate" value={form.dueDate || ''} onChange={change} className="input"/></div></div>
    <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={onCancel} className="btn-secondary">Cancel</button><button disabled={saving} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">{saving ? 'Saving...' : initial ? 'Save changes' : 'Create task'}</button></div>
  </form>;
}
