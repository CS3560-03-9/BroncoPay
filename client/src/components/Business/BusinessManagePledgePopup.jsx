/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Card,
  Dialog,
  IconButton,
  Typography,
  Divider,
  Box,
  Stack,
  Grid2,
  Chip,
  Button,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import { deletePledge, fetchSubscribedToPledge } from "../../api/pledges";
import LoadingPage from "../LoadingPage";

export default function BusinessManagePledgePopup({
  open,
  handleClose,
  pledge,
  sx,
}) {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);

  let pledgeInterval = "";
  if (pledge?.pledge_interval === 30) {
    pledgeInterval = "Monthly";
  } else if (pledge?.pledge_interval === 90) {
    pledgeInterval = "Quarterly";
  } else if (pledge?.pledge_interval === 180) {
    pledgeInterval = "Semi-annually";
  } else if (pledge?.pledge_interval === 365) {
    pledgeInterval = "Annually";
  }

  useEffect(() => {
    const fetchSubs = async () => {
      if (!open || !pledge) return; // Only fetch if open and pledge is defined

      setLoading(true);
      try {
        const response = await fetchSubscribedToPledge(pledge.pledge_id);
        setSubscribers(response);
      } catch (err) {
        console.error("Error fetching subscribers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubs();
  }, [open, pledge]);

  const handleDelete = async () => {
    try {
      deletePledge(pledge.pledge_id);
      handleClose();
      window.location.reload();
    } catch (err) {
      console.error("Error deleting pledge:", err);
    }
  };

  if (!pledge) {
    return null; // No pledge selected yet
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <Card sx={{ ...sx }} raised>
        <Box sx={{ p: 4 }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ my: 3, alignItems: "center", justifyContent: "center" }}
          >
            <AccountBalanceIcon sx={{ fontSize: 35 }} />
            <Typography
              variant="h4"
              component="h2"
              textAlign="center"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              Manage Pledge
            </Typography>
          </Stack>
          <Divider variant="middle" sx={{ mb: 2 }} />
          <Grid2 container direction="row" spacing={2}>
            <Grid2 size={5}>
              <Card
                raised
                sx={{
                  p: 2,
                  border: 1,
                  borderRadius: 2,
                  borderColor: "grey.500",
                }}
              >
                <Stack spacing={1.5}>
                  <Typography variant="body1" sx={{ fontWeight: 200 }}>
                    {`Pledge ID: ${pledge?.pledge_id}`}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 400 }}>
                    {`Cost: ${pledge?.cost}`}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 400 }}>
                    {`Interval: ${pledgeInterval}`}
                  </Typography>
                </Stack>
              </Card>
              <Card
                raised
                sx={{
                  p: 2,
                  border: 1,
                  borderRadius: 2,
                  borderColor: "grey.500",
                  mt: 2,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Description
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 200, mt: 1 }}>
                  {pledge?.pledge_desc}
                </Typography>
              </Card>
              <Button
                variant="outlined"
                color="error"
                sx={{ mt: 2 }}
                onClick={handleDelete}
              >
                Delete Pledge
              </Button>
            </Grid2>
            <Grid2 size={7}>
              <Card
                raised
                sx={{
                  p: 2,
                  border: 1,
                  borderRadius: 2,
                  borderColor: "grey.500",
                  height: "100%",
                }}
              >
                <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: 400 }}>
                  Accounts Subscribed
                </Typography>
                <Divider sx={{ my: 2, borderBottomWidth: 2 }} />
                {loading ? (
                  <LoadingPage />
                ) : subscribers.length > 0 ? (
                  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                    {subscribers.map((sub) => (
                      <Chip key={sub.handler} label={sub.handler} />
                    ))}
                  </Stack>
                ) : (
                  <Typography>No subscribers found.</Typography>
                )}
              </Card>
            </Grid2>
          </Grid2>
        </Box>
      </Card>
    </Dialog>
  );
}
