// src/components/admin/modals/SessionDetailModal.jsx
import React from 'react';
import { X } from 'lucide-react';
import Modal from './Modal';

const SessionDetailModal = ({ session, onClose }) => {
  if (!session) return null;

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <Modal isOpen={!!session} onClose={onClose}>
      <div className="bg-white">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Session Details</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Mentor & Mentee */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Mentor</p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {getInitials(session.mentorId.firstName, session.mentorId.lastName)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {session.mentorId.firstName} {session.mentorId.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{session.mentorId.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Mentee</p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  {getInitials(session.userId.firstName, session.userId.lastName)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {session.userId.firstName} {session.userId.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{session.userId.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Session Topic</p>
              <p className="text-lg font-semibold text-gray-900">{session.topic}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Duration</p>
                <p className="text-lg font-bold text-gray-900">{session.duration}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Amount</p>
                <p className="text-lg font-bold text-green-600">${session.amount}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    session.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : session.status === 'confirmed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Scheduled Date & Time</p>
              <p className="font-semibold text-gray-900">
                {formatDate(session.date)} at {session.time} WAT
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Meeting Link</p>
              <a
                href={session.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {session.meetingLink}
              </a>
            </div>
          </div>

          {/* Feedback */}
          {session.status === 'completed' && session.rating > 0 && (
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <h5 className="font-semibold text-gray-900 mb-2">Session Feedback</h5>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-500">{'★'.repeat(session.rating)}{'☆'.repeat(5 - session.rating)}</span>
                <span className="font-semibold">{session.rating.toFixed(1)}</span>
              </div>
              <p className="text-sm text-gray-700">Feedback not provided.</p>
            </div>
          )}

          {/* Revenue Breakdown */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Revenue Breakdown</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Session Fee</span>
                <span className="font-medium">${session.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform Fee (15%)</span>
                <span className="font-medium">-${(session.amount * 0.15).toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-blue-200">
                <span className="font-semibold">Mentor Earnings</span>
                <span className="font-bold text-green-600">
                  ${(session.amount * 0.85).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SessionDetailModal;
