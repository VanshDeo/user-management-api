import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.get('/', (req,res) => {
    res.json({message: "API is running..."});
});
app.use('/api/auth', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0' , () => {
    console.log(`Server is running  on port ${PORT}`);
});