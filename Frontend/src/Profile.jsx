import React, { useState, useEffect } from 'react';
import { getProfile, getSubmissions } from './api';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileData = await getProfile();
        setProfile(profileData);
      } catch (err) {
        setError('Could not fetch profile.');
      }
    };

    const fetchSubmissions = async () => {
      try {
        const submissionsData = await getSubmissions();
        setSubmissions(submissionsData);
      } catch (err) {
        setError('Could not fetch submissions.');
      }
    };

    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProfileData(), fetchSubmissions()]);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">User Profile</h1>

      {profile && (
        <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-400">Profile Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-400">First Name:</p>
              <p className="text-white">{profile.firstName}</p>
            </div>
            <div>
              <p className="font-medium text-gray-400">Last Name:</p>
              <p className="text-white">{profile.lastName}</p>
            </div>
            <div className="md:col-span-2">
              <p className="font-medium text-gray-400">Email:</p>
              <p className="text-white">{profile.email}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-400">Submission History</h2>
        {submissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900 rounded-lg">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Problem ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Language</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Verdict</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Submitted At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {submissions.map((submission) => (
                  <tr key={submission._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{submission.problemId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{submission.language}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        submission.verdict === 'Accepted' ? 'bg-green-600 text-green-100' : 'bg-red-600 text-red-100'
                      }`}>
                        {submission.verdict}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(submission.submittedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400">No submissions yet.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
