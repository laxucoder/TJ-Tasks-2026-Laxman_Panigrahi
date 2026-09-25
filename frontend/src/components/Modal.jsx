import { X } from 'lucide-react';
export default function Modal({ open, title, onClose, children, wide = false }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <div className={`w-full rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 ${wide ? 'max-w-2xl' : 'max-w-md'}`}>
      <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2><button onClick={onClose} className="icon-btn" aria-label="Close"><X size={20}/></button></div>{children}
    </div>
  </div>;
}
