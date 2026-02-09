import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    /* Check active route */
    const isActive = (path) => location.pathname === path;

    return (
        <AppBar
            position="sticky"
            elevation={6}
            sx={{
                background: "linear-gradient(135deg, #1976d2, #42a5f5)",
                px: 2,
            }}
        >
            <Toolbar>
                {/* Logo / Title */}
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                        flexGrow: 1,
                        cursor: "pointer",
                        letterSpacing: 1,
                        "&:hover": {
                            opacity: 0.9,
                        },
                    }}
                    onClick={() => navigate("/")}
                >
                    🗳️ PollingApp
                </Typography>

                {/* Navigation Buttons */}
                <Box>
                    {/* Home */}
                    <Button
                        onClick={() => navigate("/")}
                        sx={{
                            color: "white",
                            mx: 1,
                            fontWeight: 700,
                            textTransform: "none",
                            borderBottom: isActive("/") ? "2px solid white" : "none",
                            borderRadius: 0,

                            "&:hover": {
                                backgroundColor: "rgba(255,255,255,0.15)",
                            },
                        }}
                    >
                        Home
                    </Button>

                    {/* Polls */}
                    <Button
                        onClick={() => navigate("/polllist")}
                        sx={{
                            color: "white",
                            mx: 1,
                            fontWeight: 700,
                            textTransform: "none",
                            borderBottom: isActive("/polllist") ? "2px solid white" : "none",
                            borderRadius: 0,

                            "&:hover": {
                                backgroundColor: "rgba(255,255,255,0.15)",
                            },
                        }}
                    >
                        Poll's
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
