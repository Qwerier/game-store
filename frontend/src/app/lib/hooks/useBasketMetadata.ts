import { useFetchBasketQuery } from "../../../features/basket/basketApi"
import { Item } from "../../models/Basket";

export const useBasketMetadata = () => {
    const {data: basket} = useFetchBasketQuery();
    const subtotal = basket?.items.reduce((sum: number, item: Item) => sum + item.quantity* item.price, 0) ?? 0;
    const deliveryFee = subtotal > 100 ? 0 : 5; // free delivery for orders over $100

    return {basket, subtotal, deliveryFee};
}