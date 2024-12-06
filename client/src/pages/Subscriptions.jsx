/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from "react";
import { Paper, Button, Grid2 } from '@mui/material'
import Pledges from "../components/Pledges";
import PledgesCarousel from "../components/pledgesCar";



export default function Subscriptions({handler}) {

  const [items, setItems] = useState([]);

  const tempData = {
    user: "test1",
  }

return (
  <>
<Grid2 container spacing={4} padding={3}>
  <Grid2 size={3} backgroundColor='#212121' height={'30vh'}>
    <item><p><Pledges handler={tempData.user} index={0}/></p></item>
  </Grid2>
  <Grid2 size={3} backgroundColor='#212121' height={'30vh'}>
  <item><p><Pledges handler={tempData.user}index={1}/></p></item>
  </Grid2>
  <Grid2 size={3}  backgroundColor='#212121' height={'30vh'}>
  <item><p><Pledges handler={tempData.user}index={2}/></p></item>
  </Grid2>
  <Grid2 size={3}  backgroundColor='#212121' height={'30vh'}>
  <item><p><Pledges handler={tempData.user} index={3} /></p></item>
  </Grid2>
 
</Grid2>

    <PledgesCarousel handler={tempData.user}></PledgesCarousel>
    </>

)

}

