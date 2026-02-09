import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button, Card, CardContent, Typography, Grid, Container, CircularProgress, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PollList() {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        api.get("/polls")
            .then((res) => setPolls(res.data))
            .catch(() => alert("Failed to load polls"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            {/* Page Title */}
            <Typography variant="h4" align="center" fontWeight="bold" mb={4}>
                🗳️ Active Polls
            </Typography>

            {/* Loading */}
            {loading && (
                <Grid container justifyContent="center">
                    <CircularProgress />
                </Grid>
            )}

            {/* No Polls */}
            {!loading && polls.length === 0 && <Typography align="center">No active polls available.</Typography>}

            {/* Poll Cards */}
            <Grid container spacing={4}>
                {polls.map((poll) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4} // ✅ 3 cards per row on desktop
                        key={poll.id}
                    >
                        <Card
                            sx={{
                                height: 260,
                                width: 260, // ✅ standard height
                                borderRadius: 4,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",

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
                            <CardContent>
                                {/* Question */}
                                <Typography
                                    variant="h6"
                                    fontWeight="600"
                                    sx={{
                                        mb: 2,
                                        minHeight: 60, // ✅ keeps text height uniform
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                >
                                    {poll.question}
                                </Typography>

                                {/* Buttons */}
                                <Stack spacing={1} mt={2}>
                                    {/* Vote Button */}
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            borderRadius: 2,
                                            textTransform: "none",
                                            background: "linear-gradient(135deg, #42a5f5, #1976d2)",
                                            "&:hover": {
                                                background: "linear-gradient(135deg, #1976d2, #1565c0)",
                                            },
                                        }}
                                        onClick={() => navigate(`/poll/${poll.id}`)}
                                    >
                                        Vote Now
                                    </Button>

                                    {/* View Results */}
                                    <Button
                                        size="small"
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: 500,
                                        }}
                                        onClick={() => navigate(`/results/${poll.id}`)}
                                    >
                                        View Results →
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
