// // 

// import React, { useState, useEffect } from 'react';
// import Carousel from 'react-material-ui-carousel';
// import { fetchAllPledges } from '../api/pledges'; 
// import PledgesLogic from './pledgeLogic'; 
// import { Button } from '@mui/material';

// const PledgesCarousel = ({ handler }) => {
//   const [pledges, setPledges] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadPledges = async () => {
//       try {
//         console.log('Fetching pledges...');
//         const data = await fetchAllPledges(); 
//         console.log('Fetched data:', data);
//         setPledges(data); 
//       } catch (err) {
//         console.error('Error fetching pledges:', err);
//         setError(err.message); 
//       } finally {
//         setLoading(false); 
//       }
//     };

//     loadPledges(); 
//   }, [handler]);

  
//   if (loading) return <p>Loading pledges...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <Carousel
//       sx={{ background: '#212121' }}
//       indicatorIconButtonProps={{
//         style: {
//           padding: '10px',
//           color: 'grey',
//         },
//       }}
//       activeIndicatorIconButtonProps={{
//         style: {
//           backgroundColor: 'white',
//         },
//       }}
//       indicatorContainerProps={{
//         style: {
//           marginTop: '50px',
//           textAlign: 'center',
//         },
//       }}
//     >
//       {pledges.length === 0 ? (
//         <p>No pledges available</p>
//       ) : (
//         pledges.map((pledge, index) => (
//           <PledgesLogic key={pledge.pledge_id} pledge={pledge} handler={handler} index={index} />
//         )
//       )
//       )}

//     </Carousel>
//   );
// };

// export default PledgesCarousel;


import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { fetchAllPledges } from '../api/pledges';
import PledgesLogic from './pledgeLogic';
import { Button } from '@mui/material';

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

  const handleSubscription = async (pledge_id, handler) => {
    console.log(handler)
    console.log(pledge_id)
    try {
      const response = await fetch('http://localhost:3000/subscriptions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          handler: handler,
          pledge_id: pledge_id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Subscription successful:', data);
      } else {
        console.error('Error subscribing:', data);
      }
    } catch (err) {
      console.error('Error making API call:', err);
    }
  };

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
          <div key={pledge.pledge_id}>
            <PledgesLogic pledge={pledge} handler={handler} index={index} />
            {/* Button on every slide */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubscription(pledge.pledge_id, handler)} 
              >
                Subscribe
              </Button>
            </div>
          </div>
        ))
      )}
    </Carousel>
  );
};

export default PledgesCarousel;
