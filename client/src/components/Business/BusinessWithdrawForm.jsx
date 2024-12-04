/* eslint-disable react/prop-types */
import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

import PaymentCard from "../Payment/PaymentCard";

export default function BusinessWithdrawForm({
  open,
  handleClose,
  onWithdraw,
}) {
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
      <PaymentCard
        title="Withdraw Funds"
        icon={<RequestQuoteIcon />}
        transaction_type="WITHDRAW"
        handleConfirm={(data) => {
          onWithdraw(data);
        }}
      />
    </Dialog>
  );
}
