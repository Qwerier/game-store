import { Typography } from "@mui/material";
import { Order } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

export default function CheckoutSuccess() {
  const {state} = useLocation();
  const order = state as Order;
  
  return (
    <Typography variant="h5">
        Payment successful
    </Typography>
  )
}
