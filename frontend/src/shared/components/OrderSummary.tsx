import { Box, Typography, Divider, Button, Paper } from "@mui/material";
import { currencyFormat } from "../../app/lib/util";
import { useFetchBasketQuery } from "../../features/basket/basketApi";
import { Item } from "../../app/models/Basket";
import { Link } from "react-router-dom";

export default function OrderSummary() {
    const{data: basket} = useFetchBasketQuery();
    const subtotal = basket?.items.reduce((sum: number, item: Item) => sum + item.quantity* item.price, 0) ?? 0;
    const deliveryFee = subtotal > 100 ? 0 : 5; // free delivery for orders over $100

    return (
        <Box display="flex" flexDirection="column" alignItems="center" maxWidth="lg" mx="auto">
            <Paper sx={{ mb: 2, p: 3, width: '100%', borderRadius: 3 }}>

                <Typography variant="h6" component="p" fontWeight="bold">
                    Order summary
                </Typography>
                <Typography variant="body2" sx={{fontStyle: 'italic'}}>
                    Orders over $100 qualify for free delivery!
                </Typography>
                <Box mt={2}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography color="textSecondary">Subtotal</Typography>
                        <Typography>
                            {currencyFormat(subtotal)}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography color="textSecondary">Discount</Typography>
                        <Typography color="success">
                            -$0.00
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography color="textSecondary">Delivery fee</Typography>
                        <Typography>
                            {currencyFormat(deliveryFee)}
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography color="textSecondary">Total</Typography>
                        <Typography>
                            {currencyFormat(subtotal + deliveryFee)}
                        </Typography>
                    </Box>
                </Box>

                <Box mt={2}>
                    <Button
                        component={Link}
                        to="/checkout"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mb: 1 }}
                    >
                        Checkout
                    </Button>
                    <Button
                        fullWidth
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </Paper>

        </Box>
    )
}