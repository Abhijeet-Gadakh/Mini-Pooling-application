import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Card, CardContent, Typography, TextField, Button, Box, IconButton, InputAdornment, Alert, CircularProgress } from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { api } from "../services/api";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    /* Handle Login */
    const handleLogin = async () => {
        setError("");

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            setLoading(true);

            const res = await api.post("/auth/login", {
                email,
                password,
            });

            /* Save login (basic session) */
            localStorage.setItem("admin", JSON.stringify(res.data.admin));

            /* Redirect to Create Poll */
            navigate("/admindashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "85vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* Login Card */}
            <Container maxWidth="xs">
                <Card
                    sx={{
                        borderRadius: 4,
                        /* Gradient background */
                        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",

                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                        transition: "all 0.3s ease",

                        "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: "0 16px 35px rgba(0,0,0,0.25)",
                        },
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        {/* Title */}
                        <Typography variant="h4" fontWeight="bold" align="center" mb={1}>
                            Admin Login
                        </Typography>

                        <Typography align="center" color="text.secondary" mb={3}>
                            Login to manage polls
                        </Typography>

                        {/* Error */}
                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {/* Email */}
                        <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />

                        {/* Password */}
                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 3 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Login Button */}
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            disabled={loading}
                            onClick={handleLogin}
                            sx={{
                                borderRadius: 3,
                                py: 1.2,
                                textTransform: "none",
                            }}
                        >
                            {loading ? <CircularProgress size={24} /> : "Login"}
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
