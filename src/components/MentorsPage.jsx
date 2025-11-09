import React, { useState, useEffect } from 'react';
import MentorDetailModal from '../modals/MentorDetailModal';

const MentorsPage = () => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const BASE_URL = 'https://bridge-ai-backend-cagfd2exh5h6gwgs.westeurope-01.azurewebsites.net/admin-analytics/users';

  // ✅ Fetch mentors from new admin analytics endpoint
  const fetchMentors = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}?userType=Mentor&limit=10&page=${page}`, {
        headers: { accept: 'application/json' },
      });

      if (!res.ok) throw new Error('Failed to fetch mentors');

      const data = await res.json();

      setMentors(data.users || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (err) {
      console.error('Error fetching mentors:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors(currentPage);
  }, [currentPage]);

  // ✅ Search Filter
  useEffect(() => {
    const filtered = mentors.filter((m) => {
      const fullName = `${m.firstName} ${m.lastName}`.toLowerCase();
      const email = m.email?.toLowerCase() || '';
      const term = searchTerm.toLowerCase();
      return fullName.includes(term) || email.includes(term);
    });
    setFilteredMentors(filtered);
  }, [mentors, searchTerm]);

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getInitials = (first, last) => {
    return `${first?.[0] || ''}${last?.[0] || ''}`.toUpperCase();
  };

  const getExpertise = (mentor) => {
    if (mentor.industryExpertise?.length > 0) return mentor.industryExpertise.join(', ');
    if (mentor.specializationAreas?.length > 0) return mentor.specializationAreas.join(', ');
    if (mentor.focusAreas?.length > 0) return mentor.focusAreas[0];
    return 'General Mentorship';
  };

  const getExperience = (mentor) => {
    const years = mentor.yearsOfExperience || mentor.experienceYears;
    return years ? `${years} years` : 'Not specified';
  };

  const handleApprove = (mentor) => {
    console.log('Approved mentor:', mentor.firstName, mentor.lastName);
    setSelectedMentor(null);
  };

  const handleReject = (mentor) => {
    console.log('Rejected mentor:', mentor.firstName, mentor.lastName);
    setSelectedMentor(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        <strong>Error:</strong> {error}
        <button onClick={() => fetchMentors(currentPage)} className="ml-4 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Mentor Applications</h2>
              <p className="text-sm text-gray-600 mt-1">
                Total: <strong>{mentors.length}</strong> mentors
              </p>
            </div>
            <input
              type="text"
              placeholder="Search mentors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expertise
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMentors.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No mentors found.
                  </td>
                </tr>
              ) : (
                filteredMentors.map((mentor) => (
                  <tr key={mentor._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
                          {mentor.profileImageUrl?.includes('http') ? (
                            <img
                              src={mentor.profileImageUrl}
                              alt={mentor.firstName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            getInitials(mentor.firstName, mentor.lastName)
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {mentor.firstName} {mentor.lastName}
                          </div>
                          <div className="text-xs text-gray-500">{mentor.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-xs truncate" title={getExpertise(mentor)}>
                        {getExpertise(mentor)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getExperience(mentor)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          mentor.mentorVerificationStatus
                            ? 'bg-green-100 text-green-800'
                            : mentor.status
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {mentor.mentorVerificationStatus
                          ? 'Approved'
                          : mentor.status
                          ? 'Active'
                          : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(mentor.createdDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setSelectedMentor(mentor)}
                        className="text-purple-600 hover:text-purple-800 font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <p className="text-sm text-gray-600">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-white transition"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-white transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Mentor Detail Modal */}
      <MentorDetailModal
        mentor={
          selectedMentor
            ? {
                _id: selectedMentor._id,
                name: `${selectedMentor.firstName} ${selectedMentor.lastName}`,
                expertise: getExpertise(selectedMentor),
                experience: getExperience(selectedMentor),
                status: selectedMentor.mentorVerificationStatus ? 'Approved' : 'Pending',
                date: formatDate(selectedMentor.createdDate),
                email: selectedMentor.email,
                phone: selectedMentor.phoneNumber,
                location: selectedMentor.address,
                bio:
                  selectedMentor.careerBlueprint?.slice(0, 200) + '...' ||
                  'No bio provided.',
                hourlyRate: selectedMentor.offersPaidMentorship
                  ? `$${selectedMentor.StandardPlanPrice / 100 || 120}/hour`
                  : 'Free',
                linkedin: selectedMentor.linkedin || '#',
                documents: ['Resume.pdf', 'Certifications.pdf'],
              }
            : null
        }
        onClose={() => setSelectedMentor(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </>
  );
};

export default MentorsPage;
