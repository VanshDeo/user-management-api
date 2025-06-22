import express from "express";
import signin from "../controllers/signin.js";
import login from "../controllers/login.js";
import auth from "../auth.js";

const router = express.Router();

router.post('/signin', signin);
router.post('/login', login);
router.get('/me',auth, (req, res) => {
    res.status(200).json({ user: req.user });
});

export default router;