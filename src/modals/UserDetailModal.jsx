// src/components/admin/modals/UserDetailModal.jsx
import React from 'react';
import { X, Mail, Phone, MapPin, Clock } from 'lucide-react';
import Modal from './Modal';

const UserDetailModal = ({ user, onClose }) => {
  return (
    <Modal isOpen={!!user} onClose={onClose}>
      <div className="bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">User Details</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
              {user?.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="ml-4">
              <h4 className="text-2xl font-bold text-gray-900">{user?.name}</h4>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Role</p>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">{user?.role}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                user?.status === 'Active' ? 'bg-green-100 text-green-800' :
                user?.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {user?.status}
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Email Address</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="font-medium">+234 803 456 7890</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">Lagos, Nigeria</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Joined Date</p>
                <p className="font-medium">{user?.joined}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h5 classBooking="font-semibold text-gray-900 mb-2">Activity Summary</h5>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">24</p>
                <p className="text-xs text-gray-600">Sessions</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">156</p>
                <p className="text-xs text-gray-600">Hours</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">4.8</p>
                <p className="text-xs text-gray-600">Rating</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Send Message
            </button>
            <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Suspend Account
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailModal;