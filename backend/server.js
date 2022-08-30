import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";
import PostRoute from "./routes/PostRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import ProfileRoute from "./routes/ProfileRoute.js";

dotenv.config();

const app = express();

app.use(cors());

// Data Format JSON
app.use(cookieParser());
app.use(express.json());

app.use(AuthRoute);
app.use(UserRoute);
app.use(PostRoute);
app.use(ProfileRoute);

const PORT = process.env.PORT_URL || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
