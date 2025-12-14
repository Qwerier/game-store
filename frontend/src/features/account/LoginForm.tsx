import { LockOutlined } from "@mui/icons-material";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <Container component={Paper} maxWidth='sm' sx={{borderRadius: 3}}>
        <Box display='flex' flexDirection="column" alignItems='center' marginTop={3} >           
            <LockOutlined sx={{mt: 3, color: 'secondary.main', fontSize: 50 }} />
            <Typography variant="h5" >
                Sign in
            </Typography>
            <Box
                component={'form'}
                width={'100%'}
                display={'flex'}
                flexDirection={'column'}
                gap={3}
                margin = {3}
            >
                <TextField
                    fullWidth
                    label="Email"
                    autoComplete="user@email.com"
                    autoFocus
                />
                <TextField
                    fullWidth
                    label='Username'
                    
                />
                <TextField
                    fullWidth
                    label='Password'
                    type="password"
                />
                <Button variant="contained">
                    Sign in
                </Button>
                <Typography sx={{textAlign: 'center'}}>
                    Don't have an account?
                    <Typography component={Link} sx={{ml: 2}} to={'/register'} color="primary">
                        Sign up
                    </Typography>
                </Typography>
            </Box>
        </Box>
    </Container>
  )
}
