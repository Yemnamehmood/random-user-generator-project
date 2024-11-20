'use client'
import { useState, useEffect } from 'react';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  const fetchRandomUser = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      const userData = data.results[0];
      setUser({
        name: `${userData.name.first} ${userData.name.last}`,
        email: userData.email,
        address: `${userData.location.street.name}, ${userData.location.city}, ${userData.location.country}`,
        uuid: userData.login.uuid,
        picture: userData.picture.large,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user on initial load
  useEffect(() => {
    fetchRandomUser();
  }, []);

  return (
    <div className="container">
      <h1>Random User Generator</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="user-card">
          <img src={user.picture} alt="User" className="user-picture" />
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
          <p>UUID: {user.uuid}</p>
          <button onClick={fetchRandomUser}>Get New User</button>
        </div>
      )}
      <footer>
        © Random User Generator by Yemna Mehmood
      </footer>
    </div>
  );
}
