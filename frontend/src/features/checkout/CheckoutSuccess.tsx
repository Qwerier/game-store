import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Order } from "../../app/models/Order";
import { currencyFormat } from "../../app/lib/util";

export default function CheckoutSuccess() {
  const { state } = useLocation();
  const order = state.data as Order; // data is a property otherwise null on page load

  if (!order) return <Typography> Problem accessing order</Typography>

  const addressString = () => {
    const address = order.shippingAddress;

    return `${address?.name}, ${address?.line1}, ${address?.city}, ${address?.state},
            ${address?.postal_code}, ${address?.country}`
  }

  const paymentString = () => {
    const card = order.paymentSummary;

    return `${card?.brand?.toUpperCase()}, **** **** **** ${card?.last4}, 
            Exp: ${card?.exp_month}/${card?.exp_year}`
  }
  return (
    <Container maxWidth='md'>
      <Typography>
        Your order with ID {order.id} has been successfully processed!
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mb: 2, display: "flex", flexDirection: 'column', gap: 1.5 }} >
        <Box display='flex' justifyContent='space-between'>
          <Typography variant="body2" color="textSecondary" >
            Order date
          </Typography>
          <Typography variant="body2" fontWeight='bold' >
            {order.orderDate}
          </Typography>
        </Box>
        <Divider />
        <Box display='flex' justifyContent='space-between'>
          <Typography variant="body2" color="textSecondary" >
            Order date
          </Typography>
          <Typography variant="body2" fontWeight='bold' >
            {order.orderDate}
          </Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant="body2" color="textSecondary" >
            Payment method
          </Typography>
          <Typography variant="body2" fontWeight='bold' >
            {paymentString()}
          </Typography>
        </Box>
        <Divider />
        <Box display='flex' justifyContent='space-between'>
          <Typography variant="body2" color="textSecondary" >
            Shipping address
          </Typography>
          <Typography variant="body2" fontWeight='bold' >
            {addressString()}
          </Typography>
        </Box>
        <Divider />
        <Box display='flex' justifyContent='space-between'>
          <Typography variant="body2" color="textSecondary" >
            Amount
          </Typography>
          <Typography variant="body2" fontWeight='bold' >
            {currencyFormat(order.total)}
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
