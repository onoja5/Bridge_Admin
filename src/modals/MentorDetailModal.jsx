// src/components/admin/modals/MentorDetailModal.jsx
import React from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';
import Modal from './Modal';

const MentorDetailModal = ({ mentor, onClose, onApprove, onReject }) => {
  return (
    <Modal isOpen={!!mentor} onClose={onClose}>
      <div className="bg-white">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Mentor Application Details</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
              {mentor?.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="ml-4">
              <h4 className="text-2xl font-bold text-gray-900">{mentor?.name}</h4>
              <p className="text-gray-600">{mentor?.expertise}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Experience</p>
              <p className="text-lg font-bold text-gray-900">{mentor?.experience}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                mentor?.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {mentor?.status}
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Expertise Areas</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Software Engineering</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">System Design</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Career Growth</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Bio</p>
              <p className="text-gray-900">Experienced software engineer with 8+ years in the industry. Passionate about helping others grow their careers and develop technical skills. Previously worked at top tech companies and led multiple successful projects.</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Proposed Hourly Rate</p>
              <p className="text-2xl font-bold text-gray-900">$120/hour</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">LinkedIn Profile</p>
              <a href="#" className="text-blue-600 hover:underline">linkedin.com/in/alexthompson</a>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Application Date</p>
              <p className="font-medium">{mentor?.date}</p>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <h5 className="font-semibold text-gray-900 mb-2">Documents Submitted</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Resume.pdf</span>
                <button className="text-blue-600 hover:underline text-sm">View</button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Certifications.pdf</span>
                <button className="text-blue-600 hover:underline text-sm">View</button>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => onApprove(mentor)} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Approve
            </button>
            <button onClick={() => onReject(mentor)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2">
              <XCircle className="w-5 h-5" />
              Reject
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MentorDetailModal;