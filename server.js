import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";


import userRoutes from "./routes/userRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import chambreRoutes from "./routes/chambreRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import avisRoutes from "./routes/avisRoutes.js";


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/users", userRoutes);
app.use('/api/hotel', hotelRoutes);
app.use('/api/chambre', chambreRoutes); 
app.use('/api/avis', avisRoutes); 
app.use('/api', reservationRoutes);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
