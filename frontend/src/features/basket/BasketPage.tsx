import { Grid } from "@mui/material";
import { useFetchBasketQuery } from "./basketApi"
import BasketItem from "./BasketItem";

export default function BasketPage() {
  const {data: basket, isLoading} = useFetchBasketQuery();

  if(isLoading) return <div>Loading...</div>
  if(!basket) return <div>Your basket is empty</div>
  
  return (
    <>
    <div>{basket.basketId}</div>
    <Grid container spacing={2}>
      <Grid size={3}>
        { basket.items.map(item => (
          <BasketItem key={item.gameId} item={item} />
        ))}
        </Grid>
    </Grid>
    </>
  )
}