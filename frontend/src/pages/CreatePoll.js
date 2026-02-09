import { useState } from "react";
import { api } from "../services/api";

import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
  CircularProgress,
  Box
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* Handle option change */
  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  /* Add new option */
  const addOption = () => {
    setOptions([...options, ""]);
  };

  /* Remove option */
  const removeOption = (index) => {
    if (options.length <= 2) return;
    setOptions(options.filter((_, i) => i !== index));
  };

  /* Submit poll */
  const submitPoll = async () => {
    setError("");
    setSuccess("");

    /* Validation */
    if (!question.trim()) {
      setError("Question is required");
      return;
    }

    if (options.some(opt => !opt.trim())) {
      setError("All options must be filled");
      return;
    }

    if (options.length < 2) {
      setError("Minimum two options required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/polls", {
        question,
        options
      });

      setSuccess("Poll created successfully!");

      setQuestion("");
      setOptions(["", ""]);

    } catch {
      setError("Failed to create poll");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 4,
          p: 2
        }}
      >
        <CardContent>

          {/* Title */}
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            mb={3}
          >
            ➕ Create New Poll
          </Typography>

          {/* Error / Success */}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          {/* Question */}
          <TextField
            fullWidth
            label="Poll Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* Options */}
          {options.map((opt, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2
              }}
            >
              <TextField
                fullWidth
                label={`Option ${index + 1}`}
                value={opt}
                onChange={(e) =>
                  handleOptionChange(index, e.target.value)
                }
              />

              <IconButton
                color="error"
                disabled={options.length <= 2}
                onClick={() => removeOption(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          {/* Add Option */}
          <Button
            startIcon={<AddIcon />}
            onClick={addOption}
            sx={{ mb: 2 }}
          >
            Add Option
          </Button>

          {/* Submit */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            onClick={submitPoll}
            sx={{
              mt: 1,
              borderRadius: 2,
              py: 1.2,
              textTransform: "none"
            }}
          >
            {loading ? <CircularProgress size={25} /> : "Create Poll"}
          </Button>

        </CardContent>
      </Card>

    </Container>
  );
}
