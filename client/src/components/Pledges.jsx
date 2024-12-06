import React, { useState, useEffect } from 'react';
import { fetchPledges } from '../api/pledges'; // Adjust the path if necessary

const Pledges = ({ handler, index }) => {
  const [pledges, setPledges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPledges = async () => {
      try {
        const data = await fetchPledges(handler);
        setPledges(data); // Set the pledges data
      } catch (err) {
        setError(err.message); // Handle any errors
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    loadPledges();
  }, [handler]); // Re-fetch data if the handler prop changes

  // Render loading spinner, error, or pledges list
  if (loading) return <p>Loading pledges...</p>;
  if (error) return <p>Error: {error}</p>;

  const pledge = pledges[index]; // Access the pledge at the specified index

  return (
    <div>
      {pledge ? (
        <div key={pledge.id} style={{padding:10}}>
          <p><strong>Pledge ID:</strong> {pledge.pledge_id}</p>
          <p><strong>Amount:</strong> {pledge.cost}</p>
          <p><strong>Description:</strong> {pledge.pledge_desc}</p>
        </div>
      ) : (
        <p style={{padding: 10}}>No pledge found for this index.</p>
      )}
    </div>
  );
};

export default Pledges;
