// src/components/admin/pages/AnalyticsPage.jsx
import React from 'react';

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">User Growth (Last 6 Months)</h3>
            <div className="space-y-3">
              {['June', 'July', 'August', 'September', 'October', 'November'].map((month, idx) => {
                const value = 40 + idx * 10;
                return (
                  <div key={month}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{month}</span>
                      <span className="font-medium">{value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${value}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Session Categories</h3>
            <div className="space-y-3">
              {[
                { name: 'Career Development', value: 35 },
                { name: 'Technical Skills', value: 28 },
                { name: 'Interview Prep', value: 20 },
                { name: 'Portfolio Review', value: 17 }
              ].map((category) => (
                <div key={category.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{category.name}</span>
                    <span className="font-medium">{category.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${category.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Top Performing Mentors</h3>
          <div className="space-y-4">
            {[
              { name: 'John Davis', sessions: 45, rating: 4.9 },
              { name: 'Susan Lee', sessions: 38, rating: 4.8 },
              { name: 'Mike Johnson', sessions: 32, rating: 4.7 },
              { name: 'Rachel Green', sessions: 28, rating: 4.9 }
            ].map((mentor, idx) => (
              <div key={mentor.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-400">#{idx + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{mentor.name}</p>
                    <p className="text-xs text-gray-500">{mentor.sessions} sessions</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-semibold">{mentor.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Platform Health</h3>
          <div className="space-y-4">
            {[
              { metric: 'System Uptime', value: '99.9%', status: 'excellent' },
              { metric: 'Avg Response Time', value: '1.2s', status: 'good' },
              { metric: 'Support Tickets', value: '12', status: 'good' },
              { metric: 'Bug Reports', value: '3', status: 'excellent' }
            ].map((item) => (
              <div key={item.metric} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{item.metric}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{item.value}</span>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.status === 'excellent' ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
