import React, { useState, useEffect } from 'react';

function AdminPOIManager() {
  const [pois, setPois] = useState([]);
  const [newPOI, setNewPOI] = useState({ name: '', lat: '', lng: '' });

  // Load POIs from localStorage when the component mounts
  useEffect(() => {
    const storedPOIs = JSON.parse(localStorage.getItem('pois'));
    if (storedPOIs) {
      setPois(storedPOIs);
    }
  }, []);

  // Save POIs to localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem('pois', JSON.stringify(pois));
  }, [pois]);

  // Function to handle adding a new POI
  const handleAddPOI = (e) => {
    e.preventDefault();
    const newId = pois.length + 1;
    const newLat = parseFloat(newPOI.lat);
    const newLng = parseFloat(newPOI.lng);

    // Create a new POI object
    const newPointOfInterest = {
      id: newId,
      name: newPOI.name,
      lat: newLat,
      lng: newLng,
    };

    // Add the new POI to the list of POIs
    setPois([...pois, newPointOfInterest]);

    // Reset the new POI form
    setNewPOI({ name: '', lat: '', lng: '' });
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="mb-4 text-xl font-bold">Admin - Manage POIs</h2>

      {/* Add POI Form */}
      <h3 className="mt-6 text-lg font-bold">Add a New POI</h3>
      <form onSubmit={handleAddPOI} className="mb-4">
        <input
          type="text"
          placeholder="POI Name"
          value={newPOI.name}
          onChange={(e) => setNewPOI({ ...newPOI, name: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="number"
          placeholder="POI Latitude"
          value={newPOI.lat}
          onChange={(e) => setNewPOI({ ...newPOI, lat: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="number"
          placeholder="POI Longitude"
          value={newPOI.lng}
          onChange={(e) => setNewPOI({ ...newPOI, lng: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Add POI
        </button>
      </form>

      {/* Display POIs */}
      <h3 className="mt-6 text-lg font-bold">List of POIs</h3>
      <ul>
        {pois.map((poi) => (
          <li key={poi.id} className="mb-2">
            <strong>{poi.name}</strong>: {poi.lat}, {poi.lng}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPOIManager;
