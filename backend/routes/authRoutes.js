import express from "express";
import { register, login,logout,checkSession} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout",logout);

router.get("/me",protect,checkSession);

export default router;