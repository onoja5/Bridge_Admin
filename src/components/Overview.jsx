// src/components/admin/pages/Overview.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, DollarSign, Calendar, Award } from 'lucide-react';

const Overview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch admin analytics data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://bridge-ai-backend-cagfd2exh5h6gwgs.westeurope-01.azurewebsites.net/admin-analytics/overview');
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch admin analytics:', err);
        setError('Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading analytics...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!data) return null;

  const { stats, usersByPersona, engagementData } = data;

  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.totalUsers.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 mt-1">+{stats.monthlyGrowth}% this month</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Active Mentors */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Mentors</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalMentors}</p>
              <p className="text-sm text-orange-600 mt-1">
                {stats.pendingApplications} pending
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Total Sessions */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sessions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalSessions}</p>
              <p className="text-sm text-green-600 mt-1">+18% this month</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${stats.totalRevenue.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 mt-1">+24% this month</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Users by Persona */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Users by Persona</h2>
        <div className="space-y-4">
          {usersByPersona.map((persona) => (
            <div key={persona.name}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{persona.name}</span>
                <span className="text-sm text-gray-600">
                  {persona.count} ({persona.percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${persona.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${persona.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Engagement */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">User Engagement Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {engagementData.map((data) => (
            <div key={data.metric} className="border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600">{data.metric}</p>
              <div className="flex items-end justify-between mt-2">
                <p className="text-2xl font-bold text-gray-900">{data.value}</p>
                <span
                  className={`text-sm font-medium ${
                    data.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {data.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
