import { Grid, Typography } from "@mui/material";
import CheckoutStepper from "./CheckoutStepper";
import OrderSummary from "../../shared/components/OrderSummary";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"
import { useFetchBasketQuery } from "../basket/basketApi";
import { useMemo } from "react";
import { useCreatePaymentIntentMutation } from "./checkoutApi";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function Checkout() {
  const { data: basket } = useFetchBasketQuery(); // should retrieve clientsecret
  const [createPaymentIntent, {isLoading}] = useCreatePaymentIntentMutation();
  const options: StripeElementsOptions | undefined = useMemo(() => {
    if (!basket?.clientSecret) return undefined;
    return {
      clientSecret: basket.clientSecret
    }
  }, [basket?.clientSecret])

  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        {!stripePromise || !options ? (
          <Typography variant="h6">Loading Checkout</Typography>
        ) : (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutStepper />
          </Elements>
        )}

      </Grid>
      <Grid size={4}>
        <OrderSummary />
      </Grid>
    </Grid>
  )
}
