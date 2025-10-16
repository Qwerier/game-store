import { Grid } from "@mui/material";
import { useFetchBasketQuery } from "./basketApi"
import BasketItem from "./BasketItem";
import OrderSummary from "../../shared/components/OrderSummary";

export default function BasketPage() {
  const {data: basket, isLoading} = useFetchBasketQuery();

  if(isLoading) return <div>Loading...</div>
  if(!basket) return <div>Your basket is empty</div>
  
  return (
    <>
    <div>{basket.basketId}</div>
    <Grid container spacing={2} alignItems={'flex-start'}
    sx={{
        justifyContent:'space-between'
        ,alignItems:'center'
        ,flexWrap: 'wrap'
        ,overflow:'hidden'
    }}>
      <Grid size={5}>
        { basket.items.map(item => (
          <BasketItem key={item.gameId} item={item} />
        ))}
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 4 }}>
        <OrderSummary />
      </Grid>
    </Grid>
    </>
  )
}