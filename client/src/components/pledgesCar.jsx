import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel'; 
import { fetchAllPledges, fetchPledges } from '../api/pledges'; 
import Pledges from './Pledges'; 

const PledgesCarousel = ({ handler }) => {
  const [pledges, setPledges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPledges = async () => {
      try {
        const data = await fetchAllPledges();
        setPledges(data); 
      } catch (err) {
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
    <Carousel sx={{background: '#212121'}}
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
      {/* Loop over the pledges array and render each Pledge in the carousel */}
      {pledges.map((pledge, index) => (
        <Pledges key={pledge.id} handler={handler} index={index}  />
      ))}
    </Carousel>
  );
};

export default PledgesCarousel;
