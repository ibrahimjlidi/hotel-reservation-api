import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteAccount,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getUserById,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.delete("/profile", protect, deleteAccount);
router.get("/", getAllUsers);
router.put("/profile/:id", updateUserById);    
router.delete("/profile/:id", deleteUserById);
router.get("/profile/:id", getUserById);  

export default router;
