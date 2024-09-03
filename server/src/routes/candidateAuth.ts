import { Router } from "express";
import { registerCandidate, loginCandidate, logoutCandidate } from "../controllers/candidateAuth";

const router = Router();


router.get('/register', (req, res)=>{
    res.send("Hello")
})
router.post('/register', registerCandidate)

router.post('/login', loginCandidate)

router.post('/logout', logoutCandidate)

export default router;