const express = require("express");
const cors = require("cors");

const pollRoutes = require("./routes/pollRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* Routes */
app.use("/polls", pollRoutes);
app.use("/auth", authRoutes);

app.listen(5000, () => {
    console.log("Express API running on port 5000");
});
