import { LockOutlined } from "@mui/icons-material";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {useForm} from "react-hook-form";
import { loginSchema, LoginSchema } from "../../app/lib/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "./accountApi";

export default function LoginForm() {
    const [login, {isLoading}] = useLoginMutation();
    const {register, handleSubmit, formState: {errors}}= useForm<LoginSchema>({
        mode: "onSubmit",
        resolver: zodResolver(loginSchema) // allows for schema validation
    });
    
    // passed as a function reference to the submit of form
    const onSubmit = async (data: LoginSchema) => {
        await login(data);
    }

    return (
        <Container component={Paper} maxWidth='sm' sx={{ borderRadius: 3 }}>
            <Box display='flex' flexDirection="column" alignItems='center' marginTop={3} >
                <LockOutlined sx={{ mt: 3, color: 'secondary.main', fontSize: 50 }} />
                <Typography variant="h5" >
                    Sign in
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
                    <Button disabled={isLoading} variant="contained" type="submit">
                        Sign in
                    </Button>
                    <Typography sx={{ textAlign: 'center' }}>
                        Don't have an account?
                        <Typography component={Link} sx={{ ml: 2 }} to={'/register'} color="primary">
                            Sign up
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}
