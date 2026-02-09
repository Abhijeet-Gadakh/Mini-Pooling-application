import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";

import { Button, Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel, CircularProgress, Container, Alert } from "@mui/material";

export default function PollDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [poll, setPoll] = useState(null);
    const [selected, setSelected] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get(`/polls/${id}`)
            .then((res) => setPoll(res.data))
            .catch(() => setError("Failed to load poll"))
            .finally(() => setLoading(false));
    }, [id]);

    const vote = async () => {
        try {
            await api.post(`/polls/${id}/vote`, {
                optionId: selected,
                userIp: "127.0.0.1",
            });

            navigate(`/results/${id}`);
        } catch (err) {
            setError(err.response?.data?.message || "Voting failed");
        }
    };

    /* Loading */
    if (loading) {
        return (
            <Container sx={{ mt: 5, textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );
    }

    /* Error */
    if (error) {
        return (
            <Container sx={{ mt: 5 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Card
                sx={{
                    borderRadius: 3,
                    p: 2,
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
                    <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
                        {poll.question}
                    </Typography>

                    {/* Options */}
                    <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value)}>
                        {poll.options.map((option) => (
                            <FormControlLabel
                                key={option.id}
                                value={option.id}
                                control={<Radio />}
                                label={option.text}
                                sx={{
                                    border: "1px solid #ddd",
                                    borderRadius: 2,
                                    mb: 1,
                                    px: 2,
                                    "&:hover": {
                                        backgroundColor: "#f5f5f5",
                                    },
                                }}
                            />
                        ))}
                    </RadioGroup>

                    {/* Submit Button */}
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={!selected}
                        sx={{
                            mt: 3,
                            borderRadius: 2,
                            textTransform: "none",
                            py: 1.2,
                        }}
                        onClick={vote}
                    >
                        Submit Vote
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
}
