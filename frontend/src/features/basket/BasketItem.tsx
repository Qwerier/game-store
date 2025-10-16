import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import { Item } from "../../app/models/Basket"
import { Add, Close, Remove } from "@mui/icons-material";
import { useAddBasketItemMutation, useRemoveBasketItemMutation } from "./basketApi";

type Props = {
    item: Item
};
const predef =  { xs: '0.8rem', sm: '1rem', md: '1.1rem' };
const predef2 =  { xs: '1rem', sm: '1.1rem', md: '1.2rem' };

export default function BasketItem({item}:Props) {
    const [removeBasketItem] = useRemoveBasketItemMutation();
    const [addBasketItem] = useAddBasketItemMutation();

  return (
    <Paper sx={{
        width:{ xs: 350, sm: 500, md: 500 }

        ,borderRadius:3
        ,display:'flex'
        ,justifyContent:'space-between'
        ,alignItems:'center'
        ,flexWrap: 'wrap'
        ,overflow:'hidden'
        ,mb:{xs:1, sm:2, md:2}
        ,mt:{xs:1, sm:2, md:2}
        ,p:{xs:1, sm:2, md:2}
        ,pr:{xs:4, sm:4, md:4}
        }}>

            <Box display='flex' alignItems='center'>
                <Box
                    component='img'
                    src={item.pictureUrl}
                    alt={item.name}
                    sx={{height:100, width: 100, objectFit:'cover', borderRadius:2, mr: 4, ml:4, p:1}}
                />

                <Box display={'flex'} flexDirection='column' gap={1} sx={{minWidth: 0, flexGrow: 1, flexShrink: 1}}>
                    <Typography sx={{
                        fontSize: predef2, 
                        wordBreak: 'break-word', 
                        overflowWrap: 'break-word', 
                        whiteSpace: 'normal'}}>
                        {item.name}
                    </Typography>
                    <Box display={'flex'} alignItems={'center'}>
                        <Typography sx={{fontSize: predef}}>
                            € {item.price} x {item.quantity}
                        </Typography>
                        <Typography sx={{fontSize: predef}}>
                        {` = € ${item.price * item.quantity}`}
                        </Typography>
                    </Box>

                    <Grid display={'flex'} alignItems={'center'} flexDirection={'row'}>
                        <IconButton color="error" size="small" sx={{border: 1, borderRadius: 1}}
                        onClick={()=> removeBasketItem({gameId: item.gameId, quantity: 1 })}
                        >
                            <Remove />
                        </IconButton>
                        <Typography sx={{fontSize: predef, mx:2}}>{item.quantity}</Typography>
                        <IconButton color="success" size="small" sx={{border: 1, borderRadius: 1}} 
                        onClick={()=> addBasketItem({game: item, quantity: item.quantity})}
                        >
                            <Add />
                        </IconButton>
                    </Grid>
                </Box>

            </Box>

            <IconButton color="error" size="small"
            onClick={() => removeBasketItem({gameId: item.gameId, quantity: item.quantity})}
            sx={{
                border: 1,
                borderRadius: 3, 
                minWidth: 0,
                position: 'absolute',
                right: '0px',
                top: '0px',
                alignSelf: 'stretch'
                }} >
                <Close/>
            </IconButton>
    </Paper>
  )
}