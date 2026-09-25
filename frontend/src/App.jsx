import { useEffect, useState } from 'react';
import AppShell from './components/AppShell.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Modal from './components/Modal.jsx';
import TaskForm from './components/TaskForm.jsx';
import Toast from './components/Toast.jsx';
import { taskApi } from './services/api.js';

export default function App(){
 const [tasks,setTasks]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState(''),[dark,setDark]=useState(()=>localStorage.getItem('taskflow-theme')==='dark'),[mobileOpen,setMobileOpen]=useState(false),[modal,setModal]=useState({open:false,mode:'create',task:null}),[saving,setSaving]=useState(false),[toast,setToast]=useState(null);
 useEffect(()=>{document.documentElement.classList.toggle('dark',dark);localStorage.setItem('taskflow-theme',dark?'dark':'light')},[dark]);
 const notify=(message,type='success')=>{setToast({message,type});setTimeout(()=>setToast(null),2600)};
 const load=async()=>{setLoading(true);setError('');try{const r=await taskApi.list();setTasks(r.data)}catch(e){setError(e.message);notify(e.message,'error')}finally{setLoading(false)}};
 useEffect(()=>{load()},[]);
 const create=async(data)=>{setSaving(true);try{const r=await taskApi.create(data);setTasks(p=>[r.data,...p]);setModal({open:false,mode:'create',task:null});notify('Task created successfully.')}catch(e){notify(e.message,'error')}finally{setSaving(false)}};
 const update=async(data)=>{setSaving(true);try{const r=await taskApi.update(modal.task._id,data);setTasks(p=>p.map(t=>t._id===r.data._id?r.data:t));setModal({open:false,mode:'create',task:null});notify('Task updated successfully.')}catch(e){notify(e.message,'error')}finally{setSaving(false)}};
 const remove=async(task)=>{if(!window.confirm(`Delete “${task.title}”? This cannot be undone.`))return;try{await taskApi.remove(task._id);setTasks(p=>p.filter(t=>t._id!==task._id));notify('Task deleted.')}catch(e){notify(e.message,'error')}};
 const complete=async(task)=>{try{const next=task.status==='Completed'?'Todo':'Completed';const r=await taskApi.update(task._id,{status:next});setTasks(p=>p.map(t=>t._id===r.data._id?r.data:t));notify(next==='Completed'?'Task completed 🎉':'Task moved back to Todo.')}catch(e){notify(e.message,'error')}};
 return <><AppShell {...{dark,setDark,mobileOpen,setMobileOpen}} onCreate={()=>setModal({open:true,mode:'create',task:null})}><Dashboard tasks={tasks} loading={loading} error={error} onRetry={load} onCreate={()=>setModal({open:true,mode:'create',task:null})} onUpdate={(task)=>setModal({open:true,mode:'edit',task:{...task,dueDate:task.dueDate?task.dueDate.slice(0,10):''}})} onDelete={remove} onComplete={complete}/></AppShell><Modal open={modal.open} title={modal.mode==='edit'?'Edit task':'Create a new task'} onClose={()=>setModal({open:false,mode:'create',task:null})} wide><TaskForm initial={modal.task} onSubmit={modal.mode==='edit'?update:create} onCancel={()=>setModal({open:false,mode:'create',task:null})} saving={saving}/></Modal><Toast toast={toast}/></>;
}
