import { useState, useEffect } from 'react';
import { getProfile } from './api';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfileData(data);
      } catch (err) {
        setError('Could not load your profile. Please try logging in again.');
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-8">{error}</div>;
  }

  const { user, submissions } = profileData;

  const getVerdictClass = (verdict) => {
    return verdict === 'Accepted' ? 'text-green-500' : 'text-red-500';
  };

 return (
  <div className="max-w-4xl mx-auto p-6">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h1 className="text-4xl font-bold mb-2">{user.firstName} {user.lastName}</h1>
      <p className="text-lg text-gray-400">{user.email}</p>
    </div>

    <h2 className="text-3xl font-bold mb-4">Submission History</h2>
    <div className="bg-gray-800 rounded-lg shadow-lg">
      {submissions.length > 0 ? (
        <ul className="divide-y divide-gray-700">
          {submissions.map((sub) => (
            // Use flex, justify-between, and items-center for proper alignment
            <li 
              key={sub._id} 
              className="p-4 flex justify-between items-center hover:bg-gray-700 transition-colors"
            >
              <div>
                <Link to={`/problem/${sub.problemId._id}`} className="text-xl font-semibold text-indigo-400 hover:underline">
                  {sub.problemId.title}
                </Link>
                <p className="text-sm text-gray-400">
                  Submitted on: {new Date(sub.submittedAt).toLocaleString()}
                </p>
              </div>
              <span className={`font-bold text-lg ${getVerdictClass(sub.verdict)}`}>
                {sub.verdict}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="p-6 text-gray-400">You haven't made any submissions yet.</p>
      )}
    </div>
  </div>
);
}