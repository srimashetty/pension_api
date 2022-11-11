import express from "express";
const router = express.Router();
import {register, login} from "./controller/auth";

router.get('/healthCheck', (req:any, res:any)=> {
    res.json({
        "message": "API is up"
    })
});

router.post('/healthcheck/login', login);
router.post('/healthcheck/register', register);

export default router;