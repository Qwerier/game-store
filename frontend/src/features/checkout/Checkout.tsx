import { Grid, Typography } from "@mui/material";
import CheckoutStepper from "./CheckoutStepper";
import OrderSummary from "../../shared/components/OrderSummary";

export default function Checkout() {
  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        <CheckoutStepper />
      </Grid>
      <Grid size={4}>
        <OrderSummary />
      </Grid>
    </Grid>
  )
}
