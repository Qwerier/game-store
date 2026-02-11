import { Box, Button, Paper, Step, StepLabel, Stepper } from '@mui/material'
import { useState } from 'react'

const options = ["Address", "Payment", "Review"];

export default function CheckoutStepper() {

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => setActiveStep(step => step + 1);

    const handleBack = () => setActiveStep(step => step - 1);

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
                    Address
                </Box>
                <Box sx={{ display: activeStep === 1 ? 'block' : 'none' }}>
                    Payment
                </Box>
                <Box sx={{ display: activeStep === 2 ? 'block' : 'none' }}>
                    Review
                </Box>
            </Box>

            <Box display={'flex'} padding={2} justifyContent={'space-between'}>
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={handleNext}>Next</Button>
            </Box>
        </Paper>
    )
}
