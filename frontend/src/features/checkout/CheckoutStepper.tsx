import { Box, Button, Checkbox, FormControlLabel, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react'
import Review from './Review';
import { Address } from '../../app/models/User';
import { useFetchAddressQuery, useUpdateAddressMutation } from '../account/accountApi';
import { ConfirmationToken, StripeAddressElementChangeEvent, StripePaymentElementChangeEvent } from '@stripe/stripe-js';
import { useBasketMetadata } from '../../app/lib/hooks/useBasketMetadata';
import { currencyFormat } from '../../app/lib/util';
import { toast } from 'react-toastify';

const options = ["Address", "Payment", "Review"];

export default function CheckoutStepper() {
    const [activeStep, setActiveStep] = useState(0);
    // safe deconstruction as empty object if it fails
    const { data: { name, ...restAddress } = {} as Address, isLoading } = useFetchAddressQuery();
    const [updateAddress] = useUpdateAddressMutation();
    const [saveAddressChecked, setSaveAddressChecked] = useState(false);
    const elements = useElements();
    const stripe = useStripe();
    const [confirmationToken, setConfirmationToken] = useState<ConfirmationToken | null>(null);

    const [addressCompleted, setAddressCompleted] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const {subtotal, deliveryFee} = useBasketMetadata();
    const handleNext = async () => {
        // only when user moves on, otherwise on every check it would hit the server
        if (activeStep === 0 && saveAddressChecked && elements) {
            const address = await getStripeAddress();
            if(address) await updateAddress(address);
        }
        // if moving on from card details to review
        if (activeStep === 1) {
            if(!elements || !stripe) return;
            const result = await elements.submit(); // check if everything's fine and collect data
            if(result.error) return toast.error(result.error.message);

            const stripeResult = await stripe.createConfirmationToken({elements});
            if(stripeResult.error) return toast.error(stripeResult.error.message);
            setConfirmationToken(stripeResult.confirmationToken);
        }

        setActiveStep(step => step + 1);
    }

    const getStripeAddress = async () => {
        const addressElement = elements?.getElement('address');
        if(!addressElement) return null;
        const {value: {name, address}} = await addressElement.getValue();

        // if both are defined then return them as the expected format
        if(name && address) return {name, ...address}
        return null;
    }


    const handleBack = () => setActiveStep(step => step - 1);


    if (isLoading) return <Typography variant='h6'>Loading checkout...</Typography>

    return (
        <Paper>
            <Stepper activeStep={activeStep} >
                {
                    options.map((label, index) => {
                        return (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        )
                    })
                }
            </Stepper>

            <Box mt={{ mt: 2 }}>
                <Box sx={{ display: activeStep === 0 ? 'block' : 'none' }}>
                    <AddressElement options={{
                        mode: 'shipping',
                        defaultValues: {
                            name: name,
                            address: restAddress
                        }
                    }} 
                    onChange={
                        (event: StripeAddressElementChangeEvent)=> setAddressCompleted(event.complete)
                    }/>
                    <FormControlLabel
                        sx={{display: 'flex', justifyContent: 'end'}}
                        control={<Checkbox 
                            checked={saveAddressChecked} 
                            onChange={e => setSaveAddressChecked(e.target.checked)} 
                        />}
                        label='Save as default address'
                    />
                </Box>
                <Box sx={{ display: activeStep === 1 ? 'block' : 'none' }}>
                    <PaymentElement onChange={
                        (event: StripePaymentElementChangeEvent) => setPaymentCompleted(event.complete)
                    } />
                </Box>
                <Box sx={{ display: activeStep === 2 ? 'block' : 'none' }}>
                    <Review confirmationToken={confirmationToken} />
                </Box>
            </Box>

            <Box display={'flex'} padding={2} justifyContent={'space-between'}>
                <Button onClick={handleBack}>Back</Button>
                <Button 
                    onClick={handleNext}
                    disabled={(activeStep === 0 && !addressCompleted) || (activeStep === 1 && !paymentCompleted)}
                    >
                        {activeStep === options.length - 1 ? `Pay ${currencyFormat(subtotal+deliveryFee)}`: `Next`}
                </Button>
            </Box>
        </Paper>
    )
}

