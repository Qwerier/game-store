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
import { useNavigate } from 'react-router-dom';
import LoadingButton from '../../shared/components/LoadingButton';

const options = ["Address", "Payment", "Review"];

export default function CheckoutStepper() {
    const [activeStep, setActiveStep] = useState(0);
    // safe deconstruction as empty object if it fails
    const { data: { name, ...restAddress } = {} as Address, isLoading } = useFetchAddressQuery();
    const [updateAddress] = useUpdateAddressMutation();

    const elements = useElements();
    const stripe = useStripe();
    const navigator = useNavigate();
    // local stepper state
    const [saveAddressChecked, setSaveAddressChecked] = useState(false);
    const [confirmationToken, setConfirmationToken] = useState<ConfirmationToken | null>(null);
    const [addressCompleted, setAddressCompleted] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [submitting, setSubmitting] = useState(false); // indicates if its under submission (for loading purposes)

    const { basket, subtotal, deliveryFee, clearBasket } = useBasketMetadata();

    const handleNext = async () => {
        // only when user moves on, otherwise on every check it would hit the server
        if (activeStep === 0 && saveAddressChecked && elements) {
            const address = await getStripeAddress();
            if (address) await updateAddress(address);
        }
        // if moving on from card details to review
        if (activeStep === 1) {
            if (!elements || !stripe) return;
            const result = await elements.submit(); // check if everything's fine and collect data
            if (result.error) return toast.error(result.error.message);

            const stripeResult = await stripe.createConfirmationToken({ elements });
            if (stripeResult.error) return toast.error(stripeResult.error.message);
            setConfirmationToken(stripeResult.confirmationToken);
        }

        if (activeStep === 2) {
            await confirmPayment();
        }
        
        if(activeStep < 2) setActiveStep(step => step + 1);
    }

    const handleBack = () => setActiveStep(step => step - 1);

    const getStripeAddress = async () => {
        const addressElement = elements?.getElement('address');
        if (!addressElement) return null;
        const { value: { name, address } } = await addressElement.getValue();

        // if both are defined then return them as the expected format
        if (name && address) return { name, ...address }
        return null;
    }

    const confirmPayment = async () => {
        setSubmitting(true);
        try {
            if (!confirmationToken || !basket?.clientSecret) {
                throw Error("Unable to process payment");
            }
            const paymentResult = await stripe?.confirmPayment({
                clientSecret: basket.clientSecret,
                redirect: 'if_required',
                confirmParams: {
                    confirmation_token: confirmationToken.id
                }
            });

            if (paymentResult?.paymentIntent?.status === 'succeeded') {
                navigator('/checkout/success');
                clearBasket();
            }
            else if (paymentResult?.error) {
                throw new Error(paymentResult.error.message);
            }
            // if for whatever reason a payment is rejected or not transmitted
            else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
            // backtracks from the current operation
            setActiveStep(step => step - 1);
        }
        finally {
            setSubmitting(false);
        }
    }

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
                            (event: StripeAddressElementChangeEvent) => setAddressCompleted(event.complete)
                        } />
                    <FormControlLabel
                        sx={{ display: 'flex', justifyContent: 'end' }}
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
                    disabled={(activeStep === 0 && !addressCompleted) ||
                        (activeStep === 1 && !paymentCompleted) ||
                        submitting
                    }
                >
                    {activeStep === options.length - 1 ? `Pay ${currencyFormat(subtotal + deliveryFee)}` : `Next`}
                </Button>
                {/* <LoadingButton
                    isLoading={submitting}
                    onClickEvent={handleNext}
                    isDisabled={(activeStep === 0 && !addressCompleted) ||
                        (activeStep === 1 && !paymentCompleted) ||
                        submitting
                    }
                    label={activeStep === options.length - 1 ? `Pay ${currencyFormat(subtotal + deliveryFee)}` : `Next`}
                /> */}
            </Box>
        </Paper>
    )
}

