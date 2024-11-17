// ProfilePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    favoriteGenres: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = "YOUR_USER_ID"; // Replace with actual user ID from authentication

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profile/${userId}`);
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching profile data');
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  // Update profile data
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/profile/${userId}`, profile);
      setProfile(response.data); // Update state with the latest profile data
      alert('Profile updated successfully');
    } catch (err) {
      setError('Error updating profile data');
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            readOnly
          />
        </div>
        <div>
          <label>Favorite Genres:</label>
          <input
            type="text"
            name="favoriteGenres"
            value={profile.favoriteGenres.join(', ')}
            onChange={(e) => setProfile({ ...profile, favoriteGenres: e.target.value.split(', ') })}
          />
        </div>
        <button type="button" onClick={handleUpdate}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
