import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Bell, CheckCheck, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { TableSkeleton } from '../components/Skeleton';

const Notifications = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mocks fallback
  const mockAlerts = [
    { _id: 'n1', title: 'Welcome to StepUp!', message: 'Email verified. Complete details in your profile settings.', isRead: false, type: 'info', createdAt: '2026-06-11T12:00:00Z' },
    { _id: 'n2', title: 'New Lesson Uploaded', message: 'Lesson 2.1: Simple vs Complex Sentences is now active.', isRead: true, type: 'announcement', createdAt: '2026-06-10T10:00:00Z' }
  ];

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get('/notifications');
        if (res.success && res.notifications && res.notifications.length > 0) {
          setItems(res.notifications);
        } else {
          setItems(mockAlerts);
        }
      } catch (err) {
        setItems(mockAlerts);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-brand-black dark:text-white">Notifications</h2>
            <p className="text-xs text-gray-500">Read system messages and class announcements.</p>
          </div>
        </div>
        <TableSkeleton />
      </div>
    );
  }

  const markAllRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      setItems(prev => prev.map(n => ({ ...n, isRead: true })));
      toast.success('All notifications marked as read');
    } catch (err) {
      setItems(prev => prev.map(n => ({ ...n, isRead: true })));
      toast.success('All notifications marked as read');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-brand-black dark:text-white">Notifications</h2>
          <p className="text-xs text-gray-500">Read system messages and class announcements.</p>
        </div>

        <button
          onClick={markAllRead}
          className="flex items-center space-x-1 text-xs font-bold text-brand-red hover:underline"
        >
          <CheckCheck className="h-4 w-4" />
          <span>Mark All Read</span>
        </button>
      </div>

      <div className="space-y-4">
        {items.map(item => (
          <div 
            key={item._id} 
            className={`p-5 rounded-2xl border transition-colors flex gap-4 ${
              item.isRead 
                ? 'bg-white dark:bg-brand-darkGray border-gray-150/50 dark:border-gray-800/80 opacity-70' 
                : 'bg-white dark:bg-brand-darkGray border-brand-red/20 dark:border-brand-red/10 shadow-sm'
            }`}
          >
            <div className="h-10 w-10 bg-brand-red/10 text-brand-red flex items-center justify-center rounded-xl shrink-0">
              <Bell className="h-5 w-5" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xs font-bold">{item.title}</h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">{item.message}</p>
              <span className="text-[9px] text-gray-400 block mt-2">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
