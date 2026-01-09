import React from 'react';
import { User } from '../types';
import { User as UserIcon, Shield, Bell } from 'lucide-react';

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Настройки</h2>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-200 flex items-center gap-2">
          <UserIcon size={20} className="text-blue-500" />
          Профиль
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Имя пользователя</label>
            <input
              type="text"
              readOnly
              value={user.username}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white outline-none cursor-not-allowed transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Статус</label>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-slate-900 dark:text-slate-300">Активен</span>
            </div>
          </div>
        </div>
      </div>

       <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-200 flex items-center gap-2">
          <Shield size={20} className="text-purple-500" />
          Безопасность
        </h3>
        <div className="flex items-center justify-between py-2">
            <span className="text-slate-700 dark:text-slate-300">Двухфакторная аутентификация</span>
             <button className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                Настроить
             </button>
        </div>
        <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-800 mt-2">
            <span className="text-slate-700 dark:text-slate-300">Сменить пароль</span>
             <button className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                Изменить
             </button>
        </div>
      </div>

       <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-200 flex items-center gap-2">
          <Bell size={20} className="text-yellow-500" />
          Уведомления
        </h3>
         <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-slate-700 dark:text-slate-300">Уведомления о сделках</span>
            </label>
             <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-slate-700 dark:text-slate-300">Новости рынка</span>
            </label>
         </div>
      </div>
    </div>
  );
};

export default Settings;