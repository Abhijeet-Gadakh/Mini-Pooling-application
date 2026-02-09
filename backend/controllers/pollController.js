const axios = require("axios");

const DB_URL = "http://localhost:3001";

// Get active polls
exports.getActivePolls = async (req, res) => {
    try {
        const { data } = await axios.get(`${DB_URL}/polls?isActive=true`);
        res.json(data);
    } catch {
        res.status(500).json({ message: "Failed to fetch polls" });
    }
};

// Get poll details
exports.getPollDetails = async (req, res) => {
    const pollId = req.params.id;
    try {
        const poll = await axios.get(`${DB_URL}/polls/${pollId}`);
        const options = await axios.get(`${DB_URL}/options?pollId=${pollId}`);

        res.json({ ...poll.data, options: options.data });
    } catch {
        res.status(404).json({ message: "Poll not found" });
    }
};

// Create poll
exports.createPoll = async (req, res) => {
    const { question, options } = req.body;
    if (!question || options.length < 2) {
        return res.status(400).json({ message: "Invalid input" });
    }

    try {
        const pollRes = await axios.post(`${DB_URL}/polls`, {
            question,
            isActive: true,
            createdAt: new Date().toISOString(),
        });

        for (let opt of options) {
            await axios.post(`${DB_URL}/options`, {
                pollId: pollRes.data.id,
                text: opt,
                votes: 0,
            });
        }

        res.status(201).json({ message: "Poll created" });
    } catch {
        res.status(500).json({ message: "Error creating poll" });
    }
};

// Vote
exports.votePoll = async (req, res) => {
    const pollId = req.params.id;
    const { optionId, userIp } = req.body;

    try {
        const existingVote = await axios.get(`${DB_URL}/votes?pollId=${pollId}&userIp=${userIp}`);

        if (existingVote.data.length > 0) {
            return res.status(400).json({ message: "Already voted" });
        }

        const option = await axios.get(`${DB_URL}/options/${optionId}`);
        await axios.patch(`${DB_URL}/options/${optionId}`, {
            votes: option.data.votes + 1,
        });

        await axios.post(`${DB_URL}/votes`, { pollId, optionId, userIp });

        res.json({ message: "Vote recorded" });
    } catch {
        res.status(500).json({ message: "Voting failed" });
    }
};

// Results
exports.getResults = async (req, res) => {
    const pollId = req.params.id;
    try {
        const options = await axios.get(`${DB_URL}/options?pollId=${pollId}`);
        res.json(options.data);
    } catch {
        res.status(500).json({ message: "Failed to load results" });
    }
};
