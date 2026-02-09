import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Box, Grid, Card, CardContent, Typography, TextField, Button, Stack, Alert } from "@mui/material";

export default function AdminDashboard() {
    /* Create poll state */
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);
    const [message, setMessage] = useState("");

    /* Poll list state */
    const [polls, setPolls] = useState([]);

    /* Load all polls (active + inactive) */
    useEffect(() => {
        loadPolls();
    }, []);

    const loadPolls = async () => {
        const res = await api.get("/polls");
        setPolls(res.data);
    };

    /* Create poll */
    const createPoll = async () => {
        if (!question || options.some((o) => !o)) {
            setMessage("Please fill all fields");
            return;
        }

        await api.post("/polls", { question, options });

        setMessage("Poll created successfully");
        setQuestion("");
        setOptions(["", ""]);
        loadPolls();
    };

    /* Deactivate poll */
    const deactivatePoll = async (id) => {
        await fetch(`http://localhost:3001/polls/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isActive: false }),
        });

        loadPolls();
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight="bold" mb={3}>
                🛠️ Admin Dashboard
            </Typography>

            {message && <Alert sx={{ mb: 2 }}>{message}</Alert>}

            <Grid container spacing={4}>
                {/* LEFT SIDE – CREATE POLL */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: "100%", borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h6" mb={2}>
                                ➕ Create New Poll
                            </Typography>

                            <TextField fullWidth label="Poll Question" value={question} onChange={(e) => setQuestion(e.target.value)} sx={{ mb: 2 }} />

                            {options.map((opt, i) => (
                                <TextField
                                    key={i}
                                    fullWidth
                                    label={`Option ${i + 1}`}
                                    value={opt}
                                    onChange={(e) => {
                                        const copy = [...options];
                                        copy[i] = e.target.value;
                                        setOptions(copy);
                                    }}
                                    sx={{ mb: 1 }}
                                />
                            ))}

                            <Button size="small" onClick={() => setOptions([...options, ""])}>
                                + Add Option
                            </Button>

                            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={createPoll}>
                                Create Poll
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* RIGHT SIDE – POLL LIST */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: "100%", borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h6" mb={2}>
                                📋 Existing Polls
                            </Typography>

                            <Stack spacing={2}>
                                {polls.map((poll) => (
                                    <Box
                                        key={poll.id}
                                        sx={{
                                            p: 2,
                                            border: "1px solid #ddd",
                                            borderRadius: 2,
                                            backgroundColor: poll.isActive ? "#f9f9f9" : "#eee",
                                        }}
                                    >
                                        <Typography fontWeight="600">{poll.question}</Typography>

                                        <Typography variant="caption" color={poll.isActive ? "green" : "red"}>
                                            {poll.isActive ? "Active" : "Inactive"}
                                        </Typography>

                                        {poll.isActive && (
                                            <Button size="small" color="error" sx={{ mt: 1 }} onClick={() => deactivatePoll(poll.id)}>
                                                Deactivate
                                            </Button>
                                        )}
                                    </Box>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
