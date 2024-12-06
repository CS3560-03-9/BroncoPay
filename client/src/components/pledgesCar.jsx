// 

import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { fetchAllPledges } from '../api/pledges'; 
import PledgesLogic from './pledgeLogic'; 

const PledgesCarousel = ({ handler }) => {
  const [pledges, setPledges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPledges = async () => {
      try {
        console.log('Fetching pledges...');
        const data = await fetchAllPledges(); 
        console.log('Fetched data:', data);
        setPledges(data); 
      } catch (err) {
        console.error('Error fetching pledges:', err);
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    loadPledges(); 
  }, [handler]);

  
  if (loading) return <p>Loading pledges...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Carousel
      sx={{ background: '#212121' }}
      indicatorIconButtonProps={{
        style: {
          padding: '10px',
          color: 'grey',
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          backgroundColor: 'white',
        },
      }}
      indicatorContainerProps={{
        style: {
          marginTop: '50px',
          textAlign: 'center',
        },
      }}
    >
      {pledges.length === 0 ? (
        <p>No pledges available</p>
      ) : (
        pledges.map((pledge, index) => (
          <PledgesLogic key={pledge.pledge_id} pledge={pledge} handler={handler} index={index} />
        ))
      )}
    </Carousel>
  );
};

export default PledgesCarousel;
