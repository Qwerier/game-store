import { Link, useParams } from "react-router-dom"
import { useFetchOrderDetailedQuery } from "./orderApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { Box, Button, Card, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { currencyFormat } from "../../app/lib/util";

export default function OrderDetailsPage() {
    const { id } = useParams();
    const { data: order, isLoading } = useFetchOrderDetailedQuery(id ?? skipToken);

    if (isLoading) return <Typography>Please wait</Typography>
    if (!id) return <Typography>Provide a valid order ID</Typography>
    if (!order) return <Typography>Order not found</Typography>

    return (
        <Card sx={{ p: 2, maxWidth: 'md', mx: 'auto' }}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant="h5" align="center">
                    Order summaxry for #{order?.id}
                </Typography>
                <Button component={Link} to={'/orders'} variant="outlined">
                    Back to orders
                </Button>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box>
                <Typography variant="h6" fontWeight={'bold'}>
                    Billing and delivery information
                </Typography>
                <dl>
                    <Typography component={'dt'} variant='subtitle1' fontWeight={'500'}>
                        Shipping address
                    </Typography>
                    <Typography component={'dd'} variant="body2" fontWeight={'300'} >
                        Address goes here
                    </Typography>
                </dl>
                <dl>
                    <Typography component={'dt'} variant='subtitle1' fontWeight={'500'}>
                        Payment info
                    </Typography>
                    <Typography component={'dd'} variant="body2" fontWeight={'300'} >
                        Payment goes here
                    </Typography>
                </dl>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box>
                <Typography variant="h6" fontWeight={'bold'}>
                    Order details
                </Typography>
                <dl>
                    <Typography component={'dt'} variant='subtitle1' fontWeight={'500'}>
                        Email address
                    </Typography>
                    <Typography component={'dd'} variant="body2" fontWeight={'300'} >
                        {order?.buyerEmail}
                    </Typography>
                </dl>
                <dl>
                    <Typography component={'dt'} variant='subtitle1' fontWeight={'500'}>
                        Order status
                    </Typography>
                    <Typography component={'dd'} variant="body2" fontWeight={'300'} >
                        {order?.orderStatus}
                    </Typography>
                </dl>
                <dl>
                    <Typography component={'dt'} variant='subtitle1' fontWeight={'500'}>
                        Order date
                    </Typography>
                    <Typography component={'dd'} variant="body2" fontWeight={'300'} >
                        {order?.orderDate}
                    </Typography>
                </dl>
            </Box>
            <Divider sx={{ my: 2 }} />

            <TableContainer>
                <Table>
                    <TableBody>
                        {order?.orderItems.map((item) => (
                            <TableRow key={item.gameId}>
                                <TableCell sx={{ py: 4 }}>
                                    <Box display={'flex'} gap={2} alignItems={'center'}>
                                        <img src={item.pictureUrl} alt={item.name} style={{ width: 40, height: 40 }} />
                                        <Typography>{item.name}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align='center' sx={{ p: 3 }}>
                                    x {item.quantity}
                                </TableCell>
                                <TableCell align='right' sx={{ p: 3 }}>
                                    {item.price}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box>
                <dl style={{ display: 'flex', justifyContent: 'space-between' }} >
                    <Typography component={'dt'} variant='subtitle1' fontWeight={'500'}>
                        Subtotal
                    </Typography>
                    <Typography component={'dd'} variant="body2" fontWeight={'300'} >
                        {currencyFormat(order?.subtotal)}
                    </Typography>
                </dl>
                <dl style={{ display: 'flex', justifyContent: 'space-between' }} >
                    <Typography component={'dt'} variant='subtitle1' fontWeight={'500'}>
                        Subtotal
                    </Typography>
                    <Typography component={'dd'} variant="body2" fontWeight={'300'} >
                        {order?.subtotal}
                    </Typography>
                </dl>
                <dl style={{ display: 'flex', justifyContent: 'space-between' }} >
                    <Typography component={'dt'} variant='subtitle1' fontWeight={'500'}>
                        Delivery Fee
                    </Typography>
                    <Typography component={'dd'} variant="body2" fontWeight={'300'} >
                        {currencyFormat(order?.deliveryFee)}
                    </Typography>
                </dl>
            </Box>
            <dl style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography component={'dt'} variant="subtitle1" fontWeight={'500'}>
                    Total
                </Typography>
                <Typography component={'dd'} variant="body2" fontWeight={'700'}>
                    {currencyFormat(order?.total)}
                </Typography>
            </dl>
        </Card>
    )
}
