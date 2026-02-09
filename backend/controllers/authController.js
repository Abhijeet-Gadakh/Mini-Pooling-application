const axios = require("axios");

const DB_URL = "http://localhost:3001";

/* Admin Login */
exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    /* Validation */
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required",
        });
    }

    try {
        /* Fetch admin from JSON Server */
        const response = await axios.get(`${DB_URL}/admin?email=${email}&password=${password}`);

        const admin = response.data;

        /* Check credentials */
        if (admin.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        /* Login success */
        res.status(200).json({
            message: "Login successful",
            admin: {
                id: admin[0].id,
                email: admin[0].email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
};
