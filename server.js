import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
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

// API routes
app.use("/api/users", userRoutes);
app.use('/api/hotel', hotelRoutes);
app.use('/api/chambre', chambreRoutes);
app.use('/api/reservation', reservationRoutes); // Reservation routes
app.use('/api/avis', avisRoutes); // Avis routes (reviews)




// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
