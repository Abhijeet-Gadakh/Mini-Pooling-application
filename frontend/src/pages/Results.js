import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

import { Container, Card, CardContent, Typography, LinearProgress, CircularProgress, Button, Box } from "@mui/material";

export default function Results() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/polls/${id}/results`)
            .then((res) => setResults(res.data))
            .catch(() => alert("Failed to load results"))
            .finally(() => setLoading(false));
    }, [id]);

    const totalVotes = results.reduce((sum, option) => sum + option.votes, 0);

    /* Loading */
    if (loading) {
        return (
            <Container sx={{ mt: 5, textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Card
                sx={{
                    borderRadius: 3,
                    boxShadow: 4,
                    p: 2,
                    /* Gradient background */
                    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
                    transition: "all 0.3s ease",

                    "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 16px 35px rgba(0,0,0,0.25)",
                    },
                }}
            >
                <CardContent>
                    {/* Title */}
                    <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
                        📊 Poll Results
                    </Typography>

                    {/* Results */}
                    {results.map((option) => {
                        const percent = totalVotes ? Math.round((option.votes / totalVotes) * 100) : 0;

                        return (
                            <Box key={option.id} sx={{ mb: 3 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mb: 0.5,
                                    }}
                                >
                                    <Typography fontWeight="500">{option.text}</Typography>

                                    <Typography>
                                        {option.votes} votes ({percent}%)
                                    </Typography>
                                </Box>

                                <LinearProgress
                                    variant="determinate"
                                    value={percent}
                                    sx={{
                                        height: 10,
                                        borderRadius: 5,
                                    }}
                                />
                            </Box>
                        );
                    })}

                    {/* Total */}
                    <Typography align="center" color="text.secondary" mt={2}>
                        Total Votes: {totalVotes}
                    </Typography>

                    {/* Back Button */}
                    <Button fullWidth variant="outlined" sx={{ mt: 3 }} onClick={() => navigate("/polllist")}>
                        Back to Polls
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
}
