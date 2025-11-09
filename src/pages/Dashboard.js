// src/components/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import Overview from '../components/Overview';
import UsersPage from '../components/UsersPage';
import MentorsPage from '../components/MentorsPage';
import SessionsPage from '../components/SessionsPage';
import AnalyticsPage from '../components/AnalyticsPage';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', component: <Overview /> },
    { id: 'users', label: 'Users', component: <UsersPage /> },
    { id: 'mentors', label: 'Mentors', component: <MentorsPage /> },
    { id: 'sessions', label: 'Sessions', component: <SessionsPage /> },
    { id: 'analytics', label: 'Analytics', component: <AnalyticsPage /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* EXACT HEADER */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">BridgeAI Admin Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Manage your platform efficiently</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Bell className="w-4 h-4" />
              Send Announcement
            </button>
          </div>
        </div>
      </header>

      {/* EXACT NAV */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {tabs.find(t => t.id === activeTab)?.component}
      </main>
    </div>
  );
};

export default AdminDashboard;