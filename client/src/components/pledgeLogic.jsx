import React from 'react';

const PledgesLogic = ({ pledge, index, handler }) => {
  if (!pledge) return null; 

  return (
    <div style={{ padding: '20px', margin: '10px', borderRadius: '8px' }}>
      <h3>Pledge {index + 1}</h3>
      <p><strong>Handler:</strong> {pledge.handler}</p>
      <p><strong>Cost:</strong> ${pledge.cost}</p>
      <p><strong>Pledge Interval:</strong> {pledge.pledge_interval} days</p>
      <p><strong>Description:</strong> {pledge.pledge_desc}</p>
    </div>
  );
};

export default PledgesLogic;
