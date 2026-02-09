import { Container, Typography, Button, Box, Grid, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    minHeight: "85vh",
                    backgroundImage: `
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')
  `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                }}
            >
                <Container>
                    <Typography variant="h3" fontWeight="bold" mb={2}>
                        Your Voice Matters 🗳️
                    </Typography>

                    <Typography variant="h6" mb={4} sx={{ maxWidth: "600px" }}>
                        Create polls, share opinions, and see real-time results. A modern platform for quick decision making.
                    </Typography>

                    <Box>
                        <Button variant="contained" size="large" sx={{ mr: 2, mb: 2 }} onClick={() => navigate("/polllist")}>
                            Explore Polls
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Features Section */}
            <Container sx={{ mt: 8, mb: 8 }}>
                <Typography variant="h4" align="center" fontWeight="bold" mb={5}>
                    Why Choose Our Platform?
                </Typography>

                <Grid container spacing={4}>
                    {/* Feature 1 */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ p: 3, textAlign: "center", height: "100%" }}>
                            <Typography variant="h5" mb={1}>
                                ⚡ Fast Voting
                            </Typography>

                            <Typography color="text.secondary">Participate in polls instantly with a smooth and responsive interface.</Typography>
                        </Card>
                    </Grid>

                    {/* Feature 2 */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ p: 3, textAlign: "center", height: "100%" }}>
                            <Typography variant="h5" mb={1}>
                                📊 Live Results
                            </Typography>

                            <Typography color="text.secondary">View real-time voting results with visual progress indicators.</Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            {/* Call To Action */}
            <Box
                sx={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    py: 6,
                    textAlign: "center",
                }}
            >
                <Typography variant="h4" mb={2}>
                    Ready to Start Polling?
                </Typography>

                <Typography mb={3}>Join thousands of users and make your voice heard.</Typography>

                <Button variant="contained" color="secondary" size="large" onClick={() => navigate("/login")}>
                    Create Your First Poll
                </Button>
            </Box>
        </Box>
    );
}
