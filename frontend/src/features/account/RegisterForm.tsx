import React from 'react'
import { useForm } from 'react-hook-form'
import { registerSchema, RegisterSchema } from "../../app/lib/registerSchema";
import { useRegisterMutation } from './accountApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { data, Link } from 'react-router-dom';
import { LockOutlined } from '@mui/icons-material';
import { Container, Paper, Box, Typography, TextField, Button } from '@mui/material';

export default function RegisterForm() {
    const [registerUser] = useRegisterMutation();
    const { register, handleSubmit, formState: { errors, isValid, isLoading } } = useForm<RegisterSchema>({
        mode: 'onSubmit',
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser(data);
    }
    return (
        <Container component={Paper} maxWidth='sm' sx={{ borderRadius: 3 }}>
            <Box display='flex' flexDirection="column" alignItems='center' marginTop={3} >
                <LockOutlined sx={{ mt: 3, color: 'secondary.main', fontSize: 50 }} />
                <Typography variant="h5" >
                    Register
                </Typography>
                <Box
                    component={'form'}
                    onSubmit={handleSubmit(onSubmit)}
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'column'}
                    gap={3}
                    margin={3}
                >
                    <TextField
                        fullWidth
                        label="Email"
                        autoComplete="user@email.com"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        autoFocus
                    />
                    <TextField
                        fullWidth
                        label='Username'
                        {...register("username")}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        fullWidth
                        label='Password'
                        type="password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button disabled={isLoading || isValid} variant="contained" type="submit">
                        Register 
                    </Button>
                    <Typography sx={{ textAlign: 'center' }}>
                        Don't have an account?
                        <Typography component={Link} sx={{ ml: 2 }} to={'/login'} color="primary">
                            Sign in
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}
