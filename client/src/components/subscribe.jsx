import React, { useState, useEffect } from 'react';
import { fetchSubscriptions } from "../api/subscriptions"// Adjust the path as needed

const SubscriptionsComp = ({ handler }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSubscriptions = async () => {
      try {
        const pledges = await fetchSubscriptions(handler);
        setSubscriptions(pledges);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getSubscriptions();
  }, [handler]); // Fetch data whenever the handler prop changes

  if (loading) {
    return <p>Loading subscriptions...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Subscriptions</h1>
      <ul>
        {subscriptions.map((pledge, index) => (
          <li key={index}>Pledge Amount: {pledge}</li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionsComp;
