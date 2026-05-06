import { ConfirmationToken } from "@stripe/stripe-js";
import { Order, ShippingAddress } from "../models/Order";

export function currencyFormat(num: number) {
    return '$' + num.toFixed(2);
}

function isConfirmationToken(obj: any): obj is ConfirmationToken {
    return obj && typeof obj === 'object' && 'shipping' in obj;
}

function isOrder(obj: any): obj is Order {
    return obj && typeof obj === 'object' && 'shippingAddress' in obj;
}

export function formatAddress(owner: Order | ConfirmationToken | null) {
    if(!owner) return '';

    if (isConfirmationToken(owner)) {
        if (!owner.shipping) return '';
        const { name, address } = owner.shipping;
        return `${name}, ${address?.line1}, ${address?.city}, ${address?.state},
        ${address?.postal_code}, ${address?.country}`
    }
    else if(isOrder(owner)){
        const address = owner.shippingAddress;

        return `${address?.name}, ${address?.line1}, ${address?.city}, ${address?.state},
        ${address?.postal_code}, ${address?.country}`
    }
}

//   const paymentString = () => {
//     const card = order.paymentSummary;

//     return `${card?.brand?.toUpperCase()}, **** **** **** ${card?.last4}, 
//             Exp: ${card?.exp_month}/${card?.exp_year}`
//   }
    // const paymentFormatting = () => {
    //     if(!confirmationToken?.payment_method_preview.card) return '';
    //     const {card} = confirmationToken.payment_method_preview;
    //     return `${card.brand.toUpperCase()}, **** **** **** ${card.last4}, 
    //         Exp: ${card.exp_month}/${card.exp_year}`
    // }
// export function formatPayment(owner:)