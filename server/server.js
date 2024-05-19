const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/db");

const port = process.env.PORT;

// connect to database
connectDB();

// setup middleware
app.use(cookieParser());
app.use(express.json());

// setup end points
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
