import { useFetchBasketQuery } from '../basket/basketApi'
import { Box, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';

export default function Review() {
    const { data: basket } = useFetchBasketQuery();

    return (
        <div>
            <Box mt={4} width={'100%'} >
                <Typography>
                    Billing and delivery
                </Typography>
                <dl>
                    <Typography component={'dt'} fontWeight={'medium'}>
                        Shipping address
                    </Typography>
                    <Typography component={'dt'} color={'textSecondary'}>
                        Address here
                    </Typography>

                    <Typography component={'dt'} fontWeight={'medium'}>
                        Payment details
                    </Typography>
                    <Typography component={'dt'} color={'textSecondary'}>
                        Payment details here
                    </Typography>
                </dl>
            </Box>

            <Box mt={6} mx={'auto'}>
                <Divider/>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {basket?.items.map((item) => (
                                <TableRow key={item.gameId}>
                                    <TableCell sx={{py: 4}}>
                                        <Box display={'flex'} gap={2} alignItems={'center'}>
                                            <img src={item.pictureUrl} alt={item.name} style={{ width: 40, height: 40}} />
                                            <Typography>{item.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align='center' sx={{p: 3}}>
                                        x {item.quantity}
                                    </TableCell>
                                    <TableCell align='right' sx={{p: 3}}>
                                        {item.price}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}
