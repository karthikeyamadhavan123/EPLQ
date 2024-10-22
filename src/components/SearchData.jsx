import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase'; // Ensure Firebase is set up
import { collection, getDocs } from 'firebase/firestore';

function SearchData() {
  const [searchRadius, setSearchRadius] = useState('');
  const [userLat, setUserLat] = useState('');
  const [userLng, setUserLng] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch POIs from Firebase Firestore
  useEffect(() => {
    const fetchPOIs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'POIs')); // Assuming your collection is named 'POIs'
        const fetchedPOIs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setResults(fetchedPOIs); // Initially set results to all POIs
        setLoading(false);
      } catch (error) {
        console.error('Error fetching POIs from Firestore: ', error);
      }
    };

    fetchPOIs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    // Filter POIs by distance from user's location
    const filteredPOIs = results.filter(poi => {
      const distance = calculateDistance(userLat, userLng, poi.lat, poi.lng);
      return distance <= searchRadius;
    });

    // Calculate distance for each POI and update results
    const resultsWithDistance = filteredPOIs.map(poi => ({
      ...poi,
      distance: calculateDistance(userLat, userLng, poi.lat, poi.lng),
    }));

    setResults(resultsWithDistance);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="mb-4 text-xl font-bold">Search POIs</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="number"
          placeholder="Search Radius (km)"
          value={searchRadius}
          onChange={(e) => setSearchRadius(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Your Latitude"
          value={userLat}
          onChange={(e) => setUserLat(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Your Longitude"
          value={userLng}
          onChange={(e) => setUserLng(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {results.length > 0 && (
        <div>
          <h3 className="mt-4 mb-2 text-lg font-bold">Results</h3>
          <ul>
            {results.map((poi) => (
              <li key={poi.id} className="mb-2">
                <strong>{poi.name}</strong>: {poi.lat}, {poi.lng} ({poi.distance?.toFixed(2)} km away)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchData;
