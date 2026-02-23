import { Box, Button, Checkbox, FormControlLabel, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { AddressElement, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react'
import Review from './Review';
import { Address } from '../../app/models/User';
import { useFetchAddressQuery, useUpdateAddressMutation } from '../account/accountApi';

const options = ["Address", "Payment", "Review"];

export default function CheckoutStepper() {
    const [activeStep, setActiveStep] = useState(0);
    // safe deconstruction as empty object if it fails
    const { data: { name, ...restAddress } = {} as Address, isLoading } = useFetchAddressQuery();
    const [updateAddress] = useUpdateAddressMutation();
    const [saveAddressChecked, setSaveAddressChecked] = useState(false);
    const elements = useElements();

    const handleNext = async () => {
        // only when user moves on, otherwise on every check it would hit the server
        if (activeStep === 0 && saveAddressChecked && elements) {
            const address = await getStripeAddress();
            if(address) await updateAddress(address);
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
                    }} />
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
                    <PaymentElement />
                </Box>
                <Box sx={{ display: activeStep === 2 ? 'block' : 'none' }}>
                    <Review />
                </Box>
            </Box>

            <Box display={'flex'} padding={2} justifyContent={'space-between'}>
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={handleNext}>Next</Button>
            </Box>
        </Paper>
    )
}

